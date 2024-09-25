"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import Image from "next/image";

import { signIn } from "next-auth/react";

import { toast } from "sonner";

const Auth = () => {
  const handleAuth = async (provider: string) => {
    toast.loading("در حال اتصال به حساب کاربری شما ...", {
      id: "auth",
    });

    await signIn(provider, {
      redirectTo: "/",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button asChild>
          <span>ثبت نام - ورود</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle>ثبت نام - ورود مونو </AlertDialogTitle>
          <AlertDialogDescription>
            فرقی نداره چه حساب کاربری دارید از قبل چه ندارید ...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex-col gap-2">
          <Button
            onClick={() => handleAuth("google")}
            size="lg"
            className="!bg-white gap-1"
          >
            ثبت نام - ورود با گوگل
            <Image
              src="/assets/google.svg"
              width="20"
              height="20"
              alt="Google logo"
            />
          </Button>
          <Button
            onClick={() => handleAuth("github")}
            size="lg"
            variant="secondary"
            className="gap-1"
          >
            ثبت نام - ورود با گیت هاب
            <Image
              src="/assets/github.svg"
              width="20"
              height="20"
              alt="Github logo"
            />
          </Button>
          <AlertDialogCancel>لغو</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Auth;
