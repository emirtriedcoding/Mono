"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import Auth from "../modals/Auth";

import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
  /// TODO : Handle auth logic

  return (
    <>
      <motion.header
        className="w-full p-5 rounded-lg shadow-sm backdrop-blur-xl sticky z-50 top-2 flex items-center justify-between"
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <Link
          href="/"
          className="font-bold text-sm lg:text-lg transition hover:scale-105 text-primary"
        >
          <h1>مونو - ساخت تصاویر خیره کننده</h1>
        </Link>
        <ul className="hidden lg:flex items-center gap-3 text-sm font-semibold text-white">
          <li>
            <Link href="/create">ساخت تصویر</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
        </ul>
        {session ? (
          <Link href="/create">
            <Button>داشبورد</Button>
          </Link>
        ) : (
          <Auth />
        )}
      </motion.header>
    </>
  );
};

export default Header;
