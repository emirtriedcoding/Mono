"use client";

import { cn } from "@/lib/utils";
import { Images, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "ساخت و ساز",
      path: "/create",
      icon: Sparkles,
    },
    {
      label: "گالری",
      path: "/gallery",
      icon: Images,
    },
  ];

  return (
    <div className="w-fit p-3 bg-secondary rounded-lg shadow-sm flex items-center gap-2">
      {routes.map((route) => (
        <Link
          href={route.path}
          className={cn(
            pathname === route.path && "bg-primary/50",
            "flex items-center gap-2 text-sm font-semibold p-3 rounded-lg"
          )}
        >
          {route.label}
          <route.icon strokeWidth={1} size={20} />
        </Link>
      ))}
    </div>
  );
};

export default Nav;
