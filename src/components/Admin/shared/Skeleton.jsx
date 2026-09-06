/**
 * Skeleton primitives for the admin panel.
 *
 * Deliberately server-safe (no "use client", no hooks, no state) so the same
 * pieces can be used both inside client pages and from a route's loading.jsx.
 *
 * The classes match the inline skeletons that already ship on the products,
 * category, sellers, shops and users screens, so nothing looks out of place.
 */

/** One shimmering block. Everything else here is composed from it. */
export function Skeleton({ className = "", style }) {
    return (
        <div
            style={style}
            className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${className}`}
        />
    );
}

/** Title + one line of supporting copy, above a divider. */
export function PageHeaderSkeleton({ withAction = false }) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-3.5 w-72 max-w-full" />
            </div>
            {withAction && <Skeleton className="h-10 w-36 rounded-md" />}
        </div>
    );
}

/** The row of counter tiles that sits under the header on the list screens. */
export function StatTilesSkeleton({ count = 4 }) {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, tile) => (
                <div
                    key={tile}
                    className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-4 rounded" />
                    </div>
                    <Skeleton className="mt-3 h-7 w-12" />
                    <Skeleton className="mt-2 h-3 w-24" />
                </div>
            ))}
        </div>
    );
}

/** Search field plus the cluster of selects and view toggles. */
export function ToolbarSkeleton() {
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
            <Skeleton className="h-10 min-w-[220px] flex-1 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
        </div>
    );
}

/** Grid of entity cards. `media` adds the image band products and shops have. */
export function CardGridSkeleton({ count = 8, media = false }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, card) => (
                <div
                    key={card}
                    className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                    {media && <Skeleton className="aspect-[4/3] w-full rounded-none" />}
                    <div className="flex items-start gap-3 p-4">
                        <Skeleton className="h-11 w-11 shrink-0 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-3 w-3/5" />
                        </div>
                    </div>
                    <div className="space-y-2 border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-3/5" />
                    </div>
                </div>
            ))}
        </div>
    );
}

/** Dense rows, for the list view of any of the paginated screens. */
export function ListRowsSkeleton({ count = 6 }) {
    return (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {Array.from({ length: count }).map((_, row) => (
                <div key={row} className="flex items-center gap-4 px-4 py-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3.5 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="hidden h-3 w-40 md:block" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                </div>
            ))}
        </div>
    );
}

/** Two-column detail layout: facts on the left, a summary panel on the right. */
export function DetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-9 w-40 rounded-md" />

            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex items-start gap-4">
                    <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-3.5 w-1/3" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    {[0, 1].map((block) => (
                        <div
                            key={block}
                            className="space-y-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
                        >
                            <Skeleton className="h-4 w-32" />
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {Array.from({ length: 6 }).map((_, field) => (
                                    <div key={field} className="space-y-1.5">
                                        <Skeleton className="h-2.5 w-20" />
                                        <Skeleton className="h-3.5 w-36" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </div>
    );
}

/** A single centred form card — create / update / delete screens. */
export function FormSkeleton({ fields = 4, wide = false }) {
    return (
        <div className={`w-full ${wide ? "max-w-4xl" : "max-w-lg"} mx-auto`}>
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2 border-b border-zinc-200 p-6 dark:border-zinc-800">
                    <Skeleton className="h-6 w-52" />
                    <Skeleton className="h-3.5 w-72 max-w-full" />
                </div>
                <div className="space-y-5 p-6">
                    {Array.from({ length: fields }).map((_, field) => (
                        <div key={field} className="space-y-2">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    ))}
                    <Skeleton className="h-11 w-full rounded-md" />
                </div>
            </div>
        </div>
    );
}

/** Pagination strip at the foot of the paginated screens. */
export function PaginationSkeleton() {
    return (
        <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-9 w-64 rounded-md" />
            <Skeleton className="h-3 w-48" />
        </div>
    );
}

/**
 * Whole-route placeholders used by the loading.jsx files. `variant` picks the
 * shape so a route transition already looks like the screen that is arriving.
 */
export function AdminRouteSkeleton({ variant = "list" }) {
    if (variant === "detail") {
        return (
            <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
                <DetailSkeleton />
            </div>
        );
    }

    if (variant === "form") {
        return (
            <div className="flex w-full justify-center p-4 pt-10 md:p-8">
                <FormSkeleton />
            </div>
        );
    }

    if (variant === "wide-form") {
        return (
            <div className="w-full p-4 md:p-6">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <PageHeaderSkeleton />
                    <FormSkeleton fields={6} wide />
                </div>
            </div>
        );
    }

    if (variant === "stats") {
        return (
            <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-8">
                <PageHeaderSkeleton />
                {[0, 1].map((section) => (
                    <div key={section} className="space-y-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {Array.from({ length: 5 }).map((_, tile) => (
                                <div
                                    key={tile}
                                    className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
                                >
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-4 w-4 rounded" />
                                    </div>
                                    <Skeleton className="mt-4 h-7 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "tree") {
        return (
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
                <PageHeaderSkeleton withAction />
                <ToolbarSkeleton />
                <div className="space-y-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                    {[0, 1, 2, 3, 4, 5].map((row) => (
                        <div
                            key={row}
                            className="flex items-center gap-3"
                            style={{ paddingLeft: (row % 3) * 20 }}
                        >
                            <Skeleton className="h-6 w-6 rounded-md" />
                            <Skeleton
                                className="h-4"
                                style={{ width: `${140 + ((row * 47) % 120)}px` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">
            <PageHeaderSkeleton withAction />
            <StatTilesSkeleton />
            <ToolbarSkeleton />
            <CardGridSkeleton />
            <PaginationSkeleton />
        </div>
    );
}

export default Skeleton;
