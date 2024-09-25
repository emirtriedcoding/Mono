"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Different = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <Card>
        <CardHeader>
          <CardTitle>فیتنس و بدنسازی</CardTitle>
          <CardDescription>
            تصاویری از ورزشکاران و تجهیزات ورزشی
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="rounded-lg shadow-2xl shadow-primary/20"
            src="/assets/fit.jpeg"
            width="600"
            height="900"
            alt="Fit"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>اوور ریکت</CardTitle>
          <CardDescription>
            تصاویر اوور ریکت برای تامبنیل یوتیوب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="rounded-lg shadow-2xl shadow-primary/20"
            src="/assets/overreact.jpeg"
            width="600"
            height="900"
            alt="Overreact"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>استایل اولد مانی</CardTitle>
          <CardDescription>
            تصاویری خیره کننده از استایل های مختلف
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="rounded-lg shadow-2xl shadow-primary/20"
            src="/assets/oldmoney.jpeg"
            width="600"
            height="900"
            alt="Overreact"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>مرد خوشتیپ</CardTitle>
          <CardDescription>مردی خوشتیپ در شب های لاس وگاس</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            className="rounded-lg shadow-2xl shadow-primary/20"
            src="/assets/lv.jpeg"
            width="600"
            height="900"
            alt="Overreact"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Different;
