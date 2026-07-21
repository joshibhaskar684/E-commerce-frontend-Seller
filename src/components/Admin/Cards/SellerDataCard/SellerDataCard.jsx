import { MapPin, Phone, CreditCard, FileText, FileBadge2, AlertCircle } from "lucide-react";

export default function SellerDataCard({ seller }) {
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
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground break-words">
                        {seller?.businessName}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 break-all">
                        Seller ID: {seller?.id}
                    </p>
                </div>
                <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[seller?.status] || "border-zinc-200 text-zinc-950"}`}>
                    {seller?.status}
                </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Basic Information */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <FileText className="w-4 h-4 text-zinc-500" />
                        Basic Information
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Mobile</span>
                            <span className="font-medium text-foreground">{seller?.mobileNo}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">PAN Number</span>
                            <span className="font-medium text-foreground">{seller?.panNumber}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                            <span className="text-zinc-500">GST Number</span>
                            <span className="font-medium text-foreground">{seller?.gstNumber || "N/A"}</span>
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <CreditCard className="w-4 h-4 text-zinc-500" />
                        Bank Details
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Account Holder</span>
                            <span className="font-medium text-foreground">{seller?.accountHolderName}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">Account Number</span>
                            <span className="font-medium text-foreground">{seller?.accountNumber}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <span className="text-zinc-500">IFSC Code</span>
                            <span className="font-medium text-foreground">{seller?.ifscCode}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                            <span className="text-zinc-500">Bank Name</span>
                            <span className="font-medium text-foreground">{seller?.bankName}</span>
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

                {/* DOCUMENTS */}
                <div className="md:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background shadow-sm p-6">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
                        <FileBadge2 className="w-4 h-4 text-zinc-500" />
                        Documents
                    </h2>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm">
                        {seller?.panCardUrl && (
                            <a
                                href={seller?.panCardUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
                            >
                                View PAN Card
                            </a>
                        )}

                        {seller?.idProofUrl && (
                            <a
                                href={seller?.idProofUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
                            >
                                View ID Proof
                            </a>
                        )}
                        {!seller?.panCardUrl && !seller?.idProofUrl && (
                            <p className="text-zinc-500">No documents uploaded.</p>
                        )}
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