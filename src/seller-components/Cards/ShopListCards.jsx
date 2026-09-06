"use client";

import { useRouter } from "next/navigation";
import { FiShoppingBag, FiExternalLink, FiXCircle } from "react-icons/fi";

const statusStyles = {
  ACTIVE: "bg-blue-100 text-blue-700 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-400 dark:ring-blue-500/20",
  APPROVED: "bg-green-100 text-green-700 ring-green-600/20 dark:bg-green-950 dark:text-green-400 dark:ring-green-500/20",
  PENDING: "bg-yellow-100 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-950 dark:text-yellow-400 dark:ring-yellow-500/20",
  INACTIVE: "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-500/20",
  REJECTED: "bg-red-100 text-red-700 ring-red-600/20 dark:bg-red-950 dark:text-red-400 dark:ring-red-500/20",
  SUSPENDED: "bg-purple-100 text-purple-700 ring-purple-600/20 dark:bg-purple-950 dark:text-purple-400 dark:ring-purple-500/20",
};

const fallbackStatus =
  "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-500/20";

export default function ShopListCards({
  closeShopwithId,
  shopdata,
  closingId,
  setClosingId,
  setRedirectingId,
  redirectingId,
}) {
  const router = useRouter();

  const handleClose = async () => {
    const id = shopdata?.id;
    setClosingId(id);
    closeShopwithId(id);
  };

  const handleRedirect = () => {
    router.push(`/seller/shops/${shopdata?.id}`);
    setRedirectingId(shopdata?.id);
  };

  const isClosing = closingId === shopdata?.id;
  const isRedirect = redirectingId === shopdata?.id;
  const status = shopdata?.status?.trim()?.toUpperCase();

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-zinc-300 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">

      {/* Identity */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <FiShoppingBag className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        </div>

        <div className="min-w-0 space-y-1.5">
          <h3 className="truncate text-base font-semibold tracking-tight">
            {shopdata?.businessName || "Unnamed shop"}
          </h3>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
              statusStyles[status] || fallbackStatus
            }`}
          >
            {status || "UNKNOWN"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:items-center">
        <button
          type="button"
          onClick={handleRedirect}
          disabled={isRedirect}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-yellow-500 px-4 text-sm font-medium whitespace-nowrap text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300"
        >
          <FiExternalLink className="h-4 w-4" />
          {isRedirect ? "Opening…" : "View"}
        </button>

        <button
          type="button"
          onClick={handleClose}
          disabled={isClosing}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white px-4 text-sm font-medium whitespace-nowrap text-red-600 shadow-sm transition-colors hover:bg-red-50 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-red-900/50 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-950/30"
        >
          <FiXCircle className="h-4 w-4" />
          {isClosing ? "Closing…" : "Close"}
        </button>
      </div>
    </div>
  );
}
