"use client";

import Link from "next/link";
import { useState } from "react";

import { usePathname } from "next/navigation";
import { menuItems } from "../NavRoute/menuitems";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

    const pathname = usePathname();
  const LoginData = menuItems;
  return (
    <>
<div className="border-r h-full w-full overflow-hidden overflow-y-auto hide-scrollbar p-5 hidden lg:block bg-foreground text-background">
 {LoginData.map((item, index) => {
    const isActive = pathname === item.href.split('?')[0];

  return(
  <div className="flow-root p-5 mb-50 " key={index}>
  
  
                        <Link
                          href={item.href}
                          className={`-m-2 cursor-pointer block p-2 font-medium  ${isActive ? "text-yellow-500 font-extrabold text-xl" : "text-background"}` } >
                          {item.name}
                        </Link>

                      </div>)})}
</div>
    </>
 );
}
