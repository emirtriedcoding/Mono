import Link from "next/link";

import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="p-5 space-y-5 rounded-t-full border-t border-muted">
      <p className="font-bold text-[10px] lg:text-xs text-center">
        طراحی و توسعه : امیرحسین عسگری
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="https://www.linkedin.com/in/emirtreidcoding">
          <Linkedin strokeWidth={1} size={20} />
        </Link>
        <Link href="https://www.instagram.com/emirtreidcoding">
          <Instagram strokeWidth={1} size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
