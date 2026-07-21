"use client";

import Cookies from "js-cookie";
import { getUnApprovedSeller } from "@/redux-store/authstore/seller/action";
import SellerCard from "@/components/Admin/Cards/SellerCard/SellerCard";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SellerRequestsPage() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [totalPage, setTotalPages] = useState(1);
    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [selectedId, setSelectedId] = useState('');
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 12);
    const router = useRouter();
       
    const seller = useSelector((state) => state.sellerReducer.unapproveseller);

    useEffect(() => {
        handleSellerLoading();
    }, [pageno, pagesize]);

    const handleSellerLoading = () => {
        const token = Cookies.get("adminToken");
        dispatch(getUnApprovedSeller({pageno, pagesize}, token));
    }
    
    const handleViewMore = (id) => {
        try {
            setSelectedId(id);
            router.push(`/admin/sellers/request/${id}`);
        } catch(e) {
            console.error(e);
        }
    }
        
    useEffect(() => {
        setTotalPages(seller?.totalPages || 1)
    }, [seller]);

    const handlePaginationChange = (_, page) => {
        setPageno(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="w-full h-full overflow-y-auto hide-scrollbar p-4 md:p-8 pt-6">
            <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Seller Requests</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Review and approve or reject pending seller applications.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seller?.content?.map((item, index) => (
                        <SellerCard 
                            seller={item} 
                            key={index} 
                            handleViewMore={handleViewMore} 
                            selectedId={selectedId}
                        />
                    ))}
                    
                    {seller?.content?.length === 0 && (
                        <div className="col-span-full py-10 flex flex-col items-center justify-center text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 border-dashed">
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No pending requests found.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPage > 1 && (
                    <div className="w-full flex justify-center py-6">
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
                                    backgroundColor: "var(--foreground)",
                                    color: "var(--background)",
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}