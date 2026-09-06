"use client";

import { ArrowRight, ImageOff, Loader2, Trash2 } from "lucide-react";
import {
    discountPercent,
    formatDate,
    formatINR,
    productImage,
    stockStatus,
    stockToneClass,
} from "./utils";

export default function ProductRow({ product, onView, onDelete, opening, deleting }) {
    const image = productImage(product);
    const discount = discountPercent(product);
    const stock = stockStatus(product);
    const path = product?.categoryPath?.join(" › ");

    return (
        <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            {/* Thumb */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                {image ? (
                    <img
                        src={image}
                        alt={product?.name || "Product"}
                        loading="lazy"
                        className="h-full w-full object-contain p-1"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <ImageOff className="h-4 w-4" />
                    </span>
                )}
            </div>

            {/* Identity */}
            <div className="min-w-0 flex-1">
                <p title={product?.name} className="truncate text-sm font-medium">
                    {product?.name}
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {product?.brand || "Unbranded"}
                    {path ? ` · ${path}` : ""}
                </p>
            </div>

            {/* Price */}
            <div className="hidden w-32 shrink-0 text-right sm:block">
                <p className="text-sm font-semibold tabular-nums">
                    {formatINR(Number(product?.price))}
                </p>
                {discount > 0 && (
                    <p className="text-[11px] text-zinc-400 line-through tabular-nums dark:text-zinc-500">
                        {formatINR(Number(product?.originalPrice))}
                    </p>
                )}
            </div>

            {/* Stock */}
            <div className="hidden w-32 shrink-0 md:block">
                <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${stockToneClass[stock.tone]}`}
                >
                    {stock.label}
                </span>
            </div>

            {/* Updated */}
            <div className="hidden w-28 shrink-0 text-right text-xs text-zinc-500 lg:block dark:text-zinc-400">
                {formatDate(product?.updatedAt)}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    onClick={() => onView(product?.id)}
                    disabled={opening}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    {opening ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <span className="hidden sm:inline">View</span>
                            <ArrowRight className="h-4 w-4 sm:ml-1.5" />
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(product)}
                    disabled={deleting}
                    title="Delete product"
                    aria-label="Delete product"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 text-zinc-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:border-red-900/60 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                >
                    {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Trash2 className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
