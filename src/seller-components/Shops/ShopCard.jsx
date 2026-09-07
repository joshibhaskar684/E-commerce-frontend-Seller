"use client";

import { ArrowRight, Calendar, Hash, Loader2, Lock, MapPin, Package, Star, Store } from "lucide-react";
import Link from "next/link";
import {
    canClose,
    canSell,
    daysSince,
    formatDate,
    locationLine,
    normalizeStatus,
    shopName,
    statusMeta,
} from "./utils";

export default function ShopCard({ shop, href, onClose, closing }) {
    const meta = statusMeta(shop);
    const name = shopName(shop);
    const waiting = daysSince(shop?.createdAt);
    const isPending = normalizeStatus(shop) === "PENDING";
    const StatusIcon = meta.icon;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Banner — the seller's own artwork, so it is worth showing */}
            <div className="relative h-24 w-full bg-zinc-100 dark:bg-zinc-800">
                {shop?.bannerUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={shop.bannerUrl}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Store className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />
                    </div>
                )}
            </div>

            {/* Identity */}
            <div className="flex items-start gap-3 p-4">
                <span className="-mt-9 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-zinc-50 shadow-sm dark:border-zinc-900 dark:bg-zinc-800">
                    {shop?.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={shop.logoUrl}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <Store className={`h-5 w-5 ${meta.accent}`} />
                    )}
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-tight">
                        <Link
                            href={href}
                            title={name}
                            className="line-clamp-2 transition-colors hover:text-yellow-600 focus-visible:underline focus-visible:outline-none dark:hover:text-yellow-500"
                        >
                            {name}
                        </Link>
                    </h3>
                    {shop?.description && (
                        <p className="mt-1 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {shop.description}
                        </p>
                    )}
                </div>

                <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${meta.badge}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                </span>
            </div>

            {/* Meta */}
            <div className="space-y-2 border-t border-zinc-100 px-4 py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {locationLine(shop)}
                </p>

                {canSell(shop) && (
                    <p className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 shrink-0 fill-current text-yellow-500" />
                            {Number(shop?.rating ?? 0).toFixed(1)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            {shop?.totalReviews ?? 0} reviews
                        </span>
                    </p>
                )}

                <p className="flex items-center gap-1.5 truncate">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    Applied {formatDate(shop?.createdAt)}
                    {isPending && waiting !== null && (
                        <span className="ml-1 shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium dark:bg-zinc-800">
                            {waiting === 0 ? "today" : `${waiting}d waiting`}
                        </span>
                    )}
                </p>

                {shop?.id && (
                    <p className="flex items-center gap-1.5 truncate font-mono text-[11px]">
                        <Hash className="h-3.5 w-3.5 shrink-0" />
                        {shop.id}
                    </p>
                )}

                {/* What this status means for the seller, in plain words */}
                <p
                    className={`flex gap-2 rounded-md border p-2 text-[11px] leading-relaxed ${meta.badge}`}
                >
                    <StatusIcon className="mt-px h-3.5 w-3.5 shrink-0" />
                    <span>{meta.guidance}</span>
                </p>

                {normalizeStatus(shop) === "REJECTED" && shop?.rejectionReason && (
                    <p className="rounded-md border border-red-200 bg-red-50 p-2 text-[11px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        <span className="font-medium">Reason: </span>
                        {shop.rejectionReason}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-2 border-t border-zinc-100 p-4 dark:border-zinc-800">
                <div className="flex gap-2">
                    <Link
                        href={href}
                        className="inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-md border border-zinc-300 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Manage
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>

                    {canClose(shop) && (
                        <button
                            type="button"
                            onClick={() => onClose(shop)}
                            disabled={closing}
                            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-red-200 px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                            {closing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <Lock className="h-4 w-4" />
                                    <span className="ml-1.5">Close</span>
                                </>
                            )}
                        </button>
                    )}
                </div>

                {canSell(shop) && (
                    <Link
                        href="/seller/products/create"
                        className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-yellow-500 px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    >
                        <Package className="h-4 w-4" />
                        <span className="ml-1.5">Add a product</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
