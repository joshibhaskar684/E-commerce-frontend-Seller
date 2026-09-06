"use client";

import { useState } from "react";
import {
    ArchiveRestore,
    Check,
    ChevronRight,
    Copy,
    Folder,
    FolderOpen,
    Loader2,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react";

/**
 * Recursive tree row for a CategoryNode -> { id, name, children }
 * `children` comes back as null from the backend for leaf nodes.
 *
 * `deleted` switches the row to the archive view, where the only action is restore.
 */
export default function CategoryTreeCard({
    node,
    depth = 0,
    expanded,
    onToggle,
    onAddChild,
    onEdit,
    onDelete,
    onRestore,
    deleted = false,
    busyId,
}) {
    const [copied, setCopied] = useState(false);

    const children = node?.children ?? [];
    const hasChildren = children.length > 0;
    const isOpen = expanded?.has(node?.id);
    const isBusy = busyId === node?.id;

    const copyId = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(node.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleRowClick = () => {
        if (hasChildren) onToggle(node.id);
    };

    return (
        <div className="select-none">
            {/* Row */}
            <div
                role="treeitem"
                aria-level={depth + 1}
                aria-selected={false}
                aria-expanded={hasChildren ? isOpen : undefined}
                onClick={handleRowClick}
                className={`group flex items-center gap-2 rounded-md px-2 py-2 transition-colors ${
                    hasChildren ? "cursor-pointer" : "cursor-default"
                } hover:bg-zinc-100 dark:hover:bg-zinc-800/60`}
            >
                {/* Chevron / leaf spacer */}
                {hasChildren ? (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(node.id);
                        }}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
                    >
                        <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                        />
                    </button>
                ) : (
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </span>
                )}

                {/* Icon */}
                <span className={`shrink-0 ${deleted ? "text-zinc-400" : "text-yellow-500"}`}>
                    {hasChildren && isOpen ? (
                        <FolderOpen className="h-4 w-4" />
                    ) : (
                        <Folder className="h-4 w-4" />
                    )}
                </span>

                {/* Name + meta */}
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                        className={`truncate text-sm font-medium ${
                            deleted ? "text-zinc-500 line-through dark:text-zinc-400" : ""
                        }`}
                    >
                        {node?.name}
                    </span>

                    {hasChildren && (
                        <span className="inline-flex h-5 items-center rounded-full border border-zinc-200 px-2 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            {children.length}
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={copyId}
                        title="Copy category id"
                        className="hidden items-center gap-1 rounded px-1 font-mono text-[11px] text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200 sm:inline-flex"
                    >
                        {copied ? (
                            <Check className="h-3 w-3 text-green-500" />
                        ) : (
                            <Copy className="h-3 w-3" />
                        )}
                        {node?.id}
                    </button>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    {isBusy ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center text-zinc-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </span>
                    ) : deleted ? (
                        <IconButton
                            label="Restore category"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRestore(node);
                            }}
                        >
                            <ArchiveRestore className="h-4 w-4" />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton
                                label="Add sub-category"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddChild(node);
                                }}
                            >
                                <Plus className="h-4 w-4" />
                            </IconButton>

                            <IconButton
                                label="Rename category"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(node);
                                }}
                            >
                                <Pencil className="h-4 w-4" />
                            </IconButton>

                            <IconButton
                                label="Delete category"
                                danger
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(node);
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </IconButton>
                        </>
                    )}
                </div>
            </div>

            {/* Children */}
            {isOpen && hasChildren && (
                <div
                    role="group"
                    className="ml-[15px] border-l border-zinc-200 pl-3 dark:border-zinc-800"
                >
                    {children.map((child) => (
                        <CategoryTreeCard
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            expanded={expanded}
                            onToggle={onToggle}
                            onAddChild={onAddChild}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onRestore={onRestore}
                            deleted={deleted}
                            busyId={busyId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function IconButton({ label, danger, children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            aria-label={label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 dark:text-zinc-400 ${
                danger
                    ? "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                    : "hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
            }`}
        >
            {children}
        </button>
    );
}
