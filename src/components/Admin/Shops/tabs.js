import {
    getApprovedSHOPS,
    getRejectedSHOPS,
    getSuspendedSHOPS,
    getUnApprovedSHOPS,
} from "@/redux-store/authstore/shops/action";
import { STATUS_META } from "../shared/ui";

/**
 * The four shop queues used to live at their own routes
 * (/admin/shop, /admin/shop/request, /rejected, /suspended).
 * They are now tabs on a single screen, so each one only needs to say which
 * thunk fills it and which slice of `ShopsReducer` it reads back from.
 */
export const SHOP_TABS = {
    approved: {
        key: "approved",
        label: "Approved",
        status: "APPROVED",
        stateKey: "approveShops",
        fetch: getApprovedSHOPS,
        icon: STATUS_META.APPROVED.icon,
        accent: STATUS_META.APPROVED.accent,
        blurb: "Shops live on the storefront right now.",
        emptyTitle: "No approved shops yet",
        emptyBody: "Approve a request from the Pending tab and it will show up here.",
    },
    pending: {
        key: "pending",
        label: "Pending",
        status: "PENDING",
        stateKey: "unapproveShops",
        fetch: getUnApprovedSHOPS,
        icon: STATUS_META.PENDING.icon,
        accent: STATUS_META.PENDING.accent,
        blurb: "Shop applications waiting on your review.",
        emptyTitle: "Nothing waiting for review",
        emptyBody: "New shop requests from sellers land here as soon as they are submitted.",
    },
    rejected: {
        key: "rejected",
        label: "Rejected",
        status: "REJECTED",
        stateKey: "rejectedShops",
        fetch: getRejectedSHOPS,
        icon: STATUS_META.REJECTED.icon,
        accent: STATUS_META.REJECTED.accent,
        blurb: "Requests you turned down — they can still be re-approved.",
        emptyTitle: "No rejected shops",
        emptyBody: "Requests you turn down are kept here with their rejection reason.",
    },
    suspended: {
        key: "suspended",
        label: "Suspended",
        status: "SUSPENDED",
        stateKey: "suspendedShops",
        fetch: getSuspendedSHOPS,
        icon: STATUS_META.SUSPENDED.icon,
        accent: STATUS_META.SUSPENDED.accent,
        blurb: "Shops pulled from the storefront until you restore them.",
        emptyTitle: "No suspended shops",
        emptyBody: "Suspend an approved shop and it will be listed here.",
    },
};

export const TAB_KEYS = Object.keys(SHOP_TABS);

/** Falls back to the approved queue, which is what /admin/shop used to show. */
export const normalizeTab = (value) =>
    TAB_KEYS.includes(String(value)) ? String(value) : "approved";

/** Tab a shop belongs to, e.g. to send the admin back to the right queue. */
export const tabForStatus = (status) => {
    const tab = TAB_KEYS.find((key) => SHOP_TABS[key].status === String(status || "").toUpperCase());
    return tab || "approved";
};

export const shopsHref = (tab, { pageno = 1, pagesize = 12 } = {}) =>
    `/admin/shop?status=${normalizeTab(tab)}&pageno=${pageno}&pagesize=${pagesize}`;
