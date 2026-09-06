"use client";

import SellerActionModal from "@/components/Admin/Sellers/SellerActionModal";
import SellerCard from "@/components/Admin/Sellers/SellerCard";
import SellerRow from "@/components/Admin/Sellers/SellerRow";
import SellerStatusTabs from "@/components/Admin/Sellers/SellerStatusTabs";
import { SELLER_TABS, TAB_KEYS, normalizeTab } from "@/components/Admin/Sellers/tabs";
import { actionsForStatus, daysSince, sellerHaystack } from "@/components/Admin/Sellers/utils";
import {
    ApproveSellerById,
    ReApproveSellerById,
    SuspendSellerById,
    rejectSellerById,
} from "@/redux-store/authstore/seller/action";
import { Pagination } from "@mui/material";
import Cookies from "js-cookie";
import {
    LayoutGrid,
    List,
    Loader2,
    RefreshCw,
    Search,
    Store,
    Users,
    X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PAGE_SIZES = [12, 24, 48];

const SORTS = {
    default: { label: "Default order", compare: null },
    newest: {
        label: "Newest first",
        compare: (a, b) => new Date(b?.createdAt ?? 0) - new Date(a?.createdAt ?? 0),
    },
    oldest: {
        label: "Oldest first",
        compare: (a, b) => new Date(a?.createdAt ?? 0) - new Date(b?.createdAt ?? 0),
    },
    updated: {
        label: "Recently updated",
        compare: (a, b) => new Date(b?.updatedAt ?? 0) - new Date(a?.updatedAt ?? 0),
    },
    nameAsc: {
        label: "Name: A to Z",
        compare: (a, b) =>
            String(a?.businessName ?? "").localeCompare(String(b?.businessName ?? "")),
    },
    nameDesc: {
        label: "Name: Z to A",
        compare: (a, b) =>
            String(b?.businessName ?? "").localeCompare(String(a?.businessName ?? "")),
    },
};

const AGE_FILTERS = {
    all: { label: "Any age", match: () => true },
    week: { label: "Added this week", match: (s) => (daysSince(s?.createdAt) ?? 999) <= 7 },
    stale: { label: "Older than a week", match: (s) => (daysSince(s?.createdAt) ?? 0) > 7 },
};

/** Maps a confirmed action onto the thunk that performs it. */
const ACTION_THUNKS = {
    approve: (seller, reason, token) => ApproveSellerById({ id: seller.id }, token),
    reapprove: (seller, reason, token) => ReApproveSellerById({ id: seller.id }, token),
    suspend: (seller, reason, token) => SuspendSellerById({ id: seller.id }, token),
    reject: (seller, reason, token) => rejectSellerById({ id: seller.id, reason }, token),
};


export default function SellersPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    // The URL is the single source of truth for the queue being viewed, so the
    // four old routes can simply redirect here with ?status=...
    const tab = normalizeTab(searchParams.get("status"));
    const pageno = Number(searchParams.get("pageno")) || 1;
    const pagesize = Number(searchParams.get("pagesize")) || 12;

    const activeTab = SELLER_TABS[tab];

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("default");
    const [ageFilter, setAgeFilter] = useState("all");
    const [view, setView] = useState("grid");

    const [countsNonce, setCountsNonce] = useState(0);
    const [actionTarget, setActionTarget] = useState(null); // { action, seller }
    const [actionBusy, setActionBusy] = useState(false);

    const sellerState = useSelector((state) => state.sellerReducer);
    const pageData = sellerState?.[activeTab.stateKey];
    const loading = Boolean(sellerState?.loading);

    const items = useMemo(() => pageData?.content ?? [], [pageData]);
    const totalPages = pageData?.totalPages || 1;
    const totalElements = pageData?.totalElements ?? items.length;

    // Headline number per queue. `null` keeps the tab tile in its skeleton state
    // until that queue has been fetched at least once.
    const counts = useMemo(
        () =>
            Object.fromEntries(
                TAB_KEYS.map((key) => [
                    key,
                    sellerState?.[SELLER_TABS[key].stateKey]?.totalElements ?? null,
                ]),
            ),
        [sellerState],
    );

    const knownTotal = TAB_KEYS.every((key) => counts[key] !== null)
        ? TAB_KEYS.reduce((sum, key) => sum + counts[key], 0)
        : null;

    /* ------------------------------- data loading ------------------------------ */

    const fetchQueue = useCallback(
        (key, page, silent = false) => {
            const token = Cookies.get("adminToken");
            return dispatch(SELLER_TABS[key].fetch({ pageno: page, pagesize, silent }, token));
        },
        [dispatch, pagesize],
    );

    const loadActive = useCallback(
        () => fetchQueue(tab, pageno),
        [fetchQueue, tab, pageno],
    );

    useEffect(() => {
        loadActive();
    }, [loadActive]);

    // Each queue lives behind its own endpoint, so the tab counts come from
    // fetching page one of the queues that are not on screen. It doubles as a
    // prefetch: switching tabs renders the cached page immediately.
    useEffect(() => {
        TAB_KEYS.filter((key) => key !== tab).forEach((key) => fetchQueue(key, 1, true));
    }, [fetchQueue, tab, countsNonce]);

    const refresh = () => {
        loadActive();
        setCountsNonce((nonce) => nonce + 1);
    };

    /* ------------------------------ url + paging ------------------------------ */

    const pushParams = (next) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(next).forEach(([key, value]) => params.set(key, String(value)));
        router.push(`?${params.toString()}`);
    };

    const selectTab = (key) => {
        if (key === tab) return;
        setQuery("");
        setAgeFilter("all");
        pushParams({ status: key, pageno: 1 });
    };

    const handlePaginationChange = (_, page) => pushParams({ pageno: page });

    const handlePagesizeChange = (size) => pushParams({ pageno: 1, pagesize: size });

    /* -------------------------------- filtering ------------------------------- */

    // Search, sort and the age filter run over the page the API returned, so the
    // footer says exactly that instead of implying a directory wide search.
    const search = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const matcher = AGE_FILTERS[ageFilter].match;
        const filtered = items.filter(
            (seller) => matcher(seller) && (!search || sellerHaystack(seller).includes(search)),
        );

        const compare = SORTS[sort].compare;
        return compare ? [...filtered].sort(compare) : filtered;
    }, [items, search, sort, ageFilter]);

    const filtersActive = Boolean(search) || sort !== "default" || ageFilter !== "all";

    const clearFilters = () => {
        setQuery("");
        setSort("default");
        setAgeFilter("all");
    };

    /* --------------------------------- actions -------------------------------- */

    // Plain hrefs rather than a click handler: details then works with
    // middle click, ctrl+click and keyboard, and never depends on a JS handler
    // firing over whatever else happens to be on screen.
    const detailsHref = (id) => `/admin/sellers/${id}?from=${tab}`;

    // A seller's own status wins; queues whose backend status string is unknown
    // to the UI fall back to the tab the row was listed under.
    const rowActions = (seller) => {
        const own = actionsForStatus(seller?.status);
        return own.length ? own : actionsForStatus(activeTab.status);
    };

    const runAction = async (reason) => {
        const { action, seller } = actionTarget || {};
        if (!action || !seller?.id) return;

        const token = Cookies.get("adminToken");
        setActionBusy(true);
        const ok = await dispatch(ACTION_THUNKS[action](seller, reason, token));
        setActionBusy(false);

        if (!ok) return;
        setActionTarget(null);
        // The seller just moved between queues, so both the list and the tab
        // counts need to be re-read.
        await loadActive();
        setCountsNonce((nonce) => nonce + 1);
    };

    const firstLoad = loading && items.length === 0;

    /* --------------------------------- render --------------------------------- */

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-2 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                        <Store className="h-6 w-6 text-yellow-500" />
                        Sellers
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Approvals, rejections and suspensions in one place
                        {knownTotal !== null && ` — ${knownTotal} sellers on the platform`}.
                    </p>
                </div>
            </div>

            {/* Queue tabs — also the overview counters */}
            <SellerStatusTabs active={tab} counts={counts} onSelect={selectTab} />

            {/* Listing card */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 lg:flex-row lg:items-center dark:border-zinc-800">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        {/* globals.css sets a blanket input padding outside any cascade layer,
                            which beats Tailwind's pl-9/pr-9 — hence the inline padding that
                            keeps the text clear of the icon and the clear button. */}
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search ${activeTab.label.toLowerCase()} sellers on this page — name, phone, city, PAN, GST or id...`}
                            style={{ paddingLeft: "2.25rem", paddingRight: "2.25rem" }}
                            className="flex h-10 w-full rounded-md border border-zinc-300 bg-background text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            label="Filter by age"
                            value={ageFilter}
                            onChange={setAgeFilter}
                            options={Object.entries(AGE_FILTERS).map(([value, { label }]) => ({
                                value,
                                label,
                            }))}
                        />
                        <Select
                            label="Sort sellers"
                            value={sort}
                            onChange={setSort}
                            options={Object.entries(SORTS).map(([value, { label }]) => ({
                                value,
                                label,
                            }))}
                        />
                        <Select
                            label="Sellers per page"
                            value={String(pagesize)}
                            onChange={(value) => handlePagesizeChange(Number(value))}
                            options={PAGE_SIZES.map((size) => ({
                                value: String(size),
                                label: `${size} / page`,
                            }))}
                        />

                        <div className="inline-flex overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700">
                            <ViewButton
                                label="Grid view"
                                active={view === "grid"}
                                onClick={() => setView("grid")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </ViewButton>
                            <ViewButton
                                label="List view"
                                active={view === "list"}
                                onClick={() => setView("list")}
                            >
                                <List className="h-4 w-4" />
                            </ViewButton>
                        </div>

                        <button
                            type="button"
                            onClick={refresh}
                            disabled={loading}
                            title="Refresh"
                            aria-label="Refresh"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className={view === "grid" ? "p-4" : ""}>
                    {firstLoad ? (
                        <SellersSkeleton view={view} />
                    ) : visible.length === 0 ? (
                        <EmptyState
                            tab={activeTab}
                            filtersActive={filtersActive}
                            offPage={pageno > 1}
                            onClear={clearFilters}
                            onFirstPage={() => pushParams({ pageno: 1 })}
                        />
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {visible.map((seller) => (
                                <SellerCard
                                    key={seller?.id}
                                    seller={seller}
                                    href={detailsHref(seller?.id)}
                                    actions={rowActions(seller)}
                                    onAction={(action, target) =>
                                        setActionTarget({ action, seller: target })
                                    }
                                    busy={actionBusy && actionTarget?.seller?.id === seller?.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {visible.map((seller) => (
                                <SellerRow
                                    key={seller?.id}
                                    seller={seller}
                                    href={detailsHref(seller?.id)}
                                    actions={rowActions(seller)}
                                    onAction={(action, target) =>
                                        setActionTarget({ action, seller: target })
                                    }
                                    busy={actionBusy && actionTarget?.seller?.id === seller?.id}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-3 border-t border-zinc-200 px-4 py-3 sm:flex-row sm:justify-between dark:border-zinc-800">
                    <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
                        {filtersActive
                            ? `${visible.length} of ${items.length} on this page match your filters`
                            : `Page ${pageno} of ${totalPages} · ${totalElements} ${activeTab.label.toLowerCase()} sellers`}
                        {loading && items.length > 0 && (
                            <span className="ml-2 inline-flex items-center gap-1.5">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Syncing
                            </span>
                        )}
                    </span>

                    <Pagination
                        count={totalPages}
                        page={Math.min(pageno, totalPages)}
                        onChange={handlePaginationChange}
                        shape="rounded"
                        siblingCount={1}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                backgroundColor: "transparent",
                                color: "var(--foreground)",
                                borderRadius: "6px",
                            },
                            "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "rgba(234, 179, 8, 0.12)",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#eab308 !important",
                                color: "#09090b",
                                fontWeight: 600,
                            },
                        }}
                    />
                </div>
            </div>

            <SellerActionModal
                key={`${actionTarget?.action}-${actionTarget?.seller?.id}`}
                open={Boolean(actionTarget)}
                action={actionTarget?.action}
                seller={actionTarget?.seller}
                loading={actionBusy}
                onClose={() => (actionBusy ? null : setActionTarget(null))}
                onConfirm={runAction}
            />
        </div>
    );
}

/* -------------------------------- sub views ------------------------------- */

function Select({ label, value, onChange, options }) {
    return (
        <select
            aria-label={label}
            title={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 cursor-pointer rounded-md border border-zinc-300 bg-background px-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

function ViewButton({ label, active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={`inline-flex h-10 w-10 items-center justify-center transition-colors ${
                active
                    ? "bg-yellow-500 text-zinc-950"
                    : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
        >
            {children}
        </button>
    );
}

function SellersSkeleton({ view }) {
    if (view === "list") {
        return (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Array.from({ length: 6 }).map((_, row) => (
                    <div key={row} className="flex items-center gap-4 px-4 py-3">
                        <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                        <div className="h-9 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, card) => (
                <div
                    key={card}
                    className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-2/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-9 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                </div>
            ))}
        </div>
    );
}

function EmptyState({ tab, filtersActive, offPage, onClear, onFirstPage }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <Users className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">
                    {filtersActive ? "No sellers match your filters" : tab.emptyTitle}
                </p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    {filtersActive
                        ? "Try a different search term, or reset the filters."
                        : tab.emptyBody}
                </p>
            </div>
            {filtersActive ? (
                <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Reset filters
                </button>
            ) : (
                offPage && (
                    <button
                        type="button"
                        onClick={onFirstPage}
                        className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Back to first page
                    </button>
                )
            )}
        </div>
    );
}
