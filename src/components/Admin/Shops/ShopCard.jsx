"use client";

import { ArrowRight, Calendar, Hash, Loader2, MapPin, MessageSquare, Star, Store, User } from "lucide-react";
import Link from "next/link";
import {
    SHOP_ACTIONS,
    TONE_CLASS,
    daysSince,
    formatDate,
    locationLine,
    shopName,
    statusMeta,
} from "./utils";

export default function ShopCard({ shop, href, actions = [], onAction, busy }) {
    const meta = statusMeta(shop?.status);
    const waiting = daysSince(shop?.createdAt);
    const isPending = meta.tab === "pending";
    const name = shopName(shop);

    return (
        <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-background shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800">
            {/* Identity */}
            <div className="flex items-start gap-3 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                    {shop?.logoUrl ? (
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
                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        {shop?.businessOwnerName || "Owner not named"}
                        {shop?.mobileNo ? ` · ${shop.mobileNo}` : ""}
                    </p>
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

                <p className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 shrink-0 fill-current text-yellow-500" />
                        {Number(shop?.rating ?? 0).toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                        {shop?.totalReviews ?? 0} reviews
                    </span>
                </p>

                <p className="flex items-center gap-1.5 truncate">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    Applied {formatDate(shop?.createdAt)}
                    {isPending && waiting !== null && (
                        <span
                            className={`ml-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                waiting >= 7
                                    ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                                    : "bg-zinc-100 dark:bg-zinc-800"
                            }`}
                        >
                            {waiting === 0 ? "today" : `${waiting}d waiting`}
                        </span>
                    )}
                </p>

                <p className="flex items-center gap-1.5 truncate font-mono text-[11px]">
                    <Hash className="h-3.5 w-3.5 shrink-0" />
                    {shop?.id}
                </p>

                {shop?.status === "REJECTED" && shop?.rejectionReason && (
                    <p className="flex gap-1.5 rounded-md border border-red-200 bg-red-50 p-2 text-[11px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                        <span className="line-clamp-2">{shop.rejectionReason}</span>
                    </p>
                )}
            </div>

            {/* Actions — details on its own row so the verbs never get squeezed */}
            <div className="mt-auto space-y-2 border-t border-zinc-100 p-4 dark:border-zinc-800">
                <Link
                    href={href}
                    className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md border border-zinc-300 px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    View details
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>

                {actions.length > 0 && (
                    <div className="flex gap-2">
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
                                    className={`inline-flex h-9 flex-1 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${TONE_CLASS[action.tone].soft}`}
                                >
                                    {busy ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Icon className="h-4 w-4" />
                                            <span className="ml-1.5">{action.label}</span>
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
