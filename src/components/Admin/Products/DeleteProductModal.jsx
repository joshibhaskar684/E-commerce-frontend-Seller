"use client";

import { Modal } from "@mui/material";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { formatINR, productImage } from "./utils";

export default function DeleteProductModal({ open, target, loading, onClose, onConfirm }) {
    const image = productImage(target);

    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="flex h-full w-full items-center justify-center p-4 outline-none">
                <div className="w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-lg dark:border-zinc-800">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="flex flex-col space-y-1.5">
                            <h3 className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                Delete Product
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                This action cannot be undone.
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
                    <div className="space-y-4 p-6">
                        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                            {image && (
                                <img
                                    src={image}
                                    alt={target?.name || "Product"}
                                    className="h-12 w-12 shrink-0 rounded border border-zinc-200 bg-background object-contain p-1 dark:border-zinc-800"
                                />
                            )}
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{target?.name}</p>
                                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                    {target?.brand || "Unbranded"} · {formatINR(Number(target?.price))}
                                </p>
                                <p className="mt-0.5 truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                    {target?.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-[13px] text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                The product will be removed from the storefront and will no longer be
                                orderable by customers.
                            </span>
                        </div>

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
                                type="button"
                                onClick={onConfirm}
                                disabled={loading}
                                className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete product"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
