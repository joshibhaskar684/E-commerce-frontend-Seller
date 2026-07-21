"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../NavRoute/menuitems";

export default function Sidebar() {
  const pathname = usePathname();
  // Filter out any completely empty objects
  const LoginData = menuItems.filter(item => item.name);

  return (
    <aside className="hidden lg:flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-background overflow-y-auto pb-10">
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Management
        </div>
        <nav className="flex flex-col gap-1">
          {LoginData.map((item, index) => {
            const isActive = pathname === item.href.split("?")[0];

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
