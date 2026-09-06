"use client";

import SellerDataCard from "@/components/Admin/Cards/SellerDataCard/SellerDataCard";
import SellerActionModal from "@/components/Admin/Sellers/SellerActionModal";
import { SELLER_TABS, normalizeTab, sellersHref, tabForStatus } from "@/components/Admin/Sellers/tabs";
import {
    SELLER_ACTIONS,
    TONE_CLASS,
    actionsForStatus,
    formatDateTime,
    initials,
    statusMeta,
} from "@/components/Admin/Sellers/utils";
import {
    ApproveSellerById,
    ReApproveSellerById,
    SuspendSellerById,
    getSellerById,
    rejectSellerById,
} from "@/redux-store/authstore/seller/action";
import Cookies from "js-cookie";
import { ArrowLeft, Clock, RefreshCw, UserX } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ACTION_THUNKS = {
    approve: (id, reason, token) => ApproveSellerById({ id }, token),
    reapprove: (id, reason, token) => ReApproveSellerById({ id }, token),
    suspend: (id, reason, token) => SuspendSellerById({ id }, token),
    reject: (id, reason, token) => rejectSellerById({ id, reason }, token),
};

export default function SellerDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const sellerId = params.sellerId;
    // Which queue the admin came from — used for the back link and as a fallback
    // when the backend returns a status string the UI does not know.
    const fromTab = normalizeTab(searchParams.get("from"));

    const details = useSelector((state) => state.sellerReducer.sellerdetails);
    const loading = useSelector((state) => Boolean(state.sellerReducer.loading));

    // The `sellerdetails` slice is shared with every other seller screen, so a
    // record left over from a previous visit has to be ignored. Only reject it
    // when it carries an id that disagrees — a response shaped without an id is
    // still the answer to the request this page just made.
    const detailsId = details?.id ?? details?.sellerId ?? null;
    const seller = details && (!detailsId || String(detailsId) === String(sellerId)) ? details : null;

    // Tells an empty response apart from "the first fetch has not landed yet",
    // so the page never flashes "not found" while the request is still in the air.
    const [attempted, setAttempted] = useState(false);
    const [actionKey, setActionKey] = useState("");
    const [actionBusy, setActionBusy] = useState(false);

    const loadSeller = useCallback(async () => {
        const token = Cookies.get("adminToken");
        await dispatch(getSellerById({ id: sellerId }, token));
        setAttempted(true);
    }, [dispatch, sellerId]);

    useEffect(() => {
        // The `attempted` flip happens once the request settles, which is the
        // only moment it can be known — not a render cascade worth avoiding.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadSeller();
    }, [loadSeller]);

    const meta = statusMeta(seller?.status);
    const ownActions = actionsForStatus(seller?.status);
    const actions = ownActions.length ? ownActions : actionsForStatus(SELLER_TABS[fromTab].status);
    const backTab = seller?.status ? tabForStatus(seller.status) : fromTab;

    const runAction = async (reason) => {
        if (!actionKey || !sellerId) return;

        const token = Cookies.get("adminToken");
        setActionBusy(true);
        const ok = await dispatch(ACTION_THUNKS[actionKey](sellerId, reason, token));
        setActionBusy(false);

        if (!ok) return;
        setActionKey("");
        await loadSeller();
    };

    /* --------------------------------- render --------------------------------- */

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 p-2 md:p-6">
            <Link
                href={sellersHref(backTab)}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to {SELLER_TABS[backTab].label.toLowerCase()} sellers
            </Link>

            {!seller && !attempted ? (
                <DetailsSkeleton />
            ) : !seller ? (
                <NotFound onRetry={loadSeller} onBack={() => router.push(sellersHref(fromTab))} />
            ) : (
                <>
                    {/* Header */}
                    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-background p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-zinc-800">
                        <div className="flex min-w-0 items-start gap-4">
                            <span
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-lg font-semibold dark:border-zinc-800 dark:bg-zinc-900 ${meta.accent}`}
                            >
                                {initials(seller?.businessName)}
                            </span>

                            <div className="min-w-0 space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="truncate text-2xl font-semibold tracking-tight">
                                        {seller?.businessName || "Unnamed business"}
                                    </h1>
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${meta.badge}`}
                                    >
                                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                                        {meta.label}
                                    </span>
                                </div>
                                <p className="truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                                    {seller?.id}
                                </p>
                                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        Applied {formatDateTime(seller?.createdAt)}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <RefreshCw className="h-3.5 w-3.5" />
                                        Updated {formatDateTime(seller?.updatedAt)}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-center gap-2">
                            <button
                                type="button"
                                onClick={loadSeller}
                                disabled={loading}
                                title="Reload seller"
                                aria-label="Reload seller"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            >
                                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                            </button>

                            {actions.map((key) => {
                                const action = SELLER_ACTIONS[key];
                                const Icon = action.icon;
                                const primary = key === actions[0];

                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setActionKey(key)}
                                        disabled={actionBusy}
                                        className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                                            primary
                                                ? TONE_CLASS[action.tone].solid
                                                : `border ${TONE_CLASS[action.tone].soft}`
                                        }`}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {action.cta}
                                    </button>
                                );
                            })}

                            {actions.length === 0 && (
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    No actions available for this status.
                                </span>
                            )}
                        </div>
                    </div>

                    <SellerDataCard seller={seller} showHeader={false} />
                </>
            )}

            <SellerActionModal
                key={`${actionKey}-${sellerId}`}
                open={Boolean(actionKey)}
                action={actionKey}
                seller={seller}
                loading={actionBusy}
                onClose={() => (actionBusy ? null : setActionKey(""))}
                onConfirm={runAction}
            />
        </div>
    );
}

/* -------------------------------- sub views ------------------------------- */

function DetailsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="h-14 w-14 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="h-10 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, card) => (
                    <div
                        key={card}
                        className="space-y-3 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
                    >
                        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function NotFound({ onRetry, onBack }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 px-4 py-16 text-center dark:border-zinc-700">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <UserX className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">Seller not found</p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    The record could not be loaded. It may have been removed, or the request failed.
                </p>
            </div>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Try again
                </button>
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400"
                >
                    Back to sellers
                </button>
            </div>
        </div>
    );
}
