// eslint-disable-next-line @typescript-eslint/no-unused-vars

import type { NextAuth } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      plan: string;
      maxImages: number;
      imageCount: number;
    };
    userId: string;
  }
}
