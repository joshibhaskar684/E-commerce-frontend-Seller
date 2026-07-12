"use client"

import ProductsCard from "@/components/Admin/Cards/ProductsCard/ProductsCard";
import { getProductsForSeller } from "@/redux-store/authstore/product/action";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

export default function ProductPageListComponents() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [totalPage, setTotalPages] = useState(1);
    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 12);
    
    const [loadingId, setLoadingId] = useState('');
    const [viewMoreId, setViewMoreId] = useState('');

    const products = useSelector((state) => state.productReducer.products);
    
    useEffect(() => {
        const token = Cookies.get("sellerToken");
        dispatch(getProductsForSeller({ pageno, pagesize, token }));
    }, [pageno, pagesize, dispatch]);

    useEffect(() => {
        setViewMoreId('');
    }, []);

    useEffect(() => {
        setTotalPages(products?.totalPages || 1);
    }, [products]);

    const viewMore = async (id) => {
        setViewMoreId(id);
        router.push(`/seller/products/${id}`);
    }

    const deleteProduct = async (id) => {
        setLoadingId(id);
        try {
            // Delete logic here
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId('');
        }
    }

    const handlePaginationChange = (_, page) => {
        setPageno(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-950 dark:text-zinc-50">
            <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col space-y-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage your product catalog, view details, and remove outdated items.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="w-full">
                    {products?.content?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.content.map((item, index) => (
                                <ProductsCard 
                                    key={index} 
                                    viewMoreId={viewMoreId} 
                                    product={item} 
                                    viewMore={viewMore} 
                                    deleteProduct={deleteProduct} 
                                    loadingid={loadingId} 
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950/50 min-h-[300px]">
                            <h3 className="text-lg font-semibold tracking-tight">No products found</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-4 text-center">
                                You haven't added any products yet, or they have been removed.
                            </p>
                            <button
                                onClick={() => router.push("/seller/products/new")}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                            >
                                Add Your First Product
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products?.content?.length > 0 && (
                    <div className="w-full flex justify-center pt-4 pb-12">
                        <Pagination
                            count={totalPage}
                            page={pageno}
                            onChange={handlePaginationChange}
                            shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    backgroundColor: "transparent",
                                    color: "var(--foreground, #09090b)", // zinc-950 fallback
                                    border: "1px solid transparent",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        backgroundColor: "rgba(228, 228, 231, 0.5)", // zinc-200/50
                                    }
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#09090b !important", // zinc-950
                                    color: "#fafafa", // zinc-50
                                    border: "1px solid #09090b",
                                    "&:hover": {
                                        backgroundColor: "#27272a !important", // zinc-800
                                    }
                                },
                                // Dark mode overrides (Requires wrapping component to have a .dark class)
                                ".dark & .MuiPaginationItem-root": {
                                    color: "#fafafa", // zinc-50
                                    "&:hover": {
                                        backgroundColor: "rgba(39, 39, 42, 0.5)", // zinc-800/50
                                    }
                                },
                                ".dark & .Mui-selected": {
                                    backgroundColor: "#fafafa !important", // zinc-50
                                    color: "#09090b", // zinc-950
                                    border: "1px solid #fafafa",
                                    "&:hover": {
                                        backgroundColor: "#e4e4e7 !important", // zinc-200
                                    }
                                }
                            }}
                        />
                    </div>
                )}

            </div>
        </div>
    );
}