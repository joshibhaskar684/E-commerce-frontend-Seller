"use client";

import { ArrowRight, ImageOff, Loader2, Store, Trash2 } from "lucide-react";
import {
    discountPercent,
    formatDate,
    formatINR,
    productImage,
    stockStatus,
    stockToneClass,
} from "./utils";

export default function ProductCard({ product, onView, onDelete, opening, deleting }) {
    const image = productImage(product);
    const discount = discountPercent(product);
    const stock = stockStatus(product);
    const path = product?.categoryPath?.join(" › ");

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800">
            {/* Media */}
            <button
                type="button"
                onClick={() => onView(product?.id)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500 dark:bg-zinc-900"
            >
                {image ? (
                    <img
                        src={image}
                        alt={product?.name || "Product"}
                        loading="lazy"
                        className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-700">
                        <ImageOff className="h-8 w-8" />
                    </span>
                )}

                {discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-md bg-yellow-500 px-2 py-0.5 text-[11px] font-semibold text-zinc-950 shadow-sm">
                        {discount}% OFF
                    </span>
                )}

                <span
                    className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[11px] font-medium ${stockToneClass[stock.tone]}`}
                >
                    {stock.label}
                </span>
            </button>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {product?.brand || "Unbranded"}
                </p>

                <h3
                    title={product?.name}
                    className="line-clamp-2 text-[15px] font-semibold leading-snug"
                >
                    {product?.name}
                </h3>

                {path && (
                    <p title={path} className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                        {path}
                    </p>
                )}

                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-xl font-semibold tabular-nums">
                        {formatINR(Number(product?.price))}
                    </span>
                    {discount > 0 && (
                        <span className="text-sm text-zinc-400 line-through tabular-nums dark:text-zinc-500">
                            {formatINR(Number(product?.originalPrice))}
                        </span>
                    )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex min-w-0 items-center gap-1">
                        <Store className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate font-mono">{product?.storeId || "—"}</span>
                    </span>
                    <span className="shrink-0">Updated {formatDate(product?.updatedAt)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
                <button
                    type="button"
                    onClick={() => onView(product?.id)}
                    disabled={opening}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-yellow-500 px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
                >
                    {opening ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Opening
                        </>
                    ) : (
                        <>
                            View details
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(product)}
                    disabled={deleting}
                    title="Delete product"
                    aria-label="Delete product"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-300 text-zinc-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:border-red-900/60 dark:hover:bg-red-950/40 dark:hover:text-red-400"
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
