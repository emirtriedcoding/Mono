import { auth } from "@/app/auth";
import prisma from "@/lib/prisma";

export const GET = async () => {
  const session = await auth();

  const images = await prisma.image.findMany({
    where: {
      userId: session?.userId,
    },
  });

  return Response.json(images);
};
