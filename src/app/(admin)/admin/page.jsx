"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart3 } from "lucide-react";

import StatSection from "@/components/Admin/DashBoard/StatSection";
import { Skeleton } from "@/components/Admin/shared/Skeleton";
import { totalCountForAdminDashBoard } from "@/redux-store/authstore/adminDashboard/action";

const SECTIONS = ["Overview", "Seller Stats", "Shop Stats"];

export default function Page() {
    const dispatch = useDispatch();

    const totalCountData = useSelector((state) => state.AdminDashBoardReducer.AdminTotalData);
    const loading = useSelector((state) => state.AdminDashBoardReducer.loading);
    const error = useSelector((state) => state.AdminDashBoardReducer.error);

    const loadData = useCallback(() => {
        const token = Cookies.get("adminToken");
        dispatch(totalCountForAdminDashBoard({ token }));
    }, [dispatch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // No numbers and nothing has failed yet means the first request is still on
    // its way — including the frame before the effect fires, which would
    // otherwise flash the empty state. Once data arrives a refresh keeps it on
    // screen rather than blanking the dashboard.
    const showSkeleton = !totalCountData && !error;

    return (
        <div className="hide-scrollbar h-full w-full overflow-y-auto p-4 pt-6 md:p-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <div className="flex flex-col gap-1 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Overview of your store&apos;s performance and entities.
                    </p>
                </div>

                <div className="w-full">
                    {showSkeleton ? (
                        <DashboardSkeleton />
                    ) : totalCountData ? (
                        <div className="flex flex-col gap-8">
                            {SECTIONS.map((title, index) => (
                                <StatSection key={title} title={title} data={totalCountData[index]} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState onRetry={loadData} loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            {SECTIONS.map((title) => (
                <div key={title} className="mb-8">
                    <Skeleton className="mb-4 h-6 w-40" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, tile) => (
                            <div
                                key={tile}
                                className="rounded-xl border border-zinc-200 dark:border-zinc-800"
                            >
                                <div className="flex flex-row items-center justify-between p-6 pb-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-4 w-4" />
                                </div>
                                <div className="p-6 pt-0">
                                    <Skeleton className="h-7 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState({ onRetry, loading }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 px-4 py-16 text-center dark:border-zinc-800">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <BarChart3 className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">No dashboard numbers yet</p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    The totals could not be loaded. Check that you are still signed in, then try
                    again.
                </p>
            </div>
            <button
                type="button"
                onClick={onRetry}
                disabled={loading}
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
                {loading ? "Loading…" : "Try again"}
            </button>
        </div>
    );
}
