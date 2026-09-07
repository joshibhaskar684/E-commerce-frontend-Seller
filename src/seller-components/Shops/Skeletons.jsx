/**
 * Skeleton pieces for the seller shop screens.
 *
 * No "use client" and no hooks on purpose, so the same shapes serve both the
 * in-page loading states and the route-level loading.jsx files.
 */

export function Skeleton({ className = "" }) {
    return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${className}`} />;
}

export function StatTilesSkeleton({ count = 5 }) {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {Array.from({ length: count }).map((_, tile) => (
                <div key={tile} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="mt-3 h-7 w-10" />
                    <Skeleton className="mt-2 h-3 w-24" />
                </div>
            ))}
        </div>
    );
}

export function ToolbarSkeleton() {
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
            <Skeleton className="h-10 min-w-[220px] flex-1 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
        </div>
    );
}

/** Matches ShopCard: banner strip, logo + name, meta rows, action footer. */
export function ShopCardsSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: count }).map((_, card) => (
                <div
                    key={card}
                    className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                    <Skeleton className="h-24 w-full rounded-none" />
                    <div className="flex items-start gap-3 p-4">
                        <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/5" />
                            <Skeleton className="h-3 w-2/5" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="space-y-2 border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="flex gap-2 border-t border-zinc-100 p-4 dark:border-zinc-800">
                        <Skeleton className="h-9 flex-1 rounded-md" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}

/** Matches ShopRow. */
export function ShopRowsSkeleton({ count = 5 }) {
    return (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {Array.from({ length: count }).map((_, row) => (
                <div key={row} className="flex items-center gap-4 px-4 py-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="hidden h-3 w-32 md:block" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            ))}
        </div>
    );
}

/** Whole-page placeholder for /seller/shops. */
export function ShopsPageSkeleton() {
    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </div>
                <Skeleton className="h-10 w-44 rounded-md" />
            </div>
            <StatTilesSkeleton />
            <ToolbarSkeleton />
            <ShopCardsSkeleton />
        </div>
    );
}

/** Whole-page placeholder for /seller/shops/[sellerId]. */
export function ShopDetailSkeleton() {
    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
            <Skeleton className="h-5 w-32" />

            <div className="space-y-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                    <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-7 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="h-7 w-24 rounded-full" />
                </div>
                <Skeleton className="h-16 w-full rounded-lg" />
            </div>

            <div className="space-y-4 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-40 w-full rounded-lg" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, field) => (
                        <div key={field} className="space-y-1.5">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <Skeleton className="h-11 w-36 rounded-md" />
            </div>
        </div>
    );
}

/** Whole-page placeholder for /seller/shops/apply. */
export function ApplyFormSkeleton() {
    return (
        <div className="mx-auto w-full max-w-3xl p-6 md:p-10">
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2 border-b border-zinc-200 p-6 dark:border-zinc-800">
                    <Skeleton className="h-6 w-52" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </div>
                <div className="space-y-8 p-6">
                    {[0, 1, 2].map((group) => (
                        <div key={group} className="space-y-4">
                            <Skeleton className="h-4 w-36" />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {Array.from({ length: group === 0 ? 2 : 4 }).map((_, field) => (
                                    <Skeleton key={field} className="h-10 w-full rounded-md" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3 border-t border-zinc-200 p-4 dark:border-zinc-800">
                    <Skeleton className="h-10 w-44 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </div>
        </div>
    );
}
