import { MapPin, Phone, Store, User, FileBadge2, AlertCircle, Star, Calendar } from "lucide-react";

export default function ShopDataCard({ seller }) {
    const statusStyles = {
        APPROVED: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        PENDING: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        REJECTED: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <div className="w-full space-y-6">
            {/* HEADER CARD */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-foreground shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                <div className="min-w-0">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground break-words flex items-center gap-2">
                        <Store className="w-6 h-6 text-zinc-500 shrink-0" />
                        {seller?.shopName}
                    </h1>
                    <div className="flex flex-col gap-1 mt-2 text-sm text-zinc-500 dark:text-zinc-400 break-all">
                        <p>Shop ID: {seller?.id}</p>
                        <p>Seller ID: {seller?.sellerId}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[seller?.status] || "border-zinc-200 text-zinc-950"}`}>
                        {seller?.status}
                    </span>
                    {seller?.ownerStatus && (
                        <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[seller?.ownerStatus] || "border-zinc-200 text-zinc-950"}`}>
                            Owner: {seller?.ownerStatus}
                        </span>
                    )}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SHOP INFO */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6 flex flex-col h-full">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <Store className="w-4 h-4 text-zinc-500" />
                        Shop Information
                    </h2>
                    <div className="space-y-3 text-sm flex-1">
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Name</span>
                            <span className="font-medium text-foreground text-right">{seller?.shopName}</span>
                        </div>
                        <div className="flex flex-col gap-1 pb-2">
                            <span className="text-zinc-500">Description</span>
                            <span className="font-medium text-foreground text-sm">{seller?.description || "No description provided."}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 rounded-md text-xs font-medium border border-yellow-200 dark:border-yellow-900/50">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {seller?.rating ?? 0} Rating
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-md text-xs font-medium border border-green-200 dark:border-green-900/50">
                            {seller?.totalReviews ?? 0} Reviews
                        </span>
                    </div>
                </div>

                {/* OWNER INFO */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6 flex flex-col h-full">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <User className="w-4 h-4 text-zinc-500" />
                        Owner Info
                    </h2>
                    <div className="space-y-3 text-sm flex-1">
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Owner Name</span>
                            <span className="font-medium text-foreground">{seller?.businessOwnerName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Mobile Number</span>
                            <span className="font-medium text-foreground">{seller?.mobileNo || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* ADDRESS */}
                <div className="md:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        Address
                    </h2>
                    <p className="text-sm text-foreground bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
                        {seller?.address}, {seller?.city}, {seller?.state} - {seller?.pincode}
                    </p>
                </div>

                {/* MEDIA DOCUMENTS */}
                <div className="md:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <FileBadge2 className="w-4 h-4 text-zinc-500" />
                        Media Assets
                    </h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm">
                        {seller?.logoUrl && (
                            <a
                                href={seller.logoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
                            >
                                View Logo
                            </a>
                        )}

                        {seller?.bannerUrl && (
                            <a
                                href={seller.bannerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
                            >
                                View Banner
                            </a>
                        )}
                        {!seller?.logoUrl && !seller?.bannerUrl && (
                            <p className="text-zinc-500">No media assets uploaded.</p>
                        )}
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="md:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <Calendar className="w-4 h-4 text-zinc-500" />
                        Timeline
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1 border border-zinc-100 dark:border-zinc-800 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                            <span className="text-zinc-500 font-medium">Created</span>
                            <span className="text-foreground">
                                {seller?.createdAt ? new Date(seller.createdAt).toLocaleString() : "N/A"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 border border-zinc-100 dark:border-zinc-800 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                            <span className="text-zinc-500 font-medium">Updated</span>
                            <span className="text-foreground">
                                {seller?.updatedAt ? new Date(seller.updatedAt).toLocaleString() : "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* REJECTION */}
                {seller?.status === "REJECTED" && seller?.rejectionReason && (
                    <div className="md:col-span-2 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 shadow-sm p-6">
                        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-3 text-red-800 dark:text-red-400">
                            <AlertCircle className="w-4 h-4" />
                            Rejection Reason
                        </h2>
                        <p className="text-sm text-red-600 dark:text-red-300">
                            {seller?.rejectionReason}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}