"use client";

import { SELLER_TABS, TAB_KEYS } from "./tabs";

/**
 * The four seller queues, doubling as the screen's overview strip: each tile is
 * both the headline count for that state and the control that filters the list
 * down to it.
 */
export default function SellerStatusTabs({ active, counts, onSelect }) {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {TAB_KEYS.map((key) => {
                const tab = SELLER_TABS[key];
                const Icon = tab.icon;
                const isActive = key === active;
                const count = counts?.[key];

                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onSelect(key)}
                        aria-pressed={isActive}
                        title={tab.blurb}
                        className={`group rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 ${
                            isActive
                                ? "border-yellow-500 bg-yellow-500/10 shadow-sm dark:bg-yellow-500/5"
                                : "border-zinc-200 bg-background hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${tab.accent}`} />
                            <span className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                {tab.label}
                            </span>
                        </div>

                        {count === null || count === undefined ? (
                            <div className="mt-2 h-6 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        ) : (
                            <p className="mt-1 text-2xl font-semibold tabular-nums">{count}</p>
                        )}

                        <p className="mt-0.5 hidden text-[11px] leading-snug text-zinc-400 sm:line-clamp-2 dark:text-zinc-500">
                            {tab.blurb}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}
