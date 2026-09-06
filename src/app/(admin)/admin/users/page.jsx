"use client";

import UserCard from "@/components/Admin/Users/UserCard";
import UserRow from "@/components/Admin/Users/UserRow";
import { roleKey, roleLabel, userHaystack, userMobile } from "@/components/Admin/Users/utils";
import { getUserListPage } from "@/redux-store/authstore/user/action";
import { Pagination } from "@mui/material";
import Cookies from "js-cookie";
import {
    LayoutGrid,
    List,
    Loader2,
    Mail,
    Phone,
    RefreshCw,
    Search,
    ShieldCheck,
    Users,
    X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PAGE_SIZES = [12, 24, 48];

const SORTS = {
    default: { label: "Default order", compare: null },
    nameAsc: {
        label: "Name: A to Z",
        compare: (a, b) => String(a?.name ?? "").localeCompare(String(b?.name ?? "")),
    },
    nameDesc: {
        label: "Name: Z to A",
        compare: (a, b) => String(b?.name ?? "").localeCompare(String(a?.name ?? "")),
    },
    emailAsc: {
        label: "Email: A to Z",
        compare: (a, b) => String(a?.email ?? "").localeCompare(String(b?.email ?? "")),
    },
    newest: {
        label: "Recently joined",
        compare: (a, b) => new Date(b?.createdAt ?? 0) - new Date(a?.createdAt ?? 0),
    },
};

const ALL_ROLES = "all";


export default function UsersPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageno = Number(searchParams.get("pageno")) || 1;
    const pagesize = Number(searchParams.get("pagesize")) || 12;

    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("default");
    const [role, setRole] = useState(ALL_ROLES);
    const [view, setView] = useState("grid");

    const usersList = useSelector((state) => state.userReducer?.usersList);
    const loading = Boolean(useSelector((state) => state.userReducer?.loading));
    const loadError = useSelector((state) => state.userReducer?.error);

    const items = useMemo(() => usersList?.content ?? [], [usersList]);
    const totalPages = usersList?.totalPages || 1;
    const totalElements = usersList?.totalElements ?? items.length;

    /* ------------------------------- data loading ------------------------------ */

    const loadUsers = useCallback(() => {
        const token = Cookies.get("adminToken");
        return dispatch(getUserListPage({ pageno, pagesize, token }));
    }, [dispatch, pageno, pagesize]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    /* ------------------------------ url + paging ------------------------------ */

    const pushParams = (next) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(next).forEach(([key, value]) => params.set(key, String(value)));
        router.push(`?${params.toString()}`);
    };

    const handlePaginationChange = (_, page) => pushParams({ pageno: page });

    const handlePagesizeChange = (size) => pushParams({ pageno: 1, pagesize: size });

    /* -------------------------------- filtering ------------------------------- */

    // Roles are whatever the backend sends, so the filter is built from the page
    // rather than from a hardcoded list that would go stale.
    const roleOptions = useMemo(() => {
        const seen = new Map();
        items.forEach((user) => {
            const key = roleKey(user);
            seen.set(key, (seen.get(key) ?? 0) + 1);
        });
        return [...seen.entries()].sort((a, b) => b[1] - a[1]);
    }, [items]);

    // Search, sort and the role filter run over the page the API returned, so the
    // footer says exactly that instead of implying a directory wide search.
    const search = query.trim().toLowerCase();

    const visible = useMemo(() => {
        const filtered = items.filter((user) => {
            if (role !== ALL_ROLES && roleKey(user) !== role) return false;
            return !search || userHaystack(user).includes(search);
        });

        const compare = SORTS[sort].compare;
        return compare ? [...filtered].sort(compare) : filtered;
    }, [items, search, sort, role]);

    const filtersActive = Boolean(search) || sort !== "default" || role !== ALL_ROLES;

    const clearFilters = () => {
        setQuery("");
        setSort("default");
        setRole(ALL_ROLES);
    };

    /* ---------------------------------- stats --------------------------------- */

    // Contact completeness is the thing an admin actually needs off this screen:
    // an account with neither an email nor a number cannot be reached at all.
    const stats = useMemo(
        () => ({
            admins: items.filter((user) => roleKey(user) === "ADMIN").length,
            withEmail: items.filter((user) => Boolean(user?.email)).length,
            withMobile: items.filter((user) => Boolean(userMobile(user))).length,
        }),
        [items],
    );

    // Before the first request settles there is no page object yet, so gate on
    // that too — otherwise the empty state shows for a frame on first paint,
    // between mount and the effect that starts the fetch. `error` releases the
    // gate so a failed request falls through to the empty state instead of
    // spinning forever.
    const firstLoad = items.length === 0 && (loading || (!usersList && !loadError));

    /* --------------------------------- render --------------------------------- */

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 p-2 md:p-6">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    <Users className="h-6 w-6 text-yellow-500" />
                    Users
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Everyone with an account on the platform — search a page, check how to reach
                    someone, and copy ids straight into your other tools.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatTile
                    icon={Users}
                    label="Total users"
                    value={totalElements}
                    hint={`${items.length} on this page`}
                />
                <StatTile
                    icon={ShieldCheck}
                    label="Admins"
                    value={stats.admins}
                    hint="on this page"
                    tone={stats.admins > 0 ? "alert" : "default"}
                />
                <StatTile
                    icon={Mail}
                    label="With email"
                    value={`${stats.withEmail}/${items.length || 0}`}
                    hint="reachable by email"
                />
                <StatTile
                    icon={Phone}
                    label="With mobile"
                    value={`${stats.withMobile}/${items.length || 0}`}
                    hint="reachable by phone"
                />
            </div>

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
                            placeholder="Search this page by name, email, phone, role or id..."
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
                            label="Filter by role"
                            value={role}
                            onChange={setRole}
                            options={[
                                { value: ALL_ROLES, label: "All roles" },
                                ...roleOptions.map(([key, count]) => ({
                                    value: key,
                                    label: `${roleLabel(key)} (${count})`,
                                })),
                            ]}
                        />
                        <Select
                            label="Sort users"
                            value={sort}
                            onChange={setSort}
                            options={Object.entries(SORTS).map(([value, { label }]) => ({
                                value,
                                label,
                            }))}
                        />
                        <Select
                            label="Users per page"
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
                            onClick={loadUsers}
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
                        <UsersSkeleton view={view} />
                    ) : visible.length === 0 ? (
                        <EmptyState
                            filtersActive={filtersActive}
                            offPage={pageno > 1}
                            onClear={clearFilters}
                            onFirstPage={() => pushParams({ pageno: 1 })}
                        />
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visible.map((user, index) => (
                                <UserCard key={user?.id ?? index} user={user} />
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {visible.map((user, index) => (
                                <UserRow key={user?.id ?? index} user={user} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-3 border-t border-zinc-200 px-4 py-3 sm:flex-row sm:justify-between dark:border-zinc-800">
                    <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
                        {filtersActive
                            ? `${visible.length} of ${items.length} on this page match your filters`
                            : `Page ${pageno} of ${totalPages} · ${totalElements} users in total`}
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
        </div>
    );
}

/* -------------------------------- sub views ------------------------------- */

function StatTile({ icon: Icon, label, value, hint, tone = "default" }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-background p-4 shadow-sm dark:border-zinc-800">
            <div className="flex items-center gap-2">
                <Icon
                    className={`h-4 w-4 ${tone === "alert" ? "text-rose-500" : "text-zinc-400"}`}
                />
                <p className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {label}
                </p>
            </div>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
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

function UsersSkeleton({ view }) {
    if (view === "list") {
        return (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Array.from({ length: 8 }).map((_, row) => (
                    <div key={row} className="flex items-center gap-4 px-4 py-3">
                        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3.5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                        <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
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
                    className="space-y-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </div>
                    <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            ))}
        </div>
    );
}

function EmptyState({ filtersActive, offPage, onClear, onFirstPage }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <Users className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">
                    {filtersActive ? "No users match your filters" : "No users yet"}
                </p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    {filtersActive
                        ? "Try a different search term, or reset the filters."
                        : "Accounts show up here as soon as people register."}
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
