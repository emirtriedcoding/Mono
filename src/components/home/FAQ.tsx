"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import Link from "next/link";

const FAQ = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h6 className="font-bold text-4xl text-primary my-5">سوالات متداول :</h6>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">
            چجوری تصویر بسازم ؟
          </AccordionTrigger>
          <AccordionContent>
            کاری نداره ! از طریق دکمه بالا ثبت نام کن و بعد از اینکه به قسمت
            داشبورد منتقل شدی اونجا راحت میتونی هر تصویری که میخوای رو بسازی !
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">فقط تصویر ؟</AccordionTrigger>
          <AccordionContent>
            بله . فعلا فقط میتونید تصویر ایجاد کنید ولی بعدا ویدیو نیز خواهیم
            داشت . همچنین میتوانید با استفاده از این قابلیت لوگو و سایر ...
            بسازید .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">پولیه ؟</AccordionTrigger>
          <AccordionContent>
            با ثبت نام میتونید رایگان چندین تصویر بسازید اما برای استفاده کامل
            از پلتفرم بله باید هزینه ای ناچیز پرداخت بشه .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg">
            چجوری پرداخت کنم ؟
          </AccordionTrigger>
          <AccordionContent>
            <Link href="/#pricing" className="text-sky-500 underline">
              کلیک کنید
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg">
            بعد از پرداخت بلافاصله میتونم استفاده کنم ؟
          </AccordionTrigger>
          <AccordionContent>
            بله ! بعد از پرداخت بلافاصله میتونید از تمامی امکانات استفاده نمایید
            .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg">
            پرداختم شکست خورد - چیکار کنم ؟
          </AccordionTrigger>
          <AccordionContent>
            این مشکل خیلی کم پیش میاد اما اگر به هر دلیلی پرداخت شما با شکست
            مواجه شد با این شماره تماس بگیرید - 09393249665
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
