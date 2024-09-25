"use server";

import axios from "axios";
import OpenAI from "openai";
import { auth } from "@/app/auth";
import { S3 } from "aws-sdk";
import prisma from "@/lib/prisma";

import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

interface data {
  prompt: string;
  model: string;
  size: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

export const generateImage = async (data: data) => {
  const session = await auth();

  if (!session) throw new Error("ابتدا وارد شوید !");
  if (session.user.imageCount >= session.user.maxImages)
    throw new Error("شما مجاز به ساخت تصویر نیستید !");

  let selectedModel = data.model;
  let selectedSize = data.size;

  switch (data.model) {
    case "normal":
      selectedModel = "flux";
      break;
    case "realism":
      selectedModel = "flux-realism";
      break;
    case "anime":
      selectedModel = "flux-anime";
      break;
    case "3d":
      selectedModel = "flux-3d";
      break;
    case "dark":
      selectedModel = "any-dark";
      break;
    case "turbo":
      selectedModel = "turbo";
      break;
    default:
      break;
  }

  if (session.user.plan === "BASIC") {
    selectedModel = "flux";
    selectedSize = "1024*1024";
  }

  const translate = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Translate the following text to English. If you encounter any NSFW or adult content, replace it with a description of a cute animal. For example, if the input contains inappropriate content, you might replace it with 'A playful puppy chased a butterfly.'",
      },
      { role: "user", content: data.prompt },
    ],
  });

  const translatedText = translate.choices[0].message.content?.trim();

  console.log("Translate txt =>", translatedText);

  const res = await axios.post("https://vector.profanity.dev", {
    message: translatedText,
  });

  console.log("Profanity txt =>", res.data);

  const safeTxt = (await res).data.isProfanity
    ? "A white cute cat"
    : translatedText;

  const text = encodeURIComponent(`${safeTxt} highly detailed`);

  const randomSeed = () => {
    return Math.floor(Math.random() * 1000000) + 1;
  };

  const imageUrl = `https://image.pollinations.ai/prompt/${text}?model=${selectedModel}&width=${
    selectedSize.split("*")[0]
  }&height=${
    selectedSize.split("*")[1]
  }&seed=${randomSeed()}&nologo=true&nofeed=true`;

  // Fetch image as binary data
  const imageResponse = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  const s3 = new S3({
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    endpoint: process.env.LIARA_ENDPOINT,
  });

  const uniqueKey = `${translatedText?.slice(
    0,
    10
  )}-${Date.now()}-${uuidv4()}.jpeg`;

  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME as string,
    Key: uniqueKey, // Add .jpeg extension
    Body: imageResponse.data, // Binary data of the image
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  await s3.upload(params).promise();

  const permanentSignedUrl = s3.getSignedUrl("getObject", {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: uniqueKey, // Ensure you use the correct key
    Expires: 31536000, // 1 year expiration
  });

  await prisma.image.create({
    data: {
      url: permanentSignedUrl as string,
      userId: session.userId,
      key: uniqueKey,
    },
  });

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      imageCount: {
        increment: 1,
      },
    },
  });

  revalidatePath("/create")

  return permanentSignedUrl;
};
