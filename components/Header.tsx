'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">RussianHelis</Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/market" className={isActive("/market") ? "font-semibold underline" : "hover:underline"}>
            Маркетплейс
          </Link>
          <Link href="/blog" className={isActive("/blog") ? "font-semibold underline" : "hover:underline"}>
            Блог
          </Link>
        </nav>
      </div>
    </header>
  );
}
