/* Shared helpers for the admin products views. */

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const formatINR = (value) =>
    typeof value === "number" && !Number.isNaN(value) ? `₹${inr.format(value)}` : "—";

export const discountPercent = (product) => {
    const price = Number(product?.price);
    const original = Number(product?.originalPrice);
    if (!original || !price || original <= price) return 0;
    return Math.round(((original - price) / original) * 100);
};

/** The list endpoint sends `image`, the detail endpoint sends `images[]`. */
export const productImage = (product) =>
    product?.image || product?.images?.[0] || null;

/** Low-stock threshold is deliberately generous — admins want the early warning. */
export const stockStatus = (product) => {
    const qty = Number(product?.quantity);
    if (!Number.isFinite(qty)) return { label: "Unknown", tone: "muted", qty: null };
    if (qty <= 0) return { label: "Out of stock", tone: "danger", qty };
    if (qty <= 10) return { label: `Low · ${qty}`, tone: "warn", qty };
    return { label: `In stock · ${qty}`, tone: "ok", qty };
};

export const stockToneClass = {
    ok: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
    warn: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400",
    danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
    muted: "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
};

export const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
