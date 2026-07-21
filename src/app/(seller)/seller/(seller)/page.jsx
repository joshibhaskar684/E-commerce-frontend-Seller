"use client";

import Cookies from "js-cookie";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalShopsCountForSellerDashBoard } from "@/redux-store/authstore/seller/action";
import StatSection from "@/components/Admin/DashBoard/StatSection";

export default function page() {
    const dispatch = useDispatch();

    const totalCountData = useSelector((state) => state.sellerReducer.totalShopCount);
    
    const loadData = () => {
        const token = Cookies.get("sellerToken");
        dispatch(totalShopsCountForSellerDashBoard({token}));
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-zinc-50/50 dark:bg-background">
            {/* Header Section */}
            <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-background px-6 py-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Seller Dashboard</h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Overview of your shops and performance metrics.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto w-full max-w-7xl">
                    {totalCountData && (
                        <StatSection title="Shop Stats" data={totalCountData} />
                    )}
                </div>
            </div>
        </div>
    )
}