"use client";

import { ArrowRight, Loader2, Star, Store } from "lucide-react";
import Link from "next/link";
import {
    SHOP_ACTIONS,
    TONE_CLASS,
    formatDate,
    locationLine,
    shopName,
    statusMeta,
} from "./utils";

export default function ShopRow({ shop, href, actions = [], onAction, busy }) {
    const meta = statusMeta(shop?.status);
    const name = shopName(shop);

    return (
        <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                {shop?.logoUrl ? (
                    <img
                        src={shop.logoUrl}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <Store className={`h-4 w-4 ${meta.accent}`} />
                )}
            </span>

            {/* Identity */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    <Link
                        href={href}
                        title={name}
                        className="transition-colors hover:text-yellow-600 focus-visible:underline focus-visible:outline-none dark:hover:text-yellow-500"
                    >
                        {name}
                    </Link>
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {shop?.businessOwnerName || "Owner not named"} ·{" "}
                    <span className="font-mono">{shop?.id}</span>
                </p>
            </div>

            {/* Location */}
            <div className="hidden w-40 shrink-0 truncate text-xs text-zinc-500 md:block dark:text-zinc-400">
                {locationLine(shop)}
            </div>

            {/* Rating */}
            <div className="hidden w-20 shrink-0 items-center gap-1.5 text-xs text-zinc-500 lg:flex dark:text-zinc-400">
                <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                {Number(shop?.rating ?? 0).toFixed(1)}
            </div>

            {/* Status */}
            <div className="hidden w-28 shrink-0 sm:block">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                </span>
            </div>

            {/* Applied */}
            <div className="hidden w-28 shrink-0 text-right text-xs text-zinc-500 lg:block dark:text-zinc-400">
                {formatDate(shop?.createdAt)}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
                {actions.map((key) => {
                    const action = SHOP_ACTIONS[key];
                    if (!action) return null;
                    const Icon = action.icon;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onAction(key, shop)}
                            disabled={busy}
                            title={action.cta}
                            aria-label={action.cta}
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${TONE_CLASS[action.tone].soft}`}
                        >
                            {busy ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Icon className="h-4 w-4" />
                            )}
                        </button>
                    );
                })}

                <Link
                    href={href}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    <span className="hidden sm:inline">View</span>
                    <ArrowRight className="h-4 w-4 sm:ml-1.5" />
                </Link>
            </div>
        </div>
    );
}
