"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";
import { 
    ArrowLeft, 
    Pencil, 
    Trash2, 
    RefreshCw, 
    Package, 
    PackageX, 
    Store, 
    Tag, 
    ShieldCheck, 
    Calendar, 
    Clock, 
    Layers, 
    ChevronLeft, 
    ChevronRight, 
    Copy, 
    Check, 
    Loader2, 
    X,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { Modal } from "@mui/material";

import { 
    getProductsByIdSeller, 
    updateProductsById, 
    deleteProductsById 
} from "@/redux-store/authstore/product/action";
import DeleteProductModal from "@/components/Admin/Products/DeleteProductModal";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const productId = params?.productId;
    const token = Cookies.get("sellerToken");

    const [fetching, setFetching] = useState(true);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [copiedField, setCopiedField] = useState(null);

    // Edit modal state
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: "",
        brand: "",
        price: "",
        originalPrice: "",
        quantity: "",
        color: "",
        returnDay: "",
        description: "",
    });

    // Delete modal state
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const productdetails = useSelector((state) => state.productReducer.productsdetails);
    const productError = useSelector((state) => state.productReducer.error);

    const loadProductData = useCallback(async () => {
        if (!productId) return;
        setFetching(true);
        try {
            await dispatch(getProductsByIdSeller({ productId, token }));
        } finally {
            setFetching(false);
        }
    }, [dispatch, productId, token]);

    useEffect(() => {
        loadProductData();
    }, [loadProductData]);

    // Populate edit form data when product details arrive
    useEffect(() => {
        if (productdetails && String(productdetails.id) === String(productId)) {
            setEditFormData({
                name: productdetails.name || "",
                brand: productdetails.brand || "",
                price: productdetails.price !== undefined ? String(productdetails.price) : "",
                originalPrice: productdetails.originalPrice !== undefined ? String(productdetails.originalPrice) : "",
                quantity: productdetails.quantity !== undefined ? String(productdetails.quantity) : "",
                color: productdetails.color || "",
                returnDay: productdetails.returnDay !== undefined ? String(productdetails.returnDay) : "",
                description: productdetails.description || "",
            });
            setActiveImgIndex(0);
        }
    }, [productdetails, productId]);

    // Images list
    const images = useMemo(() => {
        if (Array.isArray(productdetails?.images) && productdetails.images.length > 0) {
            return productdetails.images;
        }
        if (productdetails?.image) {
            return [productdetails.image];
        }
        return [];
    }, [productdetails]);

    // Copy helper
    const handleCopy = (text, fieldName) => {
        if (!text) return;
        navigator.clipboard.writeText(String(text));
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Calculations
    const price = Number(productdetails?.price);
    const originalPrice = Number(productdetails?.originalPrice);
    const hasDiscount = originalPrice > 0 && price > 0 && originalPrice > price;
    const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const savings = hasDiscount ? originalPrice - price : 0;
    const quantity = Number(productdetails?.quantity);

    const isOutOfStock = Number.isFinite(quantity) && quantity <= 0;
    const isLowStock = Number.isFinite(quantity) && quantity > 0 && quantity <= 10;
    const isInStock = Number.isFinite(quantity) && quantity > 10;

    const formatINR = (val) => {
        if (typeof val !== "number" || Number.isNaN(val)) return "—";
        return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val);
    };

    // Update Product Handler
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const payload = {
                id: productId,
                name: editFormData.name.trim(),
                brand: editFormData.brand.trim(),
                price: parseFloat(editFormData.price) || 0,
                originalPrice: parseFloat(editFormData.originalPrice) || 0,
                quantity: parseInt(editFormData.quantity, 10) || 0,
                color: editFormData.color.trim(),
                returnDay: parseInt(editFormData.returnDay, 10) || 0,
                description: editFormData.description.trim(),
            };
            const success = await dispatch(updateProductsById(payload));
            if (success) {
                setIsEditOpen(false);
                await loadProductData();
            }
        } finally {
            setUpdating(false);
        }
    };

    // Delete Product Handler
    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            const success = await dispatch(deleteProductsById({ id: productId }));
            if (success) {
                setIsDeleteOpen(false);
                router.push("/seller/products");
            }
        } finally {
            setDeleting(false);
        }
    };

    // 1. Loading Skeleton
    if (fetching && !productdetails) {
        return (
            <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 p-4 sm:p-6 md:p-10">
                <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
                    {/* Top bar skeleton */}
                    <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                    
                    {/* 2-column showcase skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-6 h-[460px] bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
                        <div className="lg:col-span-6 space-y-5">
                            <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                            <div className="h-8 w-44 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Not Found Screen
    if (!productdetails || productError) {
        return (
            <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 flex items-center justify-center p-6">
                <div className="max-w-md w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-5">
                        <PackageX className="h-8 w-8 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
                    <p className="text-sm text-muted-foreground mt-2 mb-6">
                        The requested product ({productId}) could not be retrieved. It may have been removed or does not belong to your store.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link
                            href="/seller/products"
                            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>All Products</span>
                        </Link>
                        <button
                            type="button"
                            onClick={loadProductData}
                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span>Retry</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50/40 dark:bg-zinc-950 text-foreground font-sans">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 space-y-8">
                
                {/* Top Navigation & Action Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
                    
                    {/* Breadcrumbs & Back */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/seller/products"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Back to products"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Link href="/seller" className="hover:text-foreground transition-colors">Seller</Link>
                                <span>/</span>
                                <Link href="/seller/products" className="hover:text-foreground transition-colors">Products</Link>
                                <span>/</span>
                                <span className="text-foreground font-mono truncate max-w-[150px]">{productId}</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate max-w-xl mt-0.5">
                                {productdetails?.name}
                            </h1>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={loadProductData}
                            disabled={fetching}
                            className="inline-flex h-10 items-center gap-2 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsEditOpen(true)}
                            className="inline-flex h-10 items-center gap-2 px-4 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer"
                        >
                            <Pencil className="h-4 w-4" />
                            <span>Edit Product</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsDeleteOpen(true)}
                            className="inline-flex h-10 items-center gap-2 px-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Delete</span>
                        </button>
                    </div>
                </div>

                {/* Main Product Showcase (2-Column Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Image Showcase & Gallery */}
                    <div className="lg:col-span-6 space-y-4">
                        
                        {/* Main Image Stage */}
                        <div className="relative aspect-[4/3] w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-6 flex items-center justify-center overflow-hidden shadow-sm">
                            {images.length > 0 ? (
                                <img
                                    src={images[activeImgIndex]}
                                    alt={productdetails?.name}
                                    className="max-h-full max-w-full object-contain transition-all duration-300"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-zinc-400 gap-2">
                                    <Package className="h-16 w-16 stroke-[1.2]" />
                                    <span className="text-sm font-medium">No Image Available</span>
                                </div>
                            )}

                            {/* Discount Badge */}
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-zinc-950 shadow-md">
                                    <Tag className="h-3.5 w-3.5" />
                                    <span>{discount}% OFF</span>
                                </div>
                            )}

                            {/* Image Counter / Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-700 shadow-md text-foreground hover:bg-background cursor-pointer"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-xs border border-zinc-200 dark:border-zinc-700 shadow-md text-foreground hover:bg-background cursor-pointer"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                    <div className="absolute bottom-3 right-3 rounded-md bg-zinc-900/70 text-zinc-100 text-[11px] px-2.5 py-0.5 font-mono">
                                        {activeImgIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
                                {images.map((img, idx) => {
                                    const isActive = idx === activeImgIndex;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveImgIndex(idx)}
                                            className={`relative h-20 w-20 shrink-0 rounded-xl border bg-background p-1.5 transition-all cursor-pointer ${
                                                isActive
                                                    ? "border-zinc-900 ring-2 ring-zinc-900 dark:border-zinc-100 dark:ring-zinc-100"
                                                    : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="h-full w-full object-contain rounded-lg"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Commercial & Specifications Overview */}
                    <div className="lg:col-span-6 space-y-6">
                        
                        {/* Status, Brand & Category Bar */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Stock Badge */}
                            {isOutOfStock ? (
                                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
                                    Out of stock
                                </span>
                            ) : isLowStock ? (
                                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">
                                    Low Stock ({quantity} remaining)
                                </span>
                            ) : isInStock ? (
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
                                    In Stock ({quantity} units)
                                </span>
                            ) : null}

                            {/* Brand Pill */}
                            <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {productdetails?.brand || "Brand"}
                            </span>

                            {/* Return Window */}
                            {productdetails?.returnDay && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    <span>{productdetails.returnDay} Days Return</span>
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
                            {productdetails?.name}
                        </h2>

                        {/* Category Path Chips */}
                        {Array.isArray(productdetails?.categoryPath) && productdetails.categoryPath.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                <Layers className="h-3.5 w-3.5 shrink-0 opacity-70" />
                                {productdetails.categoryPath.map((cat, idx) => (
                                    <span key={idx} className="flex items-center gap-1.5">
                                        <span className="font-medium text-foreground/80 hover:text-foreground">
                                            {cat}
                                        </span>
                                        {idx < productdetails.categoryPath.length - 1 && <span>›</span>}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Price Card */}
                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-5 shadow-xs space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Selling Price
                            </span>
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                                    ₹{formatINR(price)}
                                </span>
                                {hasDiscount && (
                                    <span className="text-lg font-medium text-muted-foreground line-through">
                                        ₹{formatINR(originalPrice)}
                                    </span>
                                )}
                                {savings > 0 && (
                                    <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        Save ₹{formatINR(savings)} ({discount}% OFF)
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Inclusive of all GST and seller platform fees.
                            </p>
                        </div>

                        {/* Quick Attributes Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {/* Color */}
                            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-3.5 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Color
                                </span>
                                <div className="flex items-center gap-1.5 font-medium text-sm">
                                    <span className="w-3 h-3 rounded-full border border-zinc-300 dark:border-zinc-700 bg-current opacity-80" />
                                    <span className="truncate">{productdetails?.color || "Default"}</span>
                                </div>
                            </div>

                            {/* Stock Quantity */}
                            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-3.5 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Inventory
                                </span>
                                <p className="font-semibold text-sm">
                                    {quantity || 0} Units
                                </p>
                            </div>

                            {/* Store ID */}
                            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-3.5 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Store ID
                                </span>
                                <div className="flex items-center justify-between gap-1">
                                    <span className="font-mono text-xs truncate">
                                        {productdetails?.storeId || "—"}
                                    </span>
                                    {productdetails?.storeId && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(productdetails.storeId, "storeId")}
                                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                                            title="Copy store id"
                                        >
                                            {copiedField === "storeId" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Return Days */}
                            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-3.5 space-y-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Returns
                                </span>
                                <p className="font-semibold text-sm">
                                    {productdetails?.returnDay ? `${productdetails.returnDay} Days` : "No Returns"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Lower Tabs / Sections: Description & Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                    
                    {/* Left: Description */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-6 shadow-xs space-y-4">
                            <h3 className="text-lg font-bold text-foreground tracking-tight">
                                Product Description
                            </h3>
                            {productdetails?.description ? (
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {productdetails.description}
                                </p>
                            ) : (
                                <p className="text-sm italic text-muted-foreground">
                                    No description provided for this product. Click "Edit Product" to add one.
                                </p>
                            )}
                        </div>

                        {/* System Metadata Card */}
                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-6 shadow-xs space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Record Metadata
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <span className="text-muted-foreground">Product ID:</span>
                                    <div className="flex items-center gap-2 font-mono font-medium text-foreground">
                                        <span className="truncate">{productId}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(productId, "productId")}
                                            className="text-muted-foreground hover:text-foreground cursor-pointer"
                                            title="Copy product ID"
                                        >
                                            {copiedField === "productId" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-muted-foreground">Category ID:</span>
                                    <p className="font-mono font-medium text-foreground">
                                        {productdetails?.categoryId || "—"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-muted-foreground">Created:</span>
                                    <p className="font-medium text-foreground flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                        {productdetails?.createdAt ? new Date(productdetails.createdAt).toLocaleString("en-IN") : "—"}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <p className="font-medium text-foreground flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                        {productdetails?.updatedAt ? new Date(productdetails.updatedAt).toLocaleString("en-IN") : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Specifications */}
                    <div className="lg:col-span-5">
                        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-background p-6 shadow-xs space-y-4">
                            <h3 className="text-lg font-bold text-foreground tracking-tight">
                                Specifications
                            </h3>
                            
                            {productdetails?.specifications && Object.keys(productdetails.specifications).length > 0 ? (
                                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 border-t border-b border-zinc-100 dark:border-zinc-800/80">
                                    {Object.entries(productdetails.specifications).map(([key, value]) => (
                                        <div key={key} className="py-2.5 flex items-start justify-between gap-4 text-sm">
                                            <span className="font-medium text-muted-foreground shrink-0 max-w-[40%]">
                                                {key}
                                            </span>
                                            <span className="text-foreground text-right font-medium">
                                                {String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm italic text-muted-foreground">
                                    No custom specifications recorded for this product.
                                </p>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {/* Edit Product Modal */}
            <Modal open={isEditOpen} onClose={updating ? undefined : () => setIsEditOpen(false)}>
                <div className="flex h-full w-full items-center justify-center p-4 outline-none overflow-y-auto">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-2xl my-8">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-6">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Edit Product</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Update core commercial details and inventory levels
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                disabled={updating}
                                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                            
                            {/* Product Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                />
                            </div>

                            {/* Brand & Color */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Brand
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.brand}
                                        onChange={(e) => setEditFormData({ ...editFormData, brand: e.target.value })}
                                        className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.color}
                                        onChange={(e) => setEditFormData({ ...editFormData, color: e.target.value })}
                                        className="w-full h-10 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                            </div>

                            {/* Price, Original Price, Quantity, Return Days */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={editFormData.price}
                                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        MRP (₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editFormData.originalPrice}
                                        onChange={(e) => setEditFormData({ ...editFormData, originalPrice: e.target.value })}
                                        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={editFormData.quantity}
                                        onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
                                        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                        Returns (Days)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={editFormData.returnDay}
                                        onChange={(e) => setEditFormData({ ...editFormData, returnDay: e.target.value })}
                                        className="w-full h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground uppercase tracking-wide">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                                />
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    disabled={updating}
                                    className="px-4 py-2 text-sm font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer disabled:opacity-60"
                                >
                                    {updating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <span>Save Changes</span>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteProductModal
                open={isDeleteOpen}
                target={productdetails}
                loading={deleting}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />

        </div>
    );
}
