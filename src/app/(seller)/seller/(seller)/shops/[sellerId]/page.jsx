"use client";

import ShopDataCard from "@/components/Admin/Cards/ShopDataCard/ShopDataCard";
import CloseShopModal from "@/seller-components/Shops/CloseShopModal";
import { ShopDetailSkeleton } from "@/seller-components/Shops/Skeletons";
import {
    canClose,
    canSell,
    locationLine,
    normalizeFilter,
    normalizeStatus,
    shopName,
    statusMeta,
} from "@/seller-components/Shops/utils";
import { closeShopWithId, getShopById } from "@/redux-store/authstore/shops/action";
import Cookies from "js-cookie";
import { ArrowLeft, Boxes, Lock, Package, RefreshCw, Store } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SellerShopDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // The folder is named [sellerId] for historical reasons; the value in it is
    // a *shop* id — `/auth/shops/check/shop/{id}` is what it is passed to.
    const shopId = params?.sellerId;
    const fromFilter = normalizeFilter(searchParams.get("from"));
    const backHref = fromFilter === "all" ? "/seller/shops" : `/seller/shops?status=${fromFilter}`;

    const details = useSelector((state) => state.ShopsReducer?.Shopsdetails);
    const fetching = useSelector((state) => state.ShopsReducer?.loading);

    const [attempted, setAttempted] = useState(false);
    const [closeOpen, setCloseOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    // `Shopsdetails` keeps whichever shop was opened last, so a stale record
    // would flash before this one arrives. Only trust it once its id matches
    // the route; records that come back without an id are let through.
    const detailsId = details?.id ?? null;
    const shop =
        details && (!detailsId || String(detailsId) === String(shopId)) ? details : null;

    const loadShop = useCallback(async () => {
        const token = Cookies.get("sellerToken");
        await dispatch(getShopById({ id: shopId }, token));
        setAttempted(true);
    }, [dispatch, shopId]);

    useEffect(() => {
        loadShop();
    }, [loadShop]);

    const confirmClose = async () => {
        const token = Cookies.get("sellerToken");
        setClosing(true);
        try {
            await dispatch(closeShopWithId({ id: shopId, token }));
            // Pull the record again so the banner and buttons reflect the new state.
            await loadShop();
        } finally {
            setClosing(false);
            setCloseOpen(false);
        }
    };

    /* ---------------------------------- render --------------------------------- */

    if (!shop) {
        return fetching || !attempted ? (
            <ShopDetailSkeleton />
        ) : (
            <NotFound shopId={shopId} backHref={backHref} onRetry={loadShop} />
        );
    }

    const meta = statusMeta(shop);
    const StatusIcon = meta.icon;
    const name = shopName(shop);

    return (
        <div className="hide-scrollbar min-h-screen w-full overflow-y-auto">
            <div className="mx-auto w-full max-w-5xl space-y-6 p-6 md:p-10">
                {/* Back */}
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:text-zinc-400 dark:hover:text-yellow-500"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to your shops
                </Link>

                {/* Header */}
                <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800">
                            {shop?.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={shop.logoUrl}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Store className={`h-7 w-7 ${meta.accent}`} />
                            )}
                        </span>

                        <div className="min-w-0 flex-1">
                            <h1 className="text-2xl font-bold tracking-tight break-words">{name}</h1>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {locationLine(shop)}
                            </p>
                            <p className="mt-1 font-mono text-xs text-zinc-400 break-all dark:text-zinc-500">
                                {shop?.id}
                            </p>
                        </div>

                        <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${meta.badge}`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                            {meta.label}
                        </span>
                    </div>

                    {/* What the seller can actually do right now */}
                    <div className={`flex gap-3 rounded-lg border p-4 ${meta.badge}`}>
                        <StatusIcon className="mt-0.5 h-5 w-5 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium">{meta.headline}</p>
                            <p className="text-[13px] leading-relaxed opacity-90">{meta.guidance}</p>
                        </div>
                    </div>

                    {normalizeStatus(shop) === "REJECTED" && shop?.rejectionReason && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            <p className="font-medium">Why it was rejected</p>
                            <p className="mt-1 text-[13px] leading-relaxed">
                                {shop.rejectionReason}
                            </p>
                        </div>
                    )}

                    {/* Shortcuts that only make sense for a live shop */}
                    {canSell(shop) && (
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/seller/products/create"
                                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                            >
                                <Package className="h-4 w-4" />
                                Add a product
                            </Link>
                            <Link
                                href="/seller/products"
                                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            >
                                <Boxes className="h-4 w-4" />
                                View your products
                            </Link>
                        </div>
                    )}
                </div>

                {/* Full record */}
                <ShopDataCard seller={shop} showHeader={false} />

                {/* Footer actions */}
                <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end dark:border-zinc-800">
                    <button
                        type="button"
                        onClick={loadShop}
                        disabled={fetching}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 px-6 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
                        Refresh
                    </button>

                    {canClose(shop) && (
                        <button
                            type="button"
                            onClick={() => setCloseOpen(true)}
                            disabled={closing}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-6 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                            <Lock className="h-4 w-4" />
                            {closing ? "Closing shop..." : "Close shop"}
                        </button>
                    )}
                </div>
            </div>

            <CloseShopModal
                open={closeOpen}
                shop={shop}
                loading={closing}
                onClose={() => setCloseOpen(false)}
                onConfirm={confirmClose}
            />
        </div>
    );
}

function NotFound({ shopId, backHref, onRetry }) {
    return (
        <div className="mx-auto w-full max-w-5xl p-6 md:p-10">
            <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-yellow-600 dark:text-zinc-400 dark:hover:text-yellow-500"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to your shops
            </Link>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 px-4 py-20 text-center dark:border-zinc-800">
                <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                    <Store className="h-6 w-6 text-zinc-400" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium">Shop not found</p>
                    <p className="mx-auto max-w-md text-[13px] text-zinc-500 dark:text-zinc-400">
                        Nothing came back for{" "}
                        <span className="font-mono text-xs break-all">{String(shopId)}</span>. It may
                        have been removed, or it belongs to another account.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
