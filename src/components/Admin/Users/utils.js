// Shared with the seller and shop review screens.
export { formatDate, formatDateTime, initials } from "../shared/ui";

/**
 * Roles are free text as far as the UI is concerned — the backend can add one
 * without a frontend change, it just falls back to the neutral badge. Only the
 * roles that carry real weight get their own colour.
 */
const ROLE_BADGES = {
    ADMIN: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400",
    SELLER: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400",
    USER: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-400",
    CUSTOMER:
        "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-400",
};

const NEUTRAL_BADGE =
    "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400";

const ROLE_ACCENTS = {
    ADMIN: "text-rose-500",
    SELLER: "text-amber-500",
    USER: "text-sky-500",
    CUSTOMER: "text-sky-500",
};

export const roleKey = (user) => String(user?.role || "").toUpperCase() || "UNSPECIFIED";

export const roleLabel = (role) => (role && role !== "UNSPECIFIED" ? role : "No role");

export const roleBadge = (role) => ROLE_BADGES[String(role || "").toUpperCase()] || NEUTRAL_BADGE;

export const roleAccent = (role) => ROLE_ACCENTS[String(role || "").toUpperCase()] || "text-zinc-400";

/** Everything the on-page search box is allowed to match against. */
export const userHaystack = (user) =>
    [user?.name, user?.email, user?.mobileno, user?.mobileNo, user?.role, user?.id]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

export const userMobile = (user) => user?.mobileno || user?.mobileNo || "";
