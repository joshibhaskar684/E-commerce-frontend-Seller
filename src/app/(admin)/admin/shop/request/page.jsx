"use client";

import Cookies from "js-cookie";
import { getUnApprovedSHOPS } from "@/redux-store/authstore/shops/action";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopCard from "@/components/Admin/Cards/ShopCard/ShopCard";

export default function page() {
    const dispatch = useDispatch();   
    const searchParams = useSearchParams();
    const [totalPage, setTotalPages] = useState(1);
    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [selectedId, setSelectedId] = useState('');
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 12);
    const router = useRouter();
       
    const seller = useSelector((state) => state.ShopsReducer.unapproveShops);

    useEffect(() => {
        handleSellerLoading();
    }, [pageno, pagesize]);
    
    const handleSellerLoading = () => {
        const token = Cookies.get("adminToken");
        dispatch(getUnApprovedSHOPS({pageno, pagesize}, token));
    }
    
    const handleViewMore = (id) => {
        try {
            setSelectedId(id);
            router.push(`/admin/shop/request/${id}`);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setTotalPages(seller?.totalPages)
    }, [seller]);

    const handlePaginationChange = (_, page) => {
        setPageno(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col h-full w-full bg-zinc-50/50 dark:bg-background">
            {/* Header Section */}
            <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-background px-6 py-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sellers Shops Requests</h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Review and manage incoming shop creation requests from sellers.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {seller?.content?.map((item, index) => (
                        <ShopCard 
                            seller={item} 
                            key={index} 
                            handleViewMore={handleViewMore} 
                            selectedId={selectedId}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPage > 1 && (
                    <div className="mt-8 flex justify-center border-t border-zinc-200 dark:border-zinc-800 pt-6 pb-2">
                        <Pagination
                            count={totalPage}
                            page={pageno}
                            onChange={handlePaginationChange}
                            color="primary"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    backgroundColor: "transparent",
                                    color: "var(--foreground)",
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#eab308 !important", // yellow-500
                                    color: "#fff",
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}