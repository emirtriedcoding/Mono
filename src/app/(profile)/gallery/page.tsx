import { auth } from "@/app/auth";
import Gallery from "@/components/profile/Gallery";
import prisma from "@/lib/prisma";
import React from "react";

const page = async () => {
  return <Gallery />;
};

export default page;
