"use client";

import ProductsCard from "@/components/Admin/Cards/ProductsCard/ProductsCard";
import { getProductsForSeller } from "@/redux-store/authstore/product/action";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
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
    const [hasFetched, setHasFetched] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const { products, loading, error } = useSelector((state) => state.productReducer);
    
    useEffect(() => {
        let isMounted = true;
        const token = Cookies.get("sellerToken");
        dispatch(getProductsForSeller({ pageno, pagesize, token }))
            .finally(() => {
                if (isMounted) {
                    setHasFetched(true);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [pageno, pagesize, dispatch]);

    useEffect(() => {
        setViewMoreId('');
    }, []);

    useEffect(() => {
        setTotalPages(products?.totalPages || 1);
    }, [products]);

    // Redirect to create product page if there are no products
    useEffect(() => {
        if (!hasFetched || loading) return;

        const totalItems = products?.totalElements ?? products?.content?.length ?? (Array.isArray(products) ? products.length : null);
        const isEmpty =
            products?.empty === true ||
            totalItems === 0 ||
            (Array.isArray(products?.content) && products.content.length === 0 && pageno === 1) ||
            (Array.isArray(products) && products.length === 0) ||
            (!products && !loading && hasFetched && error && (String(error).includes("404") || String(error).toLowerCase().includes("not found")));

        if (isEmpty) {
            setIsRedirecting(true);
            router.replace("/seller/products/create");
        }
    }, [hasFetched, loading, products, error, pageno, router]);

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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <div className="space-y-1.5">
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Manage your product catalog, view details, and remove outdated items.
                        </p>
                    </div>
                    <Link
                        href="/seller/products/create"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 w-fit"
                    >
                        Create Product
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="w-full">
                    {isRedirecting || loading || !hasFetched ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950/50 min-h-[300px]">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                                {isRedirecting ? "No products found. Redirecting to product creation..." : "Loading products..."}
                            </p>
                        </div>
                    ) : products?.content?.length > 0 ? (
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
                                Redirecting to create product...
                            </p>
                            <button
                                onClick={() => router.push("/seller/products/create")}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300 cursor-pointer"
                            >
                                Add Your First Product
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products?.content?.length > 0 && !isRedirecting && (
                    <div className="w-full flex justify-center pt-4 pb-12">
                        <Pagination
                            count={totalPage}
                            page={pageno}
                            onChange={handlePaginationChange}
                            shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    backgroundColor: "transparent",
                                    color: "var(--foreground, #09090b)",
                                    border: "1px solid transparent",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        backgroundColor: "rgba(228, 228, 231, 0.5)",
                                    }
                                },
                                "& .Mui-selected": {
                                    backgroundColor: "#09090b !important",
                                    color: "#fafafa",
                                    border: "1px solid #09090b",
                                    "&:hover": {
                                        backgroundColor: "#27272a !important",
                                    }
                                },
                                ".dark & .MuiPaginationItem-root": {
                                    color: "#fafafa",
                                    "&:hover": {
                                        backgroundColor: "rgba(39, 39, 42, 0.5)",
                                    }
                                },
                                ".dark & .Mui-selected": {
                                    backgroundColor: "#fafafa !important",
                                    color: "#09090b",
                                    border: "1px solid #fafafa",
                                    "&:hover": {
                                        backgroundColor: "#e4e4e7 !important",
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
