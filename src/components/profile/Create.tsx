"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Session } from "next-auth";

import { useMutation } from "@tanstack/react-query";

import { generateImage } from "@/app/(profile)/create/_actions";
import { toast } from "sonner";
import { useCallback, useState } from "react";

const Create = ({ session }: { session: Session | null }) => {
  const [image, setImage] = useState("");
  const schema = zod.object({
    prompt: zod.string().min(10, {
      message: "متن ورودی باید حداقل شامل 10 کاراکتر باشد !",
    }),
    model: zod.string(),
    size: zod.string(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: "",
      model: "normal",
      size: "1024*1024",
    },
  });

  const models = [
    {
      label: "معمولی - پیش فرض ",
      value: "normal",
    },
    {
      label: "واقعی",
      value: "realism",
    },
    {
      label: "انیمیشن",
      value: "anime",
    },
    {
      label: "سه بعدی",
      value: "3d",
    },
    {
      label: "تاریک",
      value: "dark",
    },
    {
      label: "توربو",
      value: "turbo",
    },
  ];

  const mutation = useMutation({
    mutationFn: (data: zod.infer<typeof schema>) => generateImage(data),
    onSuccess: (url) => {
      setImage(url);
      toast.success("تصویر ساخته شد !", {
        id: "image",
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        id: "image",
      });
    },
  });

  const onSubmit = useCallback(
    (data: zod.infer<typeof schema>) => {
      setImage("");
      toast.loading("در حال ساخت تصویر ...", {
        id: "image",
      });
      mutation.mutate(data);
    },
    [mutation]
  );

  return (
    <div className="flex w-[1200px]  gap-3">
      <Card className="w-1/3 h-fit sticky top-3">
        <CardHeader>
          <CardTitle>ساخت تصویر</CardTitle>
          <CardDescription>
            متنی انگلیسی یا فارسی جهت ایجاد تصویر وارد نمایید . برای مثال : یک
            مرد جوان با موی سفید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>متن ورودی</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="مردی در حال دویدن"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      هر چقدر متن طولانی تر باشد تصویر خروجی نیز بهتر خواهد بود
                      .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <p className="text-xs font-bold">
                  مدل ها : ( فقط افراد دارای پلن حرفه ای یا بالاتر )
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {models.map((model) => (
                    <div
                      key={model.value}
                      onClick={() => {
                        session.user.plan !== "BASIC" &&
                          form.setValue("model", model.value);
                      }}
                      className={cn(
                        session.user.plan === "BASIC"
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:scale-105",
                        "flex flex-col gap-3 items-center transition"
                      )}
                    >
                      <Image
                        className={cn(
                          form.watch("model") === model.value &&
                            "border-2 border-primary",
                          "rounded-lg"
                        )}
                        src={`/assets/models/${model.value}.jpeg`}
                        width="1000"
                        height="1000"
                        alt={model.value}
                      />
                      <span className="text-xs font-bold text-primary">
                        {model.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      سایز تصویر : ( فقط افراد دارای پلن حرفه ای یا بالاتر )
                    </FormLabel>
                    <FormControl>
                      <Select
                        disabled={session.user.plan === "BASIC"}
                        dir="rtl"
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue="1024*1024"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1024*1024">
                            مربع - پیش فرض
                          </SelectItem>
                          <SelectItem value="1792*1024">
                            مستطیل - افقی
                          </SelectItem>
                          <SelectItem value="600*900">عمودی </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={mutation.isPending}>ایجاد تصویر</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-2/3 h-fit">
        <CardHeader>
          <CardTitle>تصویر شما</CardTitle>
        </CardHeader>
        <CardContent>
          {image ? (
            <div className="space-y-3">
              <Image
                className="rounded-lg"
                unoptimized
                src={image}
                alt="image"
                width="750"
                height="750"
              />
              <p className="font-bold text-xs text-muted-foreground !my-5">
                دقت داشته باشید تصویر بالا کیفیتش پایین تر است و برای کیفیت اصلی
                تصویر را دانلود کنید !
              </p>
              <Button>
                <a href={image} download={image}>
                  دانلود و ذخیره
                </a>
              </Button>
            </div>
          ) : (
            <div className="border h-[500px] border-dashed  border-muted rounded-lg p-5 flex items-center justify-center">
              فعلا هیچی !
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
