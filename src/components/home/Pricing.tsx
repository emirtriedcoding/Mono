import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const pricing = [
  {
    label: "مبتدی",
    desc: "رایگان اما محدود",
    price: "0",
    features: [
      "10 توکن جهت تست",
      "قابلیت استفاده از تنها یک مدل",
      "قابلیت سفارشی سازی سایز",
    ],
  },
  {
    label: "پیشرفته",
    desc: "حرفه ای باش ",
    price: "300,000",
    features: [
      "300 توکن در ماه",
      "قابلیت استفاده از تمامی مدل ها",
      "قابلیت سفارشی سازی سایز",
    ],
  },
  {
    label: "حرفه ای",
    desc: "حرفه ای باش ",
    price: "1,000,000",
    features: [
      "1000 توکن در ماه",
      "قابلیت استفاده از تمامی مدل ها",
      "قابلیت سفارشی سازی سایز",
    ],
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="!my-24 w-full">
      <h6 className="text-4xl font-bold mb-10 text-primary text-center">
        تعرفه ها :
      </h6>
      <div className="grid grid-cols-3 gap-3">
        {pricing.map((item) => (
          <Card
            className={cn(
              item.price === "1,000,000" &&
                "border border-primary shadow-2xl shadow-primary/30"
            )}
            key={item.price}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{item.label}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <h6 className="font-bold text-lg text-primary">
                {item.price} تومان / ماهیانه
              </h6>
              <Button className="w-full" disabled={item.price === "0"}>
                خرید
              </Button>
              <ul className="space-y-3 text-sm font-semibold">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CircleCheck
                      strokeWidth={1}
                      className="w-5 h-5 text-primary"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
