import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";
import { S3 } from "aws-sdk";

export const DELETE = async (
  req: Request,
  { params }: { params: { imageId: string } }
) => {
  const { imageId } = params;

  const session = await auth();

  if (!session) {
    return Response.json(
      { message: "وارد شوید !" },
      {
        status: 401,
      }
    );
  }

  // Find the image in the database to get the S3 key for deletion
  const image = await prisma.image.findUnique({
    where: {
      id: imageId,
    },
  });

  if (!image || image.userId !== session.userId) {
    return Response.json(
      { message: "عکس پیدا نشد یا شما مجاز به حذف آن نیستید" },
      {
        status: 404,
      }
    );
  }

  // Set up AWS S3 client
  const s3 = new S3({
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    endpoint: process.env.LIARA_ENDPOINT,
  });

  const fileKey = image.key; // Get the exact S3 key stored during upload

  try {
    // Delete the image from S3
    await s3
      .deleteObject({
        Bucket: process.env.LIARA_BUCKET_NAME as string,
        Key: fileKey, // Use the correct S3 key
      })
      .promise();

    // Delete the image from the database
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return Response.json(
      { message: "عکس با موفقیت حذف شد" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return Response.json(
      { message: "مشکلی در حذف فایل وجود دارد" },
      {
        status: 500,
      }
    );
  }
};
