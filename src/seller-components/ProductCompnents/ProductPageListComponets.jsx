"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { 
    Search, 
    RefreshCw, 
    Plus, 
    Package, 
    X,
    Filter
} from "lucide-react";
import { Pagination } from "@mui/material";

import ProductsCard from "@/components/Admin/Cards/ProductsCard/ProductsCard";
import DeleteProductModal from "@/components/Admin/Products/DeleteProductModal";
import { 
    getProductsForSeller, 
    deleteProductsById 
} from "@/redux-store/authstore/product/action";

const STOCK_FILTERS = [
    { id: "all", label: "All Items" },
    { id: "in_stock", label: "In Stock (>10)" },
    { id: "low_stock", label: "Low Stock (1-10)" },
    { id: "out_of_stock", label: "Out of Stock (0)" },
];

export default function ProductPageListComponents() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [totalPage, setTotalPages] = useState(1);
    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 12);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [stockFilter, setStockFilter] = useState("all");

    const [viewMoreId, setViewMoreId] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deletingId, setDeletingId] = useState("");

    const [hasFetched, setHasFetched] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const { products, loading, error } = useSelector((state) => state.productReducer);

    const fetchSellerProducts = useCallback(async () => {
        const token = Cookies.get("sellerToken");
        try {
            await dispatch(getProductsForSeller({ pageno, pagesize, token }));
        } finally {
            setHasFetched(true);
        }
    }, [dispatch, pageno, pagesize]);

    useEffect(() => {
        let isMounted = true;
        fetchSellerProducts().then(() => {
            if (isMounted) setHasFetched(true);
        });
        return () => {
            isMounted = false;
        };
    }, [fetchSellerProducts]);

    useEffect(() => {
        setViewMoreId("");
    }, []);

    useEffect(() => {
        setTotalPages(products?.totalPages || 1);
    }, [products]);

    // Redirect to create product page if there are NO products in the store catalog
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

    const viewMore = (id) => {
        setViewMoreId(id);
        router.push(`/seller/products/${id}`);
    };

    const handleDeleteRequest = (id) => {
        const target = products?.content?.find((p) => String(p?.id) === String(id));
        if (target) {
            setDeleteTarget(target);
        } else {
            setDeleteTarget({ id });
        }
    };

    const confirmDelete = async () => {
        const id = deleteTarget?.id;
        if (!id) return;
        setDeletingId(id);
        const success = await dispatch(deleteProductsById({ id }));
        setDeletingId("");
        if (success) {
            setDeleteTarget(null);
            fetchSellerProducts();
        }
    };

    const handlePaginationChange = (_, page) => {
        setPageno(page);
        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);
        router.push(`?${params.toString()}`);
    };

    // Client-side filtering
    const rawItems = useMemo(() => products?.content || [], [products]);
    const filteredItems = useMemo(() => {
        return rawItems.filter((item) => {
            // Search query match
            const q = searchQuery.trim().toLowerCase();
            if (q) {
                const matchName = item?.name?.toLowerCase().includes(q);
                const matchBrand = item?.brand?.toLowerCase().includes(q);
                const matchStore = String(item?.storeId || "").toLowerCase().includes(q);
                const matchCat = Array.isArray(item?.categoryPath) && item.categoryPath.some(c => String(c).toLowerCase().includes(q));
                if (!matchName && !matchBrand && !matchStore && !matchCat) return false;
            }

            // Stock filter match
            const qty = Number(item?.quantity);
            if (stockFilter === "in_stock") return Number.isFinite(qty) && qty > 10;
            if (stockFilter === "low_stock") return Number.isFinite(qty) && qty > 0 && qty <= 10;
            if (stockFilter === "out_of_stock") return !Number.isFinite(qty) || qty <= 0;

            return true;
        });
    }, [rawItems, searchQuery, stockFilter]);

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 font-sans text-foreground">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Products
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage inventory, view pricing details, and update your product catalog.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => fetchSellerProducts()}
                            disabled={loading}
                            title="Refresh products list"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>

                        <Link
                            href="/seller/products/create"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium text-sm h-10 px-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Product</span>
                        </Link>
                    </div>
                </div>

                {/* Filters & Search Toolbar (When items exist) */}
                {rawItems.length > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by title, brand, category..."
                                className="w-full h-10 pl-10 pr-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Stock Filter Pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
                            {STOCK_FILTERS.map((tab) => {
                                const active = stockFilter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setStockFilter(tab.id)}
                                        className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                            active
                                                ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 shadow-xs"
                                                : "bg-background border border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Product Grid Area */}
                <div className="w-full">
                    {isRedirecting || loading || !hasFetched ? (
                        /* Loading state */
                        <div className="flex flex-col items-center justify-center p-12 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl bg-background min-h-[360px] shadow-xs">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
                            <p className="text-sm font-medium text-muted-foreground mt-4">
                                {isRedirecting ? "No products found. Redirecting to product creation..." : "Loading products catalog..."}
                            </p>
                        </div>
                    ) : filteredItems.length > 0 ? (
                        /* Render Cards */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item, index) => (
                                <ProductsCard 
                                    key={item?.id || index} 
                                    viewMoreId={viewMoreId} 
                                    product={item} 
                                    viewMore={viewMore} 
                                    deleteProduct={handleDeleteRequest} 
                                    loadingid={deletingId} 
                                />
                            ))}
                        </div>
                    ) : (
                        /* Filtered empty state */
                        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-background min-h-[300px]">
                            <Package className="h-10 w-10 text-muted-foreground mb-3 opacity-60" />
                            <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                No products match your filter
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4 text-center max-w-sm">
                                Try adjusting your search query or switching the stock filter to find what you are looking for.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setStockFilter("all");
                                }}
                                className="inline-flex items-center justify-center rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {rawItems.length > 0 && !isRedirecting && (
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
                                    borderRadius: "10px",
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

            {/* Delete Confirmation Modal */}
            <DeleteProductModal
                open={Boolean(deleteTarget)}
                target={deleteTarget}
                loading={Boolean(deletingId)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
            />

        </div>
    );
}
