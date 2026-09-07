"use client";

import { Modal } from "@mui/material";
import { AlertTriangle, Loader2, Lock, Store, X } from "lucide-react";
import { useState } from "react";
import { locationLine, shopName, statusMeta } from "./utils";

/**
 * Closing a shop is irreversible from the seller side — there is no reopen
 * endpoint, only a fresh application — and it was previously a single
 * unguarded click on the card. Hence the acknowledgement checkbox.
 *
 * Callers key this on the shop id so the checkbox resets for each shop rather
 * than carrying over from the last one.
 */
export default function CloseShopModal({ open, shop, loading, onClose, onConfirm }) {
    const [acknowledged, setAcknowledged] = useState(false);

    if (!shop) return null;

    const name = shopName(shop);
    const meta = statusMeta(shop);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (loading || !acknowledged) return;
        onConfirm(shop);
    };

    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="flex h-full w-full items-center justify-center p-4 outline-none">
                <form
                    onSubmit={handleSubmit}
                    className="max-h-full w-full max-w-md overflow-y-auto rounded-xl border border-zinc-200 bg-background shadow-lg dark:border-zinc-800"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="flex flex-col space-y-1.5">
                            <h3 className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
                                <Lock className="h-5 w-5 text-red-500" />
                                Close this shop?
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                This cannot be undone from your account.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Cancel"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-4 p-6">
                        {/* Which shop, so nobody closes the wrong one */}
                        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                {shop?.logoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={shop.logoUrl}
                                        alt={name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Store className={`h-4 w-4 ${meta.accent}`} />
                                )}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{name}</p>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    {locationLine(shop)}
                                </p>
                            </div>
                            <span
                                className={`ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
                            >
                                {meta.label}
                            </span>
                        </div>

                        <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-[13px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                            <ul className="list-inside list-disc space-y-1">
                                <li>The shop is removed from the storefront straight away.</li>
                                <li>Its products stop being orderable.</li>
                                <li>
                                    There is no reopen — you would have to apply for a new shop and
                                    wait for approval again.
                                </li>
                            </ul>
                        </div>

                        <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-zinc-600 dark:text-zinc-300">
                            <input
                                type="checkbox"
                                checked={acknowledged}
                                onChange={(event) => setAcknowledged(event.target.checked)}
                                disabled={loading}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-red-600"
                            />
                            I understand this is permanent and want to close{" "}
                            <span className="font-medium">{name}</span>.
                        </label>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 p-4 sm:flex-row sm:justify-end dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                            Keep it open
                        </button>

                        <button
                            type="submit"
                            disabled={loading || !acknowledged}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Closing...
                                </>
                            ) : (
                                "Close shop"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
