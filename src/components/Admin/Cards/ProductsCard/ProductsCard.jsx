"use client";

import { useState } from "react";
import { 
    ArrowRight, 
    ImageOff, 
    Package, 
    Trash2, 
    Store, 
    ShieldCheck, 
    Tag, 
    Layers,
    Loader2
} from "lucide-react";

export default function ProductsCard({ viewMore, viewMoreId, product, deleteProduct, loadingid }) {
    const [imgError, setImgError] = useState(false);

    // Helpers
    const price = Number(product?.price);
    const originalPrice = Number(product?.originalPrice);
    const hasDiscount = originalPrice > 0 && price > 0 && originalPrice > price;
    const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const savings = hasDiscount ? originalPrice - price : 0;

    const image = !imgError ? (product?.image || product?.images?.[0] || null) : null;
    const quantity = Number(product?.quantity);
    
    // Stock status
    const isOutOfStock = Number.isFinite(quantity) && quantity <= 0;
    const isLowStock = Number.isFinite(quantity) && quantity > 0 && quantity <= 10;
    const isInStock = Number.isFinite(quantity) && quantity > 10;

    const isOpening = viewMoreId === product?.id;
    const isDeleting = loadingid === product?.id;

    const categoryText = Array.isArray(product?.categoryPath) && product.categoryPath.length > 0 
        ? product.categoryPath.join(" › ") 
        : null;

    const formatINR = (val) => {
        if (typeof val !== "number" || Number.isNaN(val)) return "—";
        return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="group relative flex flex-col h-full rounded-2xl border border-zinc-200/80 bg-background text-foreground shadow-sm hover:shadow-xl transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 overflow-hidden">
            
            {/* Image Header & Badges */}
            <div 
                onClick={() => viewMore && viewMore(product?.id)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50/80 dark:bg-zinc-900/60 flex items-center justify-center p-4 border-b border-zinc-100 dark:border-zinc-800/80 cursor-pointer"
            >
                {image ? (
                    <img
                        src={image}
                        alt={product?.name || "Product"}
                        onError={() => setImgError(true)}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700 gap-1.5">
                        <Package className="h-10 w-10 stroke-[1.5]" />
                        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                            No image available
                        </span>
                    </div>
                )}

                {/* Floating Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-zinc-950 shadow-md">
                        <Tag className="h-3 w-3" />
                        <span>{discount}% OFF</span>
                    </div>
                )}

                {/* Floating Stock Badge */}
                <div className="absolute top-3 right-3">
                    {isOutOfStock ? (
                        <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
                            Out of stock
                        </span>
                    ) : isLowStock ? (
                        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-400">
                            Low: {quantity} left
                        </span>
                    ) : isInStock ? (
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
                            In stock ({quantity})
                        </span>
                    ) : null}
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5 gap-2.5">
                
                {/* Brand & Category */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                        {product?.brand || "Brand"}
                    </span>
                    {product?.color && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md">
                            <span className="w-2 h-2 rounded-full border border-zinc-300 dark:border-zinc-600 bg-current opacity-80" />
                            {product.color}
                        </span>
                    )}
                </div>

                {/* Product Title */}
                <h3 
                    title={product?.name}
                    onClick={() => viewMore && viewMore(product?.id)}
                    className="text-base font-semibold leading-snug line-clamp-2 text-foreground hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors"
                >
                    {product?.name || "Untitled Product"}
                </h3>

                {/* Category Breadcrumbs */}
                {categoryText && (
                    <p title={categoryText} className="text-xs text-muted-foreground truncate">
                        {categoryText}
                    </p>
                )}

                {/* Pricing Block */}
                <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                        ₹{formatINR(price)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm font-medium text-muted-foreground line-through">
                            ₹{formatINR(originalPrice)}
                        </span>
                    )}
                    {savings > 0 && (
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            Save ₹{formatINR(savings)}
                        </span>
                    )}
                </div>

                {/* Meta details footer */}
                <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    {product?.storeId && (
                        <div className="flex items-center gap-1 truncate" title={`Store ID: ${product.storeId}`}>
                            <Store className="h-3.5 w-3.5 shrink-0 opacity-70" />
                            <span className="truncate font-mono text-[11px]">{product.storeId}</span>
                        </div>
                    )}
                    {product?.returnDay && (
                        <div className="flex items-center gap-1 shrink-0" title={`${product.returnDay} Days Return Policy`}>
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[11px]">{product.returnDay}d return</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 pt-0 grid grid-cols-5 gap-2">
                <button
                    type="button"
                    onClick={() => viewMore && viewMore(product?.id)}
                    disabled={isOpening}
                    className="col-span-4 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium text-sm h-10 px-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isOpening ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Opening...</span>
                        </>
                    ) : (
                        <>
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => deleteProduct && deleteProduct(product?.id)}
                    disabled={isDeleting}
                    title="Delete Product"
                    aria-label="Delete Product"
                    className="col-span-1 inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:border-red-900/40 dark:hover:bg-red-950/30 transition-colors h-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin text-red-600" />
                    ) : (
                        <Trash2 className="h-4 w-4" />
                    )}
                </button>
            </div>

        </div>
    );
}
