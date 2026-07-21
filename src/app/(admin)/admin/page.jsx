"use client";

import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashBoardReducer from '@/redux-store/authstore/adminDashboard/reducer';
import { totalCountForAdminDashBoard } from "@/redux-store/authstore/adminDashboard/action";
import StatSection from "@/components/Admin/DashBoard/StatSection";

export default function page(){

const dispatch=useDispatch();

const totalCountData=useSelector((state)=>state.AdminDashBoardReducer.AdminTotalData);
console.log(totalCountData,"total count data");

const loadData=()=>{
    const token=Cookies.get("adminToken");
    dispatch(totalCountForAdminDashBoard({token}));
}

useEffect(()=>{
loadData();
},[]);

    return (
        <div className="w-full h-full overflow-y-auto hide-scrollbar p-4 md:p-8 pt-6">
            <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
                <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Overview of your store's performance and entities.
                    </p>
                </div>

                <div className="w-full">
                    {totalCountData && (
                        <div className="flex flex-col gap-8">
                            <StatSection title="Overview" data={totalCountData[0]} />
                            <StatSection title="Seller Stats" data={totalCountData[1]} />
                            <StatSection title="Shop Stats" data={totalCountData[2]} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}