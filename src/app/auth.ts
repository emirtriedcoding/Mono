import Nextauth from "next-auth";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { Account, Profile } from "next-auth"; // Importing necessary types from NextAuth
import prisma from "@/lib/prisma";

export const {
  auth,
  handlers: { GET, POST },
} = Nextauth({
  providers: [Google, Github],
  callbacks: {
    async signIn({ profile, account }): Promise<boolean> {
      if (profile && account) {
        if (account.provider === "google" || account.provider === "github") {
          const user = await prisma.user.findUnique({
            where: {
              email: profile.email as string,
            },
          });

          if (!user) {
            await prisma.user.create({
              data: {
                name: profile.name as string,
                email: profile.email as string,
                provider: account.provider,
              },
            });
          }

          return true;
        }

        return false;
      }

      return false;
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });

      if (user) {
        session.user.plan = user.plan;
        session.user.maxImages = user.maxImages;
        session.userId = user.id;
        session.user.imageCount = user.imageCount;
      }
      return session;
    },
  },
});
