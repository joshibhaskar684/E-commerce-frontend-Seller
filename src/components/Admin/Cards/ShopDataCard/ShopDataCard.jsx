



export default function ShopDataCard({ seller }) {
    const statusStyles = {
        APPROVED: "bg-green-100 text-green-600",
        PENDING: "bg-yellow-100 text-yellow-600",
        REJECTED: "bg-red-100 text-red-600",
    };

    return (
        <div className="w-full min-h-screen p-6 bg-background text-foreground">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 gap-5">
                <div>
                    <h1 className="text-2xl font-bold">
                        {seller?.shopName}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Seller ID: {seller?.id}
                    </p>
                </div>

                <span
                    className={`px-4 py-2 rounded border font-medium ${statusStyles[seller?.status]}`}
                >
                    {seller?.status}
                </span>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Shop Info */}
                <section className="p-5 border rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Shop Information</h2>

                    <div className="grid gap-3 text-sm">
                        <div><b>Shop Name:</b> {seller?.shopName}</div>
                        <div><b>Description:</b> {seller?.description || "N/A"}</div>
                        <div><b>Rating:</b> {seller?.rating ?? 0}</div>
                        <div><b>Total Reviews:</b> {seller?.totalReviews ?? 0}</div>
                    </div>
                </section>

                {/* Owner Info */}
                <section className="p-5 border rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Owner Info</h2>

                    <div className="grid gap-3 text-sm">
                        <div><b>Owner Name:</b> {seller?.businessOwnerName || "N/A"}</div>
                        <div><b>Mobile:</b> {seller?.mobileNo || "N/A"}</div>
                        <div>
                            <b>Owner Status:</b>{" "}
                            <span className={`px-2 py-1 rounded ${statusStyles[seller?.ownerStatus]}`}>
                                {seller?.ownerStatus}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Media */}
                <section className="p-5 border rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Media</h2>

                    <div className="flex gap-6 text-sm flex-wrap">
                        {seller?.logoUrl && (
                            <a
                                href={seller.logoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Logo
                            </a>
                        )}

                        {seller?.bannerUrl && (
                            <a
                                href={seller.bannerUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Banner
                            </a>
                        )}
                    </div>
                </section>

                {/* Address */}
                <section className="p-5 border rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Address</h2>

                    <p className="text-sm">
                        {seller?.address}, {seller?.city}, {seller?.state} - {seller?.pincode}
                    </p>
                </section>

                {/* Rejection Reason */}
                {seller?.status === "REJECTED" && seller?.rejectionReason && (
                    <section className="p-5 border rounded-xl lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-2 text-red-500">
                            Rejection Reason
                        </h2>
                        <p className="text-sm text-red-500">
                            {seller?.rejectionReason}
                        </p>
                    </section>
                )}

                {/* Timeline */}
                <section className="p-5 border rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Timeline</h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                            <b>Created At:</b>{" "}
                            {seller?.createdAt && new Date(seller.createdAt).toLocaleString()}
                        </div>
                        <div>
                            <b>Updated At:</b>{" "}
                            {seller?.updatedAt && new Date(seller.updatedAt).toLocaleString()}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}