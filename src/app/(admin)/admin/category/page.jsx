"use client";

import CategoryFormModal from "@/components/Admin/Category/CategoryFormModal";
import CategoryTreeCard from "@/components/Admin/Category/CategoryTreeCard";
import DeleteCategoryModal from "@/components/Admin/Category/DeleteCategoryModal";
import {
    createCategory,
    deleteCategory,
    getCategoryMain,
    getDeletedCategories,
    restoreCategory,
    updateCategory,
} from "@/redux-store/authstore/category/action";
import {
    Archive,
    ChevronsDownUp,
    ChevronsUpDown,
    FolderTree,
    Loader2,
    Plus,
    RefreshCw,
    Search,
    X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* ---------------------------------- utils --------------------------------- */

const childrenOf = (node) => node?.children ?? [];

const countNodes = (nodes) =>
    nodes.reduce((total, node) => total + 1 + countNodes(childrenOf(node)), 0);

const treeDepth = (nodes, depth = 1) =>
    nodes.reduce((max, node) => {
        const kids = childrenOf(node);
        return Math.max(max, kids.length ? treeDepth(kids, depth + 1) : depth);
    }, 0);

const collectIds = (nodes, ids = []) => {
    nodes.forEach((node) => {
        ids.push(node.id);
        collectIds(childrenOf(node), ids);
    });
    return ids;
};

/** Keeps a node when it matches, or when any descendant matches. */
const filterTree = (nodes, query) =>
    nodes.reduce((acc, node) => {
        const matches = node?.name?.toLowerCase().includes(query);
        const kids = filterTree(childrenOf(node), query);
        if (matches) acc.push({ ...node, children: childrenOf(node) });
        else if (kids.length) acc.push({ ...node, children: kids });
        return acc;
    }, []);

const asArray = (value) => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(value?.content)) return value.content;
    return [];
};

/* ----------------------------------- page ---------------------------------- */

export default function CategoryPage() {
    const dispatch = useDispatch();
    const mainCategories = useSelector((state) => state.categoryReducer.maincategories);
    const deletedCategoriesRaw = useSelector((state) => state.categoryReducer.deletedcategories);

    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [restoringId, setRestoringId] = useState(null);
    const [showDeleted, setShowDeleted] = useState(false);
    const [query, setQuery] = useState("");
    const [expanded, setExpanded] = useState(() => new Set());
    // { type: "create" | "edit" | "delete", target: node | null }
    const [dialog, setDialog] = useState({ type: null, target: null });

    const activeCategories = useMemo(() => asArray(mainCategories), [mainCategories]);
    const deletedCategories = useMemo(() => asArray(deletedCategoriesRaw), [deletedCategoriesRaw]);

    const getCategory = useCallback(async () => {
        setFetching(true);
        try {
            await Promise.all([
                dispatch(getCategoryMain({ pageno: 0, pagesize: 100 })),
                dispatch(getDeletedCategories()),
            ]);
        } catch (error) {
            console.error(error.message);
        } finally {
            setFetching(false);
        }
    }, [dispatch]);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    /* --------------------------------- tree ui -------------------------------- */

    const sourceTree = showDeleted ? deletedCategories : activeCategories;

    const search = query.trim().toLowerCase();
    const visibleTree = useMemo(
        () => (search ? filterTree(sourceTree, search) : sourceTree),
        [sourceTree, search],
    );

    // While searching every matching branch stays open so results are visible.
    const searchExpanded = useMemo(
        () => (search ? new Set(collectIds(visibleTree)) : null),
        [search, visibleTree],
    );
    const effectiveExpanded = searchExpanded ?? expanded;

    const toggleNode = (id) => {
        if (searchExpanded) return;
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const expandAll = () => setExpanded(new Set(collectIds(sourceTree)));
    const collapseAll = () => setExpanded(new Set());

    const total = useMemo(() => countNodes(sourceTree), [sourceTree]);
    const depth = useMemo(() => treeDepth(sourceTree), [sourceTree]);
    const visibleCount = useMemo(() => countNodes(visibleTree), [visibleTree]);
    const deletedTotal = useMemo(() => countNodes(deletedCategories), [deletedCategories]);

    /* -------------------------------- mutations ------------------------------- */

    const closeDialog = () => {
        if (saving) return;
        setDialog({ type: null, target: null });
    };

    const handleCreate = async (name) => {
        const parent = dialog.target;
        setSaving(true);
        const ok = await dispatch(
            createCategory({ name, parentId: parent?.id ?? null, setLoading: setSaving }),
        );
        if (!ok) return;
        // Reveal the branch the new sub-category landed in.
        if (parent?.id) setExpanded((prev) => new Set(prev).add(parent.id));
        setDialog({ type: null, target: null });
        await getCategory();
    };

    const handleUpdate = async (name) => {
        const node = dialog.target;
        setSaving(true);
        // The update endpoint identifies the category through `parentId`.
        const ok = await dispatch(updateCategory({ name, parentId: node.id, setLoading: setSaving }));
        if (!ok) return;
        setDialog({ type: null, target: null });
        await getCategory();
    };

    const handleDelete = async () => {
        const node = dialog.target;
        setSaving(true);
        const ok = await dispatch(
            deleteCategory({ id: node.id, name: node.name, setLoading: setSaving }),
        );
        if (!ok) return;
        setExpanded((prev) => {
            const next = new Set(prev);
            next.delete(node.id);
            return next;
        });
        setDialog({ type: null, target: null });
        await getCategory();
    };

    const handleRestore = async (node) => {
        setRestoringId(node.id);
        const ok = await dispatch(restoreCategory({ id: node.id, name: node.name }));
        setRestoringId(null);
        if (!ok) return;
        await getCategory();
    };

    const busyId = restoringId ?? (saving ? dialog.target?.id : null);

    /* --------------------------------- render --------------------------------- */

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 p-2 md:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                        <FolderTree className="h-6 w-6 text-yellow-500" />
                        Categories
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage your catalog tree — add, rename and remove categories at any level.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setDialog({ type: "create", target: null })}
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <StatTile
                    label={showDeleted ? "Deleted categories" : "Total categories"}
                    value={total}
                />
                <StatTile label="Top level" value={sourceTree.length} />
                <StatTile label="Tree depth" value={depth} />
            </div>

            {/* Tree card */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm dark:border-zinc-800">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center dark:border-zinc-800">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                                showDeleted ? "Search deleted categories..." : "Search categories..."
                            }
                            className="flex h-10 w-full rounded-md border border-zinc-300 bg-background pl-9 pr-9 text-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700"
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

                    <div className="flex items-center gap-2">
                        <ToolbarButton label="Expand all" onClick={expandAll} disabled={!!search}>
                            <ChevronsUpDown className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton label="Collapse all" onClick={collapseAll} disabled={!!search}>
                            <ChevronsDownUp className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton label="Refresh" onClick={getCategory} disabled={fetching}>
                            <RefreshCw className={`h-4 w-4 ${fetching ? "animate-spin" : ""}`} />
                        </ToolbarButton>
                    </div>
                </div>

                {/* Deleted filter */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <Archive className="h-4 w-4 text-zinc-400" />
                        <label htmlFor="show-deleted" className="cursor-pointer text-sm font-medium">
                            Show deleted
                        </label>
                        {deletedTotal > 0 && (
                            <span className="inline-flex h-5 items-center rounded-full border border-zinc-200 px-2 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                {deletedTotal}
                            </span>
                        )}
                    </div>

                    <Switch
                        id="show-deleted"
                        checked={showDeleted}
                        onChange={(next) => {
                            setShowDeleted(next);
                            setQuery("");
                            setExpanded(new Set());
                        }}
                    />
                </div>

                {/* Body */}
                <div className="p-2 md:p-4" role="tree" aria-label="Category tree">
                    {fetching && sourceTree.length === 0 ? (
                        <TreeSkeleton />
                    ) : visibleTree.length === 0 ? (
                        <EmptyState
                            search={search}
                            showDeleted={showDeleted}
                            onClear={() => setQuery("")}
                            onCreate={() => setDialog({ type: "create", target: null })}
                        />
                    ) : (
                        visibleTree.map((node) => (
                            <CategoryTreeCard
                                key={node.id}
                                node={node}
                                expanded={effectiveExpanded}
                                onToggle={toggleNode}
                                onAddChild={(target) => setDialog({ type: "create", target })}
                                onEdit={(target) => setDialog({ type: "edit", target })}
                                onDelete={(target) => setDialog({ type: "delete", target })}
                                onRestore={handleRestore}
                                deleted={showDeleted}
                                busyId={busyId}
                            />
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-[13px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <span>
                        {search
                            ? `${visibleCount} of ${total} categories match "${query.trim()}"`
                            : showDeleted
                              ? `${total} deleted ${total === 1 ? "category" : "categories"}`
                              : `${total} ${total === 1 ? "category" : "categories"}`}
                    </span>
                    {fetching && sourceTree.length > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Syncing
                        </span>
                    )}
                </div>
            </div>

            {/* Dialogs */}
            <CategoryFormModal
                open={dialog.type === "create" || dialog.type === "edit"}
                mode={dialog.type === "edit" ? "edit" : "create"}
                target={dialog.target}
                loading={saving}
                onClose={closeDialog}
                onSubmit={dialog.type === "edit" ? handleUpdate : handleCreate}
            />

            <DeleteCategoryModal
                open={dialog.type === "delete"}
                target={dialog.target}
                loading={saving}
                onClose={closeDialog}
                onConfirm={handleDelete}
            />
        </div>
    );
}

/* -------------------------------- sub views ------------------------------- */

function Switch({ id, checked, onChange }) {
    return (
        <button
            type="button"
            id={id}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 ${
                checked ? "bg-yellow-500" : "bg-zinc-200 dark:bg-zinc-700"
            }`}
        >
            <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    checked ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}

function StatTile({ label, value }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-background p-4 shadow-sm dark:border-zinc-800">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
        </div>
    );
}

function ToolbarButton({ label, onClick, disabled, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
        >
            {children}
        </button>
    );
}

function TreeSkeleton() {
    return (
        <div className="space-y-2 p-2">
            {[0, 1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center gap-3" style={{ paddingLeft: (row % 3) * 20 }}>
                    <div className="h-6 w-6 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    <div
                        className="h-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
                        style={{ width: `${140 + ((row * 47) % 120)}px` }}
                    />
                </div>
            ))}
        </div>
    );
}

function EmptyState({ search, showDeleted, onClear, onCreate }) {
    const title = search
        ? "No categories found"
        : showDeleted
          ? "Nothing in the archive"
          : "No categories yet";

    const hint = search
        ? "Try a different search term."
        : showDeleted
          ? "Deleted categories show up here and can be restored."
          : "Create your first category to start building the catalog tree.";

    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                {showDeleted && !search ? (
                    <Archive className="h-6 w-6 text-zinc-400" />
                ) : (
                    <FolderTree className="h-6 w-6 text-zinc-400" />
                )}
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">{hint}</p>
            </div>
            {search ? (
                <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    Clear search
                </button>
            ) : (
                !showDeleted && (
                    <button
                        type="button"
                        onClick={onCreate}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-yellow-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-yellow-400"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </button>
                )
            )}
        </div>
    );
}
