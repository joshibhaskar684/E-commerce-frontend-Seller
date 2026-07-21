import { Loader2, Calendar, Clock, Hash } from "lucide-react";

export default function SellerCard({ seller, handleViewMore, selectedId }) {
    const isLoading = selectedId === seller.id;
    
    const statusStyles = {
        APPROVED: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100/80",
        PENDING: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100/80",
        REJECTED: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100/80",
    };

    return (
        <div className="flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-foreground shadow-sm hover:shadow-md transition-shadow">
            
            {/* Header */}
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-lg leading-none tracking-tight">
                        {seller.businessName}
                    </h3>
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${statusStyles[seller.status] || "border-zinc-200 text-zinc-950"}`}>
                        {seller.status}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-6 pt-0 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span className="truncate">Created: {new Date(seller.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="truncate">Updated: {new Date(seller.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                        <Hash className="w-4 h-4 shrink-0" />
                        <span className="truncate">ID: {seller.id}</span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="flex items-center p-6 pt-0 mt-auto">
                <button
                    disabled={isLoading}
                    onClick={() => handleViewMore(seller.id)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2 w-full text-foreground"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading Details...
                        </>
                    ) : (
                        "View Details"
                    )}
                </button>
            </div>
        </div>
    );
}