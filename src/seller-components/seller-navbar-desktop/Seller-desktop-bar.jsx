"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowAltCircleRight, FaUserCircle } from "react-icons/fa";
import { NavRoute } from "../NavRoute";

export default function SellerDesktopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const sidebardata = NavRoute;

    const handleLogOut = () => {
        Cookies.remove("sellerToken");
        router.push("/seller");
    };

    return (
        <aside className="hidden md:flex flex-col w-[260px] h-screen border-r border-border bg-background px-3 py-4">
            
            {/* Header / Logo */}
            <div className="flex items-center gap-3 px-3 mb-6">
                <img 
                    src="/QuickLogo.png" 
                    alt="Quick Seller Logo" 
                    className="w-8 h-8 rounded-md object-cover" 
                />
                <h1 className="text-lg font-semibold tracking-tight text-foreground">
                    Quick Seller
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto space-y-1 pr-2 hide-scrollbar">
                {sidebardata.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.link;
                    
                    return (
                        <Link
                            key={index}
                            href={item.link}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto pt-4 border-t border-border flex flex-col gap-1">
                <Link 
                    href="/seller/profile"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <FaUserCircle className="w-4 h-4 shrink-0" />
                    <span>Profile</span>
                </Link>
                
                <button 
                    onClick={handleLogOut} 
                    className="flex items-center w-full gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                    <FaArrowAltCircleRight className="w-4 h-4 shrink-0" />
                    <span>Log out</span>
                </button>
            </div>
            
        </aside>
    );
}



// "use client";
// import Cookies from "js-cookie";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { FaAdjust, FaArrowAltCircleRight, FaUserCircle } from "react-icons/fa";
// import { NavRoute } from "../NavRoute";

// export default function SellerDesktopBar() {
//     const pathname = usePathname();
//     const router=useRouter();

//     const sidebardata =NavRoute;

//         const handleLogOut=()=>{
//         Cookies.remove("sellerToken");
//         router.push("/seller");
//     }
//     return (
//         <>
//             <div className="w-[320px] border-r border-border h-screen hidden md:grid grid-cols-1 p-5 gap-3 bg-background    ">

//                 <div className=" flex flex-row gap-2 items-center ">
//                     <img src="/QuickLogo.png" alt="logo image   " className='w-[40px] h-[40px] '></img>
//                     <h1 className="text-2xl font-bold line-clamp-1">
//                         Quick Seller
//                     </h1>
//                 </div>
//                 <div className=" grid grid-cols-1 gap-2 overflow-hidden overflow-y-auto h-full pt-10  hide-scrollbar ">


//                     {
//                         sidebardata.map((item, index) => {
//                             const Icon = item.icon;

//                             const isActive = pathname === item.link;
//                             return (
//                                 <Link
//                                     key={index}
//                                     href={item.link}
//                                     className={`flex items-center gap-3 px-4 py-2 font-bold border rounded-md transition-colors ${isActive
//                                             ? "bg-foreground text-background"
//                                             : "hover:bg-foreground hover:text-background"
//                                         }`}
//                                 >
//                                     <Icon className="w-5 h-5 shrink-0" />
//                                     <span className="truncate">{item.label}</span>
//                                 </Link>
//                             );
//                         })
//                     }
//                 </div>
//                 <Link className=" flex flex-row gap-3 border items-center h-15 px-4 py-2 rounded-md " href="/seller/profile">
//                     <FaUserCircle className="text-2xl font-bold" />
//                     <h1 className="text-md font-bold" >
//                         Profile
//                     </h1>
//                 </Link>
//                 <button onClick={()=>handleLogOut()} className=" cursor-pointer border border-red-500 hover:bg-foreground flex flex-row gap-3  items-center h-15 px-4 py-2 rounded-md " >
//                     <FaArrowAltCircleRight className="text-2xl font-bold text-red-500" />
//                     <h1 className="text-md font-bold text-red-500"  >
//                        LogOut
//                     </h1>
//                 </button>
//             </div>
//         </>
//     )
// }