export default function SellerCard({ seller, handleViewMore, selectedId }) {
    const isLoading = selectedId === seller.id;
const statusStyles = {
    APPROVED: "bg-green-100 text-green-600",
    PENDING: "bg-yellow-100 text-yellow-600",
    REJECTED: "bg-red-100 text-red-600",
};
    return (
        <div className="w-full border border-gray-200 rounded-xl p-5 gap-5 grid grid-cols-1 shadow-sm bg-foreground hover:shadow-md transition">

            {/* Header */}
            <div className="flex justify-between items-center mb-3 gap-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    {seller.businessName}
                </h2>

              <span
    className={` font-medium px-3 py-1  text-background border p-2 ${statusStyles[seller.status] }`}
>
    {seller.status}
</span>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm  text-background">
                <div>
                    <span className="font-medium text-background ">Created:</span>{" "}
                    {new Date(seller.createdAt).toLocaleString()}
                </div>

                <div>
                    <span className="font-medium text-background">Updated:</span>{" "}
                    {new Date(seller.updatedAt).toLocaleString()}
                </div>

                <div className="">
                    <span className="font-medium text-background">Seller ID:</span>{" "}
                    {seller.id}
                </div>
            </div>

            {/* Action */}
            <div className="w-full mt-5">
                <button
                    disabled={isLoading}
                    onClick={() => handleViewMore(seller.id)}
                    className={`w-full py-2 rounded-lg cursor-pointer    font-medium transition ${
  isLoading
    ? 'cursor-not-allowed border-background text-background border'
    : 'bg-blue-500 text-white hover:bg-blue-600'
}`}                >
                    {isLoading ? "Loading..." : "View More"}
                </button>
            </div>

        </div>
    );
}