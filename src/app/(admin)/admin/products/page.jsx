"use client";

import DeleteProductModal from "@/components/Admin/Products/DeleteProductModal";
import ProductCard from "@/components/Admin/Products/ProductCard";
import ProductRow from "@/components/Admin/Products/ProductRow";
import { discountPercent } from "@/components/Admin/Products/utils";
import { deleteProductsById, getProducts } from "@/redux-store/authstore/product/action";
import { Pagination } from "@mui/material";
import {
    IndianRupee,
    LayoutGrid,
    List,
    Loader2,
    Package,
    PackageX,
    Plus,
    RefreshCw,
    Search,
    Tag,
    X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PAGE_SIZES = [12, 24, 48];

const SORTS = {
    default: { label: "Default order", compare: null },
    priceAsc: { label: "Price: low to high", compare: (a, b) => Number(a?.price) - Number(b?.price) },
    priceDesc: { label: "Price: high to low", compare: (a, b) => Number(b?.price) - Number(a?.price) },
    nameAsc: {
        label: "Name: A to Z",
        compare: (a, b) => String(a?.name ?? "").localeCompare(String(b?.name ?? "")),
    },
    stockAsc: {
        label: "Stock: low to high",
        compare: (a, b) => Number(a?.quantity ?? 0) - Number(b?.quantity ?? 0),
    },
    newest: {
        label: "Recently updated",
        compare: (a, b) => new Date(b?.updatedAt ?? 0) - new Date(a?.updatedAt ?? 0),
    },
};

const STOCK_FILTERS = {
    all: { label: "All stock", match: () => true },
    in: { label: "In stock", match: (p) => Number(p?.quantity) > 10 },
    low: { label: "Low stock", match: (p) => Number(p?.quantity) > 0 && Number(p?.quantity) <= 10 },
    out: { label: "Out of stock", match: (p) => !(Number(p?.quantity) > 0) },
    discounted: { label: "On discount", match: (p) => discountPercent(p) > 0 },
};

export default function ProductsPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const products = useSelector((state) => state?.productReducer?.products);
    const loading = useSelector((state) => state?.productReducer?.loading);

    const [pageno, setPageno] = useState(Number(searchParams.get("pageno")) || 1);
    const [pagesize, setPagesize] = useState(Number(searchParams.get("pagesize")) || 12);

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("default");
    const [stockFilter, setStockFilter] = useState("all");
    const [view, setView] = useState("grid");

    const [openingId, setOpeningId] = useState("");
    const [deletingId, setDeletingId] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);

    const items = useMemo(() => products?.content ?? [], [products]);
    const totalPages = products?.totalPages || 1;
    const totalElements = products?.totalElements ?? items.length;

    const fetchProducts = useCallback(
        () => dispatch(getProducts({ pageno, pagesize })),
        [dispatch, pageno, pagesize],
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    /* ------------------------------ url + paging ------------------------------ */

    const pushParams = (next) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(next).forEach(([key, value]) => params.set(key, value));
        router.push(`?${params.toString()}`);
    };

    const handlePaginationChange = (_, page) => {
        setPageno(page);
        pushParams({ pageno: page });
    };

    const handlePagesizeChange = (size) => {
        setPagesize(size);
        setPageno(1);
        pushParams({ pageno: 1, pagesize: size });
    };

    /* -------------------------------- filtering ------------------------------- */

    // Search, sort and stock filters run over the page the API returned, so the
    // footer says so explicitly rather than implying a catalog wide search.
    const search = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const matcher = STOCK_FILTERS[stockFilter].match;
        const filtered = items.filter((item) => {
            if (!matcher(item)) return false;
            if (!search) return true;
            const haystack = [item?.name, item?.brand, item?.storeId, ...(item?.categoryPath ?? [])]
                .join(" ")
                .toLowerCase();
            return haystack.includes(search);
        });

        const compare = SORTS[sort].compare;
        return compare ? [...filtered].sort(compare) : filtered;
    }, [items, search, sort, stockFilter]);

    /* ---------------------------------- stats --------------------------------- */

    const stats = useMemo(() => {
        const outOfStock = items.filter((item) => !(Number(item?.quantity) > 0)).length;
        const discounted = items.filter((item) => discountPercent(item) > 0).length;
        const value = items.reduce(
            (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
            0,
        );
        return { outOfStock, discounted, value };
    }, [items]);

    /* --------------------------------- actions -------------------------------- */

    const viewMore = (id) => {
        if (!id) return;
        setOpeningId(id);
        router.push(`/admin/products/${id}`);
    };

    const confirmDelete = async () => {
        const id = deleteTarget?.id;
        if (!id) return;
        setDeletingId(id);
        const ok = await dispatch(deleteProductsById({ id }));
        setDeletingId("");
        if (!ok) return;
        setDeleteTarget(null);
        await fetchProducts();
    };

    const clearFilters = () => {
        setQuery("");
        setSort("default");
        setStockFilter("all");
    };

    const filtersActive = Boolean(search) || sort !== "default" || stockFilter !== "all";
    const firstLoad = loading && items.length === 0;

    /* --------------------------------- render --------------------------------- */

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-2 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                        <Package className="h-6 w-6 text-yellow-500" />
                        Products
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Every product listed across the marketplace — review pricing, stock and
                        remove listings that break the rules.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => router.push("/admin/products/create")}
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatTile
                    icon={Package}
                    label="Total products"
                    value={totalElements}
                    hint={`${items.length} on this page`}
                />
                <StatTile
                    icon={PackageX}
                    label="Out of stock"
                    value={stats.outOfStock}
                    hint="on this page"
                    tone={stats.outOfStock > 0 ? "danger" : "default"}
                />
                <StatTile
                    icon={Tag}
                    label="On discount"
                    value={stats.discounted}
                    hint="on this page"
                />
                <StatTile
                    icon={IndianRupee}
                    label="Inventory value"
                    value={`₹${new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(stats.value)}`}
                    hint="price × stock, this page"
                />
            </div>

            {/* Listing card */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 lg:flex-row lg:items-center dark:border-zinc-800">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        {/* globals.css sets a blanket `input { padding: 5px }` outside any cascade
                            layer, which beats Tailwind's pl-9/pr-9 — hence the inline padding that
                            keeps the text clear of the icon and the clear button. */}
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search this page by name, brand, store or category..."
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
                            label="Stock filter"
                            value={stockFilter}
                            onChange={setStockFilter}
                            options={Object.entries(STOCK_FILTERS).map(([value, { label }]) => ({
                                value,
                                label,
                            }))}
                        />
                        <Select
                            label="Sort products"
                            value={sort}
                            onChange={setSort}
                            options={Object.entries(SORTS).map(([value, { label }]) => ({
                                value,
                                label,
                            }))}
                        />
                        <Select
                            label="Products per page"
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
                            onClick={fetchProducts}
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
                        <ProductsSkeleton view={view} />
                    ) : visible.length === 0 ? (
                        <EmptyState
                            filtersActive={filtersActive}
                            onClear={clearFilters}
                            onCreate={() => router.push("/admin/products/create")}
                        />
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visible.map((item) => (
                                <ProductCard
                                    key={item?.id}
                                    product={item}
                                    onView={viewMore}
                                    onDelete={setDeleteTarget}
                                    opening={openingId === item?.id}
                                    deleting={deletingId === item?.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {visible.map((item) => (
                                <ProductRow
                                    key={item?.id}
                                    product={item}
                                    onView={viewMore}
                                    onDelete={setDeleteTarget}
                                    opening={openingId === item?.id}
                                    deleting={deletingId === item?.id}
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
                            : `Page ${pageno} of ${totalPages} · ${totalElements} products in total`}
                        {loading && items.length > 0 && (
                            <span className="ml-2 inline-flex items-center gap-1.5">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Syncing
                            </span>
                        )}
                    </span>

                    <Pagination
                        count={totalPages}
                        page={pageno}
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

            <DeleteProductModal
                open={Boolean(deleteTarget)}
                target={deleteTarget}
                loading={Boolean(deletingId)}
                onClose={() => (deletingId ? null : setDeleteTarget(null))}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

/* -------------------------------- sub views ------------------------------- */

function StatTile({ icon: Icon, label, value, hint, tone = "default" }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-background p-4 shadow-sm dark:border-zinc-800">
            <div className="flex items-center gap-2">
                <Icon
                    className={`h-4 w-4 ${tone === "danger" ? "text-red-500" : "text-zinc-400"}`}
                />
                <p className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {label}
                </p>
            </div>
            <p
                className={`mt-1 text-2xl font-semibold tabular-nums ${tone === "danger" ? "text-red-600 dark:text-red-400" : ""}`}
            >
                {value}
            </p>
            {hint && <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{hint}</p>}
        </div>
    );
}

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

function ProductsSkeleton({ view }) {
    if (view === "list") {
        return (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Array.from({ length: 6 }).map((_, row) => (
                    <div key={row} className="flex items-center gap-4 px-4 py-3">
                        <div className="h-14 w-14 shrink-0 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, card) => (
                <div
                    key={card}
                    className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                >
                    <div className="aspect-[4/3] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
                    <div className="space-y-2 p-4">
                        <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState({ filtersActive, onClear, onCreate }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <Package className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">
                    {filtersActive ? "No products match your filters" : "No products listed yet"}
                </p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    {filtersActive
                        ? "Try a different search term, or reset the filters."
                        : "Once sellers start listing, their products show up here."}
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
                <button
                    type="button"
                    onClick={onCreate}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </button>
            )}
        </div>
    );
}
