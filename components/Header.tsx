'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type Locale = "ru" | "en";

function getLocaleFromPath(pathname: string): Locale {
  const m = pathname.match(/^\/(ru|en)(?=\/|$)/);
  return (m ? (m[1] as Locale) : "ru");
}

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(ru|en)(?=\/|$)/, "");
}

export default function Header() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const normalized = stripLocale(pathname);
  const isActive = (href: string) =>
    normalized === href || normalized.startsWith(href + "/");

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" locale={locale} className="font-semibold">
          RussianHelis
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/market"
            locale={locale}
            className={isActive("/market") ? "font-semibold underline" : "hover:underline"}
          >
            Маркетплейс
          </Link>
          <Link
            href="/blog"
            locale={locale}
            className={isActive("/blog") ? "font-semibold underline" : "hover:underline"}
          >
            Блог
          </Link>
        </nav>
      </div>
    </header>
  );
}
