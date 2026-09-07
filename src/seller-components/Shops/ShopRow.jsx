"use client";

import { ArrowRight, Loader2, Lock, MapPin, Store } from "lucide-react";
import Link from "next/link";
import { canClose, formatDate, locationLine, shopName, statusMeta } from "./utils";

export default function ShopRow({ shop, href, onClose, closing }) {
    const meta = statusMeta(shop);
    const name = shopName(shop);

    return (
        <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                {shop?.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={shop.logoUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                    <Store className={`h-4 w-4 ${meta.accent}`} />
                )}
            </span>

            {/* Identity */}
            <div className="min-w-0 flex-1">
                <Link
                    href={href}
                    title={name}
                    className="block truncate text-sm font-medium transition-colors hover:text-yellow-600 focus-visible:underline focus-visible:outline-none dark:hover:text-yellow-500"
                >
                    {name}
                </Link>
                <p className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    {shop?.id || "—"}
                </p>
            </div>

            {/* Location */}
            <div className="hidden min-w-0 flex-1 items-center gap-1.5 md:flex">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span className="truncate text-xs text-zinc-600 dark:text-zinc-300">
                    {locationLine(shop)}
                </span>
            </div>

            {/* Applied */}
            <div className="hidden w-28 shrink-0 text-right text-xs text-zinc-500 xl:block dark:text-zinc-400">
                {formatDate(shop?.createdAt)}
            </div>

            {/* Status */}
            <div className="w-28 shrink-0">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                </span>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-2">
                <Link
                    href={href}
                    className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-zinc-300 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Manage
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>

                {canClose(shop) && (
                    <button
                        type="button"
                        onClick={() => onClose(shop)}
                        disabled={closing}
                        title="Close this shop"
                        aria-label={`Close ${name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                        {closing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Lock className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
