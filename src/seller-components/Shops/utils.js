import { BadgeCheck, Ban, Clock, Lock, ShieldQuestion, XCircle } from "lucide-react";

/**
 * Shop vocabulary for the seller side.
 *
 * The admin review screens only ever see the four states an admin can put a
 * shop into. A seller also sees the two the seller themselves cause — a shop
 * they closed, and one the backend marks inactive — so the map here is wider
 * than the admin one, and every entry is written from the seller's point of
 * view ("Live", not "Approved").
 */

/* ------------------------------- status meta ------------------------------ */

export const SHOP_STATUS = {
    APPROVED: {
        key: "live",
        label: "Live",
        icon: BadgeCheck,
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
        dot: "bg-emerald-500",
        accent: "text-emerald-500",
        headline: "This shop is live",
        guidance:
            "Customers can find it on the storefront and order the products listed under it.",
    },
    PENDING: {
        key: "review",
        label: "Under review",
        icon: Clock,
        badge: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-950/40 dark:text-yellow-400",
        dot: "bg-yellow-500",
        accent: "text-yellow-500",
        headline: "Waiting on review",
        guidance:
            "An admin still has to approve this application. Approval usually takes 24 to 48 hours — you can add products once it clears.",
    },
    REJECTED: {
        key: "attention",
        label: "Rejected",
        icon: XCircle,
        badge: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
        dot: "bg-red-500",
        accent: "text-red-500",
        headline: "This application was turned down",
        guidance:
            "Read the reason below, then apply again with the details corrected. Nothing from this shop is on the storefront.",
    },
    SUSPENDED: {
        key: "attention",
        label: "Suspended",
        icon: Ban,
        badge: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400",
        dot: "bg-orange-500",
        accent: "text-orange-500",
        headline: "This shop is suspended",
        guidance:
            "An admin has pulled it from the storefront. Its products cannot be ordered until an admin restores it.",
    },
    CLOSED: {
        key: "closed",
        label: "Closed",
        icon: Lock,
        badge: "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
        dot: "bg-zinc-400",
        accent: "text-zinc-400",
        headline: "You closed this shop",
        guidance:
            "It no longer appears on the storefront. Apply for a new shop if you want to start selling under it again.",
    },
};

// The backend has used more than one spelling for the same two states.
SHOP_STATUS.ACTIVE = SHOP_STATUS.APPROVED;
SHOP_STATUS.INACTIVE = SHOP_STATUS.CLOSED;

const UNKNOWN = {
    key: "",
    label: "Unknown",
    icon: ShieldQuestion,
    badge: "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
    dot: "bg-zinc-400",
    accent: "text-zinc-400",
    headline: "Status unavailable",
    guidance: "We could not read a status for this shop. Refresh, or contact support if it stays this way.",
};

export const normalizeStatus = (shop) => String(shop?.status || "").trim().toUpperCase();

export const statusMeta = (shop) => SHOP_STATUS[normalizeStatus(shop)] || UNKNOWN;

/* --------------------------------- filters -------------------------------- */

/** Tabs double as the overview counters, so each one carries its own copy. */
export const SHOP_FILTERS = [
    {
        key: "all",
        label: "All shops",
        blurb: "Every shop registered under your account.",
        emptyTitle: "No shops yet",
        emptyBody: "Apply for a shop to start selling. Approval usually takes 24 to 48 hours.",
    },
    {
        key: "live",
        label: "Live",
        blurb: "Approved and selling on the storefront.",
        emptyTitle: "Nothing live yet",
        emptyBody: "Once an application is approved it shows up here and can take orders.",
    },
    {
        key: "review",
        label: "Under review",
        blurb: "Applications waiting on an admin.",
        emptyTitle: "Nothing waiting on review",
        emptyBody: "New applications land here until an admin approves or rejects them.",
    },
    {
        key: "attention",
        label: "Needs attention",
        blurb: "Rejected or suspended — not selling.",
        emptyTitle: "Nothing needs your attention",
        emptyBody: "Rejected and suspended shops collect here so they are easy to act on.",
    },
    {
        key: "closed",
        label: "Closed",
        blurb: "Shops you have closed yourself.",
        emptyTitle: "No closed shops",
        emptyBody: "Shops you close stay here as a record.",
    },
];

export const FILTER_KEYS = SHOP_FILTERS.map((f) => f.key);

export const normalizeFilter = (value) =>
    FILTER_KEYS.includes(String(value || "")) ? String(value) : "all";

export const filterFor = (key) =>
    SHOP_FILTERS.find((f) => f.key === normalizeFilter(key)) ?? SHOP_FILTERS[0];

export const matchesFilter = (shop, key) =>
    normalizeFilter(key) === "all" || statusMeta(shop).key === normalizeFilter(key);

/* ------------------------------- shop fields ------------------------------ */

export const shopName = (shop) =>
    shop?.shopName || shop?.businessName || shop?.name || "Unnamed shop";

export const ownerName = (shop) => shop?.businessOwnerName || shop?.ownerName || "";

export const addressLine = (shop) =>
    [shop?.address, shop?.city, shop?.state, shop?.pincode].filter(Boolean).join(", ");

export const locationLine = (shop) =>
    [shop?.city, shop?.state].filter(Boolean).join(", ") || "No location on file";

/** Everything the on-page search box is allowed to match against. */
export const shopHaystack = (shop) =>
    [
        shopName(shop),
        shop?.id,
        shop?.description,
        shop?.address,
        shop?.city,
        shop?.state,
        shop?.pincode,
        shop?.mobileNo,
        shop?.status,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

/**
 * A seller can only close a shop that is actually running. Closing a rejected
 * or already closed one is a no-op the backend would reject anyway.
 */
export const canClose = (shop) => ["APPROVED", "ACTIVE", "PENDING"].includes(normalizeStatus(shop));

/** Only an approved shop can hold products. */
export const canSell = (shop) => ["APPROVED", "ACTIVE"].includes(normalizeStatus(shop));

/* -------------------------------- formatting ------------------------------ */

export const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

export const formatDateTime = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "—"
        : date.toLocaleString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          });
};

export const daysSince = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
};

export const initials = (name) =>
    String(name || "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "?";
