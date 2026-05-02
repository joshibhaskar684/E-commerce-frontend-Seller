export default function ShopDataCard({ seller }) {
    const statusStyles = {
        APPROVED: "bg-green-100 text-green-600 border-green-200",
        PENDING: "bg-yellow-100 text-yellow-600 border-yellow-200",
        REJECTED: "bg-red-100 text-red-600 border-red-200",
    };

    return (
        <div className="w-full min-h-screen bg-background px-3 sm:px-6 py-6 flex justify-center">
            
            <div className="w-full max-w-6xl space-y-6">

                {/* HEADER */}
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                    
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                            {seller?.shopName}
                        </h1>
                        <p className="text-sm text-foreground/60 break-all">
                            Seller ID: {seller?.id}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${statusStyles[seller?.status]}`}
                        >
                            {seller?.status}
                        </span>

                        {seller?.ownerStatus && (
                            <span
                                className={`px-3 py-1.5 rounded-lg border text-sm font-semibold ${statusStyles[seller?.ownerStatus]}`}
                            >
                                Owner: {seller?.ownerStatus}
                            </span>
                        )}
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                    {/* SHOP INFO */}
                    <div className="card">
                        <h2 className="card-title">Shop Information</h2>

                        <div className="space-y-2 text-sm">
                            <p><b>Name:</b> {seller?.shopName}</p>
                            <p><b>Description:</b> {seller?.description || "N/A"}</p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                                    ⭐ {seller?.rating ?? 0} Rating
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
                                    {seller?.totalReviews ?? 0} Reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* OWNER INFO */}
                    <div className="card">
                        <h2 className="card-title">Owner Info</h2>

                        <div className="space-y-2 text-sm">
                            <p><b>Name:</b> {seller?.businessOwnerName || "N/A"}</p>
                            <p><b>Mobile:</b> {seller?.mobileNo || "N/A"}</p>
                        </div>
                    </div>

                    {/* MEDIA */}
                    <div className="card md:col-span-2">
                        <h2 className="card-title">Media</h2>

                        <div className="flex flex-wrap gap-3">
                            {seller?.logoUrl && (
                                <a
                                    href={seller.logoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-blue"
                                >
                                    View Logo
                                </a>
                            )}

                            {seller?.bannerUrl && (
                                <a
                                    href={seller.bannerUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-green"
                                >
                                    View Banner
                                </a>
                            )}
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="card md:col-span-2">
                        <h2 className="card-title">Address</h2>

                        <p className="text-sm break-words">
                            {seller?.address}, {seller?.city}, {seller?.state} - {seller?.pincode}
                        </p>
                    </div>

                    {/* REJECTION */}
                    {seller?.status === "REJECTED" && seller?.rejectionReason && (
                        <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5">
                            <h2 className="text-red-500 font-semibold mb-2">
                                Rejection Reason
                            </h2>
                            <p className="text-sm text-red-500 break-words">
                                {seller?.rejectionReason}
                            </p>
                        </div>
                    )}

                    {/* TIMELINE */}
                    <div className="card md:col-span-2">
                        <h2 className="card-title">Timeline</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/70">
                            <p>
                                <b>Created:</b>{" "}
                                {seller?.createdAt
                                    ? new Date(seller.createdAt).toLocaleString()
                                    : "N/A"}
                            </p>
                            <p>
                                <b>Updated:</b>{" "}
                                {seller?.updatedAt
                                    ? new Date(seller.updatedAt).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* REUSABLE TAILWIND CLASSES */}
            <style jsx>{`
                .card {
                    @apply bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition;
                }

                .card-title {
                    @apply text-blue-500 font-semibold mb-3;
                }

                .btn-blue {
                    @apply px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition;
                }

                .btn-green {
                    @apply px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium transition;
                }
            `}</style>
        </div>
    );
}