import { BadgeCheck, Ban, Clock, ShieldQuestion, XCircle } from "lucide-react";

/**
 * Bits shared by the admin review screens (sellers, shops). Both entities move
 * through the same four states behind one endpoint each, so the status vocabulary,
 * the button tones and the date helpers live here rather than being copied per
 * screen. Anything entity specific — the verbs, the searchable fields — stays in
 * that screen's own utils.
 */

/* ------------------------------- status meta ------------------------------ */

export const STATUS_META = {
    APPROVED: {
        tab: "approved",
        label: "Approved",
        icon: BadgeCheck,
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
        dot: "bg-emerald-500",
        accent: "text-emerald-500",
    },
    PENDING: {
        tab: "pending",
        label: "Pending",
        icon: Clock,
        badge: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-950/40 dark:text-yellow-400",
        dot: "bg-yellow-500",
        accent: "text-yellow-500",
    },
    REJECTED: {
        tab: "rejected",
        label: "Rejected",
        icon: XCircle,
        badge: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
        dot: "bg-red-500",
        accent: "text-red-500",
    },
    SUSPENDED: {
        tab: "suspended",
        label: "Suspended",
        icon: Ban,
        badge: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400",
        dot: "bg-orange-500",
        accent: "text-orange-500",
    },
};

const UNKNOWN_STATUS = {
    tab: "",
    label: "Unknown",
    icon: ShieldQuestion,
    badge: "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
    dot: "bg-zinc-400",
    accent: "text-zinc-400",
};

export const statusMeta = (status) =>
    STATUS_META[String(status || "").toUpperCase()] || UNKNOWN_STATUS;

/** Which actions make sense for a record sitting in a given state. */
export const actionsForStatus = (status) => {
    switch (String(status || "").toUpperCase()) {
        case "PENDING":
            return ["approve", "reject"];
        case "APPROVED":
            return ["suspend", "reject"];
        case "REJECTED":
            return ["reapprove"];
        case "SUSPENDED":
            return ["reapprove", "reject"];
        default:
            return [];
    }
};

/* --------------------------------- tones ---------------------------------- */

export const TONE_CLASS = {
    emerald: {
        solid: "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500",
        soft: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-500 dark:border-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-950/40",
        callout:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
        icon: "text-emerald-500",
    },
    amber: {
        solid: "bg-amber-500 text-zinc-950 hover:bg-amber-400 focus-visible:ring-amber-500",
        soft: "border-amber-200 text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-500 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-950/40",
        callout:
            "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400",
        icon: "text-amber-500",
    },
    red: {
        solid: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
        soft: "border-red-200 text-red-600 hover:bg-red-50 focus-visible:ring-red-500 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40",
        callout:
            "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
        icon: "text-red-500",
    },
};

/* -------------------------------- formatting ------------------------------ */

export const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          });
};

/** Whole days between `value` and now — used to flag records left waiting. */
export const daysSince = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
};

export const initials = (name) =>
    String(name || "?")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "?";

/** "City, State" for a record that carries them, or a neutral placeholder. */
export const locationLine = (record) =>
    [record?.city, record?.state].filter(Boolean).join(", ") || "Location not provided";
