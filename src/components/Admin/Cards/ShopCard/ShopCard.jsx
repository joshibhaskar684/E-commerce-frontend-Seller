import { Calendar, Store, ArrowRight, Loader2 } from "lucide-react";

export default function ShopCard({ seller, handleViewMore, selectedId }) {
    const isLoading = selectedId === seller.id;
    const statusStyles = {
        APPROVED: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        PENDING: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        REJECTED: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm transition-all hover:shadow-md">
            {/* Header section */}
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between border-b border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        <Store className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
                            {seller.shopName || seller.businessName || "Unnamed Shop"}
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                            ID: {seller.id}
                        </p>
                    </div>
                </div>
                
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-tight uppercase shadow-sm ${statusStyles[seller.status] || "border-zinc-200 text-zinc-950"}`}>
                    {seller.status}
                </span>
            </div>

            {/* Content section */}
            <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col gap-1 rounded-md bg-zinc-50 dark:bg-zinc-900/50 p-3">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            <Calendar className="h-3.5 w-3.5" />
                            Created At
                        </span>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {new Date(seller.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-md bg-zinc-50 dark:bg-zinc-900/50 p-3">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            <Calendar className="h-3.5 w-3.5" />
                            Updated At
                        </span>
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {new Date(seller.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer section */}
            <div className="p-5 pt-0 mt-auto">
                <button
                    disabled={isLoading}
                    onClick={() => handleViewMore(seller.id)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        <>
                            View Details
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}