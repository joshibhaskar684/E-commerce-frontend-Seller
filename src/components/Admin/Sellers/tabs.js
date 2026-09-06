import {
    getApprovedSeller,
    getRejectedSeller,
    getSuspendedSeller,
    getUnApprovedSeller,
} from "@/redux-store/authstore/seller/action";
import { STATUS_META } from "./utils";

/**
 * The four seller queues used to live at their own routes
 * (/admin/sellers, /admin/sellers/request, /rejected, /suspended).
 * They are now tabs on a single screen, so each one only needs to say which
 * thunk fills it and which slice of `sellerReducer` it reads back from.
 */
export const SELLER_TABS = {
    approved: {
        key: "approved",
        label: "Approved",
        status: "APPROVED",
        stateKey: "approveseller",
        fetch: getApprovedSeller,
        icon: STATUS_META.APPROVED.icon,
        accent: STATUS_META.APPROVED.accent,
        blurb: "Sellers trading on the marketplace right now.",
        emptyTitle: "No approved sellers yet",
        emptyBody: "Approve an application from the Pending tab and it will show up here.",
    },
    pending: {
        key: "pending",
        label: "Pending",
        status: "PENDING",
        stateKey: "unapproveseller",
        fetch: getUnApprovedSeller,
        icon: STATUS_META.PENDING.icon,
        accent: STATUS_META.PENDING.accent,
        blurb: "Applications waiting on your review.",
        emptyTitle: "Nothing waiting for review",
        emptyBody: "New seller applications land here as soon as they are submitted.",
    },
    rejected: {
        key: "rejected",
        label: "Rejected",
        status: "REJECTED",
        stateKey: "rejectedseller",
        fetch: getRejectedSeller,
        icon: STATUS_META.REJECTED.icon,
        accent: STATUS_META.REJECTED.accent,
        blurb: "Applications you turned down — they can still be re-approved.",
        emptyTitle: "No rejected applications",
        emptyBody: "Applications you turn down are kept here with their rejection reason.",
    },
    suspended: {
        key: "suspended",
        label: "Suspended",
        status: "SUSPENDED",
        stateKey: "suspendedseller",
        fetch: getSuspendedSeller,
        icon: STATUS_META.SUSPENDED.icon,
        accent: STATUS_META.SUSPENDED.accent,
        blurb: "Sellers locked out of the marketplace until you restore them.",
        emptyTitle: "No suspended sellers",
        emptyBody: "Suspend an approved seller and they will be listed here.",
    },
};

export const TAB_KEYS = Object.keys(SELLER_TABS);

/** Falls back to the approved queue, which is what /admin/sellers used to show. */
export const normalizeTab = (value) =>
    TAB_KEYS.includes(String(value)) ? String(value) : "approved";

/** Tab a seller belongs to, e.g. to send the admin back to the right queue. */
export const tabForStatus = (status) => {
    const tab = TAB_KEYS.find((key) => SELLER_TABS[key].status === String(status || "").toUpperCase());
    return tab || "approved";
};

export const sellersHref = (tab, { pageno = 1, pagesize = 12 } = {}) =>
    `/admin/sellers?status=${normalizeTab(tab)}&pageno=${pageno}&pagesize=${pagesize}`;
