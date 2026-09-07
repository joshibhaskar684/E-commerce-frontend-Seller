"use client";

import { AlertTriangle, BadgeCheck, Clock, Lock, Store } from "lucide-react";
import { SHOP_FILTERS } from "./utils";

const ICONS = {
    all: Store,
    live: BadgeCheck,
    review: Clock,
    attention: AlertTriangle,
    closed: Lock,
};

const ACCENTS = {
    all: "text-zinc-400",
    live: "text-emerald-500",
    review: "text-yellow-500",
    attention: "text-red-500",
    closed: "text-zinc-400",
};

/**
 * The counters double as the filter. A seller with one shop still gets a
 * readable answer to "is my shop actually selling?" without reading a table.
 */
export default function ShopStatusTabs({ active, counts, onSelect }) {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {SHOP_FILTERS.map((filter) => {
                const Icon = ICONS[filter.key];
                const isActive = filter.key === active;
                const count = counts?.[filter.key] ?? 0;
                const isAlert = filter.key === "attention" && count > 0;

                return (
                    <button
                        key={filter.key}
                        type="button"
                        onClick={() => onSelect(filter.key)}
                        aria-pressed={isActive}
                        className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 ${
                            isActive
                                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                                : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50"
                        }`}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                {filter.label}
                            </span>
                            <Icon
                                className={`h-4 w-4 shrink-0 ${
                                    isAlert ? "text-red-500" : ACCENTS[filter.key]
                                }`}
                            />
                        </div>

                        <p
                            className={`mt-2 text-2xl font-semibold tabular-nums ${
                                isAlert ? "text-red-600 dark:text-red-400" : ""
                            }`}
                        >
                            {count}
                        </p>

                        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                            {filter.blurb}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
