import { Ban, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

// Shared with the seller review screen — same four states, same button tones.
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

/* ------------------------------- shop actions ----------------------------- */

/**
 * Every state changing action an admin can run against a shop. Approve and
 * re-approve hit the same endpoint; they are separate entries because the
 * wording an admin needs to read differs completely between the two.
 */
export const SHOP_ACTIONS = {
    approve: {
        key: "approve",
        label: "Approve",
        cta: "Approve shop",
        pending: "Approving...",
        icon: CheckCircle2,
        tone: "emerald",
        title: "Approve this shop?",
        description: "The shop goes live on the storefront and its products become orderable.",
        note: "Check the shop name, description and media below — customers see all of it the moment you approve.",
    },
    reapprove: {
        key: "reapprove",
        label: "Re-approve",
        cta: "Re-approve shop",
        pending: "Restoring...",
        icon: RotateCcw,
        tone: "emerald",
        title: "Restore this shop?",
        description: "The shop returns to the storefront and can take orders again.",
        note: "Whatever led to the earlier rejection or suspension should be resolved before you restore it.",
    },
    suspend: {
        key: "suspend",
        label: "Suspend",
        cta: "Suspend shop",
        pending: "Suspending...",
        icon: Ban,
        tone: "amber",
        title: "Suspend this shop?",
        description: "The shop is pulled from the storefront until an admin restores it.",
        note: "Its products stop being orderable straight away. Existing orders are not cancelled by this.",
    },
    reject: {
        key: "reject",
        label: "Reject",
        cta: "Reject shop",
        pending: "Rejecting...",
        icon: XCircle,
        tone: "red",
        reason: true,
        title: "Reject this shop?",
        description:
            "The application is turned down. The reason you write below is shown to the seller.",
    },
};

/* -------------------------------- shop fields ----------------------------- */

export const shopName = (shop) => shop?.shopName || shop?.businessName || "Unnamed shop";

export const addressLine = (shop) =>
    [shop?.address, shop?.city, shop?.state, shop?.pincode].filter(Boolean).join(", ") || "—";

/** Everything the on-page search box is allowed to match against. */
export const shopHaystack = (shop) =>
    [
        shop?.shopName,
        shop?.businessName,
        shop?.businessOwnerName,
        shop?.id,
        shop?.sellerId,
        shop?.mobileNo,
        shop?.city,
        shop?.state,
        shop?.pincode,
        shop?.description,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
