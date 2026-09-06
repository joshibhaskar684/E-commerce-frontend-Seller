"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { SELLER_ACTIONS, TONE_CLASS, formatDate, initials, locationLine, statusMeta } from "./utils";

export default function SellerRow({ seller, href, actions = [], onAction, busy }) {
    const meta = statusMeta(seller?.status);

    return (
        <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 ${meta.accent}`}
            >
                {initials(seller?.businessName)}
            </span>

            {/* Identity */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    <Link
                        href={href}
                        title={seller?.businessName}
                        className="transition-colors hover:text-yellow-600 focus-visible:outline-none focus-visible:underline dark:hover:text-yellow-500"
                    >
                        {seller?.businessName || "Unnamed business"}
                    </Link>
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {seller?.mobileNo || "No contact"} · <span className="font-mono">{seller?.id}</span>
                </p>
            </div>

            {/* Location */}
            <div className="hidden w-40 shrink-0 truncate text-xs text-zinc-500 md:block dark:text-zinc-400">
                {locationLine(seller)}
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
                {formatDate(seller?.createdAt)}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
                {actions.map((key) => {
                    const action = SELLER_ACTIONS[key];
                    if (!action) return null;
                    const Icon = action.icon;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onAction(key, seller)}
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
