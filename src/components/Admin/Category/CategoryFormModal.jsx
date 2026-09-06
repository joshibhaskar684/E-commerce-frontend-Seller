"use client";

import { Modal } from "@mui/material";
import { CornerDownRight, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";

/**
 * Dialog used for both "create category / sub-category" and "rename category".
 *
 * mode   -> "create" | "edit"
 * target -> for "create" it is the parent node (null = root category)
 *           for "edit" it is the category being renamed
 */
export default function CategoryFormModal({ open, mode, target, loading, onClose, onSubmit }) {
    return (
        <Modal open={open} onClose={loading ? undefined : onClose}>
            <div className="flex h-full w-full items-center justify-center p-4 outline-none">
                {/* key resets the form whenever the dialog targets a different node */}
                <CategoryForm
                    key={`${mode}-${target?.id ?? "root"}`}
                    mode={mode}
                    target={target}
                    loading={loading}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            </div>
        </Modal>
    );
}

function CategoryForm({ mode, target, loading, onClose, onSubmit }) {
    const isEdit = mode === "edit";
    const [name, setName] = useState(isEdit ? (target?.name ?? "") : "");
    const [touched, setTouched] = useState(false);

    const trimmed = name.trim();
    const error =
        touched && trimmed.length === 0
            ? "Category name is required."
            : touched && trimmed.length < 2
              ? "Use at least 2 characters."
              : "";
    const unchanged = isEdit && trimmed === (target?.name ?? "").trim();
    const canSubmit = trimmed.length >= 2 && !unchanged && !loading;

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        onSubmit(trimmed);
    };

    return (
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-lg dark:border-zinc-800">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6 dark:border-zinc-800">
                <div className="flex flex-col space-y-1.5">
                    <h3 className="flex items-center gap-2 text-xl font-semibold leading-none tracking-tight">
                        {isEdit ? (
                            <Pencil className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <PlusCircle className="h-5 w-5 text-yellow-500" />
                        )}
                        {isEdit ? "Rename Category" : target ? "Add Sub-Category" : "Create Category"}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isEdit
                            ? "Update the name of this category."
                            : target
                              ? "This category will be nested under the selected parent."
                              : "Add a new top level category to your catalog."}
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
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
                {target && (
                    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {isEdit ? "Category" : "Parent category"}
                        </p>
                        <p className="flex items-center gap-2 text-sm font-medium">
                            <CornerDownRight className="h-4 w-4 shrink-0 text-yellow-500" />
                            <span className="truncate">{target.name}</span>
                        </p>
                        <p className="mt-1 truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                            {target.id}
                        </p>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="category-name" className="text-sm font-medium leading-none">
                        {isEdit ? "New name" : "Category name"} <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="category-name"
                        name="name"
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched(true)}
                        disabled={loading}
                        placeholder={target ? "e.g., Men's Shirts" : "e.g., Electronics"}
                        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            error
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-zinc-300 focus-visible:ring-yellow-500 dark:border-zinc-700"
                        }`}
                    />
                    {error ? (
                        <p className="text-[13px] text-red-500">{error}</p>
                    ) : (
                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                            Names should be unique so sellers can find them easily.
                        </p>
                    )}
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
                        disabled={!canSubmit}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-500 px-6 text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isEdit ? "Saving..." : "Creating..."}
                            </>
                        ) : isEdit ? (
                            "Save changes"
                        ) : (
                            "Create category"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
