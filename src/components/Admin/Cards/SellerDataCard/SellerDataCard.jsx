export default function SellerDataCard({ seller }) {
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
                    <h1 className="text-2xl font-bold">{seller?.businessName}</h1>
                    <p className="text-sm text-gray-500">Seller ID: {seller?.id}</p>
                </div>

                <span
                    className={`px-4 py-2 rounded  p-2 border font-medium ${statusStyles[seller?.status]}`}
                >
                    {seller?.status}
                </span>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Basic Info */}
                <section className="p-5 border rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

                    <div className="grid gap-3 text-sm">
                        <div><b>Mobile:</b> {seller?.mobileNo}</div>
                        <div><b>PAN Number:</b> {seller?.panNumber}</div>
                        <div><b>GST Number:</b> {seller?.gstNumber || "N/A"}</div>
                    </div>
                </section>

                {/* Bank Details */}
                <section className="p-5 border rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

                    <div className="grid gap-3 text-sm">
                        <div><b>Account Holder:</b> {seller?.accountHolderName}</div>
                        <div><b>Account Number:</b> {seller?.accountNumber}</div>
                        <div><b>IFSC Code:</b> {seller?.ifscCode}</div>
                        <div><b>Bank Name:</b> {seller?.bankName}</div>
                    </div>
                </section>

                {/* Address */}
                <section className="p-5 border rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Address</h2>

                    <p className="text-sm">
                        {seller?.address}, {seller?.city}, {seller?.state} - {seller?.pincode}
                    </p>
                </section>

                {/* Documents */}
                <section className="p-5 border rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Documents</h2>

                    <div className="flex gap-6 text-sm">
                        {seller?.panCardUrl && (
                            <a
                                href={seller?.panCardUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                View PAN Card
                            </a>
                        )}

                        {seller?.idProofUrl && (
                            <a
                                href={seller?.idProofUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                View ID Proof
                            </a>
                        )}
                    </div>
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
                            {new Date(seller?.createdAt).toLocaleString()}
                        </div>
                        <div>
                            <b>Updated At:</b>{" "}
                            {new Date(seller?.updatedAt).toLocaleString()}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}