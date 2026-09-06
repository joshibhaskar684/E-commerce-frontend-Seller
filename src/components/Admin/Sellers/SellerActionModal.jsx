"use client";

import { Modal } from "@mui/material";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useState } from "react";
import { SELLER_ACTIONS, TONE_CLASS, initials, statusMeta } from "./utils";

/**
 * One confirmation dialog for every seller state change. Rejection is the only
 * action that also collects a reason, so the textarea is driven by the action
 * config rather than by a separate modal per verb.
 *
 * Callers key this component on the action + seller so every dialog opens with
 * a blank reason instead of whatever the previous one held.
 */
export default function SellerActionModal({ open, action, seller, loading, onClose, onConfirm }) {
    const [reason, setReason] = useState("");

    const meta = SELLER_ACTIONS[action];
    if (!meta) return null;

    const tone = TONE_CLASS[meta.tone];
    const status = statusMeta(seller?.status);
    const Icon = meta.icon;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (loading) return;
        if (meta.reason && !reason.trim()) return;
        onConfirm(reason.trim());
    };

    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="flex h-full w-full items-center justify-center p-4 outline-none">
                <div className="max-h-full w-full max-w-md overflow-y-auto rounded-xl border border-zinc-200 bg-background shadow-lg dark:border-zinc-800">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="flex flex-col space-y-1.5">
                            <h3 className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
                                <Icon className={`h-5 w-5 ${tone.icon}`} />
                                {meta.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {meta.description}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            aria-label="Close"
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="space-y-4 p-6">
                        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-background text-xs font-semibold dark:border-zinc-800 ${status.accent}`}
                            >
                                {initials(seller?.businessName)}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {seller?.businessName || "Unnamed business"}
                                </p>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    {seller?.mobileNo || "No contact"} · {status.label}
                                </p>
                                <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                    {seller?.id}
                                </p>
                            </div>
                        </div>

                        {meta.reason ? (
                            <div className="space-y-1.5">
                                <label htmlFor="seller-action-reason" className="text-sm font-medium">
                                    Reason for rejection
                                </label>
                                {/* globals.css sets a blanket textarea padding outside any cascade
                                    layer, which beats Tailwind padding utilities — hence the inline
                                    padding here. */}
                                <textarea
                                    id="seller-action-reason"
                                    value={reason}
                                    onChange={(event) => setReason(event.target.value)}
                                    required
                                    rows={4}
                                    style={{ padding: "0.5rem 0.75rem" }}
                                    placeholder="Explain what is missing or wrong with this application..."
                                    className="w-full resize-y rounded-md border border-zinc-300 bg-background text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-zinc-700"
                                />
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                    Shared with the seller so they know what to fix.
                                </p>
                            </div>
                        ) : (
                            <div className={`flex gap-2 rounded-md border p-3 text-[13px] ${tone.callout}`}>
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{meta.note || meta.description}</span>
                            </div>
                        )}

                        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || (meta.reason && !reason.trim())}
                                className={`inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${tone.solid}`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {meta.pending}
                                    </>
                                ) : (
                                    meta.cta
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
