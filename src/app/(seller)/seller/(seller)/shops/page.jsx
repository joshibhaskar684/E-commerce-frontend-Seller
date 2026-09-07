"use client";

import CloseShopModal from "@/seller-components/Shops/CloseShopModal";
import ShopCard from "@/seller-components/Shops/ShopCard";
import ShopRow from "@/seller-components/Shops/ShopRow";
import ShopStatusTabs from "@/seller-components/Shops/ShopStatusTabs";
import {
    ShopCardsSkeleton,
    ShopRowsSkeleton,
} from "@/seller-components/Shops/Skeletons";
import {
    FILTER_KEYS,
    filterFor,
    matchesFilter,
    normalizeFilter,
    shopHaystack,
    shopName,
    statusMeta,
} from "@/seller-components/Shops/utils";
import { closeShopWithId, getShopListIntro } from "@/redux-store/authstore/shops/action";
import Cookies from "js-cookie";
import { LayoutGrid, List, Plus, RefreshCw, Search, Store, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SORTS = {
    newest: {
        label: "Newest first",
        compare: (a, b) => new Date(b?.createdAt ?? 0) - new Date(a?.createdAt ?? 0),
    },
    oldest: {
        label: "Oldest first",
        compare: (a, b) => new Date(a?.createdAt ?? 0) - new Date(b?.createdAt ?? 0),
    },
    nameAsc: {
        label: "Name: A to Z",
        compare: (a, b) => shopName(a).localeCompare(shopName(b)),
    },
    nameDesc: {
        label: "Name: Z to A",
        compare: (a, b) => shopName(b).localeCompare(shopName(a)),
    },
};

export default function SellerShopsPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    // The filter lives in the URL so it survives a refresh, the back button and
    // a shared link — the same contract the admin screens use.
    const activeFilter = normalizeFilter(searchParams.get("status"));
    const meta = filterFor(activeFilter);

    const shopsList = useSelector((state) => state.ShopsReducer?.shopsList);
    const loading = useSelector((state) => state.ShopsReducer?.loading);
    const loadError = useSelector((state) => state.ShopsReducer?.error);

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("newest");
    const [view, setView] = useState("grid");

    const [closeTarget, setCloseTarget] = useState(null);
    const [closingId, setClosingId] = useState("");

    // `/auth/shops/apply/total/shop` returns every shop the seller owns in one
    // array, so there is no paging here — counting and filtering are local.
    const shops = useMemo(
        () => (Array.isArray(shopsList) ? shopsList : (shopsList?.content ?? [])),
        [shopsList],
    );

    /* ------------------------------- data loading ------------------------------ */

    const loadShops = useCallback(() => {
        const token = Cookies.get("sellerToken");
        return dispatch(getShopListIntro({ token }));
    }, [dispatch]);

    useEffect(() => {
        loadShops();
    }, [loadShops]);

    // Nothing has arrived and nothing has failed means the first request is
    // still out — including the frame before the effect runs, which would
    // otherwise flash the empty state.
    const firstLoad = shops.length === 0 && (loading || (!shopsList && !loadError));

    /* --------------------------------- counts --------------------------------- */

    const counts = useMemo(() => {
        const tally = Object.fromEntries(FILTER_KEYS.map((key) => [key, 0]));
        shops.forEach((shop) => {
            tally.all += 1;
            const key = statusMeta(shop).key;
            if (key in tally) tally[key] += 1;
        });
        return tally;
    }, [shops]);

    /* -------------------------------- filtering -------------------------------- */

    const search = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const rows = shops
            .filter((shop) => matchesFilter(shop, activeFilter))
            .filter((shop) => (search ? shopHaystack(shop).includes(search) : true));

        const compare = SORTS[sort]?.compare;
        return compare ? [...rows].sort(compare) : rows;
    }, [shops, activeFilter, search, sort]);

    const inFilter = useMemo(
        () => shops.filter((shop) => matchesFilter(shop, activeFilter)).length,
        [shops, activeFilter],
    );

    /* --------------------------------- actions --------------------------------- */

    const selectFilter = (key) => {
        const params = new URLSearchParams(searchParams.toString());
        if (key === "all") params.delete("status");
        else params.set("status", key);
        const qs = params.toString();
        router.push(qs ? `/seller/shops?${qs}` : "/seller/shops");
    };

    const confirmClose = async (shop) => {
        const id = shop?.id;
        if (!id) return;

        const token = Cookies.get("sellerToken");
        setClosingId(id);
        try {
            // The thunk refetches the list itself once the close succeeds.
            await dispatch(closeShopWithId({ id, token }));
        } finally {
            setClosingId("");
            setCloseTarget(null);
        }
    };

    const detailsHref = (id) => `/seller/shops/${id}?from=${activeFilter}`;

    /* ---------------------------------- render --------------------------------- */

    return (
        <div className="hide-scrollbar min-h-screen w-full overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-10">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center dark:border-zinc-800">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
                            <Store className="h-7 w-7 text-yellow-500" />
                            Your Shops
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Every shop registered under your account, and what each one can do right
                            now.
                        </p>
                    </div>

                    <Link
                        href="/seller/shops/apply"
                        className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-1.5 rounded-md bg-yellow-500 px-4 text-sm font-medium whitespace-nowrap text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Apply for a shop
                    </Link>
                </div>

                {/* Counters, doubling as the filter */}
                <ShopStatusTabs active={activeFilter} counts={counts} onSelect={selectFilter} />

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="relative min-w-[220px] flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search your shops — name, city, id…"
                            aria-label="Search your shops"
                            className="h-10 w-full rounded-md border border-zinc-300 bg-background pl-9 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:border-zinc-700"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        aria-label="Sort shops"
                        className="h-10 rounded-md border border-zinc-300 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:border-zinc-700"
                    >
                        {Object.entries(SORTS).map(([key, option]) => (
                            <option key={key} value={key}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div className="flex overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
                        <button
                            type="button"
                            onClick={() => setView("grid")}
                            aria-label="Grid view"
                            aria-pressed={view === "grid"}
                            className={`inline-flex h-10 w-10 items-center justify-center transition-colors ${
                                view === "grid"
                                    ? "bg-yellow-500 text-zinc-950"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            }`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("list")}
                            aria-label="List view"
                            aria-pressed={view === "list"}
                            className={`inline-flex h-10 w-10 items-center justify-center border-l border-zinc-300 transition-colors dark:border-zinc-700 ${
                                view === "list"
                                    ? "bg-yellow-500 text-zinc-950"
                                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={loadShops}
                        disabled={loading}
                        aria-label="Refresh"
                        title="Refresh"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>

                {/* Body */}
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className={view === "list" ? "" : "p-4"}>
                        {firstLoad ? (
                            view === "list" ? (
                                <ShopRowsSkeleton />
                            ) : (
                                <ShopCardsSkeleton />
                            )
                        ) : visible.length === 0 ? (
                            <EmptyState
                                meta={meta}
                                searching={Boolean(search)}
                                hasAnyInFilter={inFilter > 0}
                                onClearSearch={() => setQuery("")}
                            />
                        ) : view === "list" ? (
                            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {visible.map((shop) => (
                                    <ShopRow
                                        key={shop.id}
                                        shop={shop}
                                        href={detailsHref(shop.id)}
                                        onClose={setCloseTarget}
                                        closing={closingId === shop.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {visible.map((shop) => (
                                    <ShopCard
                                        key={shop.id}
                                        shop={shop}
                                        href={detailsHref(shop.id)}
                                        onClose={setCloseTarget}
                                        closing={closingId === shop.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {!firstLoad && shops.length > 0 && (
                        <div className="border-t border-zinc-200 px-4 py-3 text-[13px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            {search
                                ? `${visible.length} of ${inFilter} match your search`
                                : activeFilter === "all"
                                  ? `${counts.all} ${counts.all === 1 ? "shop" : "shops"} in total`
                                  : `${visible.length} ${meta.label.toLowerCase()} of ${counts.all} total`}
                        </div>
                    )}
                </div>
            </div>

            {/* Closing is irreversible, so it always goes through a confirmation */}
            <CloseShopModal
                key={closeTarget?.id ?? "none"}
                open={Boolean(closeTarget)}
                shop={closeTarget}
                loading={Boolean(closingId)}
                onClose={() => setCloseTarget(null)}
                onConfirm={confirmClose}
            />
        </div>
    );
}

function EmptyState({ meta, searching, hasAnyInFilter, onClearSearch }) {
    // Three genuinely different situations: nothing matched the search, the
    // filter is empty, or the seller has no shops at all.
    const title = searching ? "No shops match your search" : meta.emptyTitle;
    const body = searching
        ? "Try a different term, or clear the search to see everything in this filter."
        : meta.emptyBody;

    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <Store className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="mx-auto max-w-md text-[13px] text-zinc-500 dark:text-zinc-400">
                    {body}
                </p>
            </div>

            {searching && hasAnyInFilter ? (
                <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Clear search
                </button>
            ) : (
                <Link
                    href="/seller/shops/apply"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Apply for a shop
                </Link>
            )}
        </div>
    );
}
