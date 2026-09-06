import { Ban, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

// The status vocabulary, button tones and date helpers are shared with the shop
// review screen; re-exported here so seller components keep one import.
export {
    STATUS_META,
    TONE_CLASS,
    actionsForStatus,
    daysSince,
    formatDate,
    formatDateTime,
    initials,
    locationLine,
    statusMeta,
} from "../shared/ui";

/* ------------------------------ seller actions ---------------------------- */

/**
 * Every state changing action an admin can run against a seller. `tone` drives
 * the button + modal colours, `reason` marks the ones that need a written
 * justification before they can be submitted.
 */
export const SELLER_ACTIONS = {
    approve: {
        key: "approve",
        label: "Approve",
        cta: "Approve seller",
        pending: "Approving...",
        icon: CheckCircle2,
        tone: "emerald",
        title: "Approve this seller?",
        description:
            "The seller will be able to open a shop and start listing products on the marketplace.",
        note: "Check the PAN, GST and bank details on the application first — approval takes effect immediately.",
    },
    reapprove: {
        key: "reapprove",
        label: "Re-approve",
        cta: "Re-approve seller",
        pending: "Restoring...",
        icon: RotateCcw,
        tone: "emerald",
        title: "Restore this seller?",
        description:
            "Access is handed back to the seller and their listings become orderable again.",
        note: "Anything that led to the earlier rejection or suspension should be resolved before you restore them.",
    },
    suspend: {
        key: "suspend",
        label: "Suspend",
        cta: "Suspend seller",
        pending: "Suspending...",
        icon: Ban,
        tone: "amber",
        title: "Suspend this seller?",
        description:
            "The seller keeps their account but loses access until an admin restores them.",
        note: "Their listings stop being orderable straight away. Existing orders are not cancelled by this.",
    },
    reject: {
        key: "reject",
        label: "Reject",
        cta: "Reject seller",
        pending: "Rejecting...",
        icon: XCircle,
        tone: "red",
        reason: true,
        title: "Reject this seller?",
        description:
            "The application is turned down. The reason you write below is shown to the seller.",
    },
};

/* ------------------------------ seller fields ----------------------------- */

export const addressLine = (seller) =>
    [seller?.address, seller?.city, seller?.state, seller?.pincode].filter(Boolean).join(", ") ||
    "—";

/** Everything the on-page search box is allowed to match against. */
export const sellerHaystack = (seller) =>
    [
        seller?.businessName,
        seller?.id,
        seller?.mobileNo,
        seller?.city,
        seller?.state,
        seller?.pincode,
        seller?.panNumber,
        seller?.gstNumber,
        seller?.accountHolderName,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
