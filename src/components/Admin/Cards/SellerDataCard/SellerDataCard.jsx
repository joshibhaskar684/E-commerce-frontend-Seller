export default function SellerDataCard({ seller }) {
    const statusStyles = {
        APPROVED: "bg-green-100 text-green-600 border-green-200",
        PENDING: "bg-yellow-100 text-yellow-600 border-yellow-200",
        REJECTED: "bg-red-100 text-red-600 border-red-200",
    };

    return (
        <div className="w-full min-h-screen bg-background px-3 sm:px-6 py-6 flex justify-center">
            
            <div className="w-full max-w-5xl space-y-6">

                {/* HEADER CARD */}
                <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                    
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                            {seller?.businessName}
                        </h1>
                        <p className="text-sm text-foreground/60 break-all">
                            Seller ID: {seller?.id}
                        </p>
                    </div>

                    <span
                        className={`px-4 py-2 rounded-lg border text-sm font-semibold w-fit ${statusStyles[seller?.status]}`}
                    >
                        {seller?.status}
                    </span>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

                    {/* CARD TEMPLATE */}
                    {[
                        {
                            title: "Basic Information",
                            content: (
                                <>
                                    <p><b>Mobile:</b> {seller?.mobileNo}</p>
                                    <p><b>PAN Number:</b> {seller?.panNumber}</p>
                                    <p><b>GST Number:</b> {seller?.gstNumber || "N/A"}</p>
                                </>
                            ),
                        },
                        {
                            title: "Bank Details",
                            content: (
                                <>
                                    <p><b>Account Holder:</b> {seller?.accountHolderName}</p>
                                    <p><b>Account Number:</b> {seller?.accountNumber}</p>
                                    <p><b>IFSC Code:</b> {seller?.ifscCode}</p>
                                    <p><b>Bank Name:</b> {seller?.bankName}</p>
                                </>
                            ),
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-blue-500 font-semibold mb-3">
                                {card.title}
                            </h2>
                            <div className="text-sm space-y-2 break-words">
                                {card.content}
                            </div>
                        </div>
                    ))}

                    {/* ADDRESS */}
                    <div className="md:col-span-2 bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-5 shadow-sm">
                        <h2 className="text-blue-500 font-semibold mb-3">
                            Address
                        </h2>
                        <p className="text-sm break-words">
                            {seller?.address}, {seller?.city}, {seller?.state} - {seller?.pincode}
                        </p>
                    </div>

                    {/* DOCUMENTS */}
                    <div className="md:col-span-2 bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-5 shadow-sm">
                        <h2 className="text-blue-500 font-semibold mb-3">
                            Documents
                        </h2>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-sm">
                            {seller?.panCardUrl && (
                                <a
                                    href={seller?.panCardUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition break-all"
                                >
                                    View PAN Card
                                </a>
                            )}

                            {seller?.idProofUrl && (
                                <a
                                    href={seller?.idProofUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition break-all"
                                >
                                    View ID Proof
                                </a>
                            )}
                        </div>
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
                    <div className="md:col-span-2 bg-foreground/5 border border-foreground/10 rounded-2xl p-4 sm:p-5 shadow-sm">
                        <h2 className="text-blue-500 font-semibold mb-3">
                            Timeline
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/70">
                            <p className="break-words">
                                <b>Created:</b>{" "}
                                {seller?.createdAt
                                    ? new Date(seller.createdAt).toLocaleString()
                                    : "N/A"}
                            </p>
                            <p className="break-words">
                                <b>Updated:</b>{" "}
                                {seller?.updatedAt
                                    ? new Date(seller.updatedAt).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}