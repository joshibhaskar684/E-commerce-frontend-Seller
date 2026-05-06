import { FaUser } from "react-icons/fa";

export default function SellerDetails({
  sellerdetails,
  openModal,
  openModal1,
  setOpenmodal,
  setOpenmodal1,
  loading
}) {

  const statusColors = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-600",
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  const status = sellerdetails?.status?.toUpperCase();

  return (
    <div className="w-full bg-background text-foreground rounded-2xl border shadow-sm p-4 sm:p-6 space-y-6 overflow-hidden">

      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">

        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUser className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">

          <h2 className="text-base sm:text-lg font-semibold truncate">
            {sellerdetails?.businessName || "Business Name"}
          </h2>

          <p className="text-sm text-muted-foreground break-words">
            {sellerdetails?.sellerEmail || "-"}
          </p>

          <p className="text-sm break-words">
            {sellerdetails?.mobileNo || "-"}
          </p>

          {/* Status */}
          <div>
            <span className={`inline-block text-xs px-3 py-1 rounded-full ${statusColors[status]}`}>
              {status || "UNKNOWN"}
            </span>
          </div>

        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

        {[
          { label: "Address", value: sellerdetails?.address },
          { label: "City", value: sellerdetails?.city },
          { label: "State", value: sellerdetails?.state },
          { label: "Pincode", value: sellerdetails?.pincode },
        ].map((item, i) => (
          <div key={i} className="min-w-0">
            <p className="text-muted-foreground text-xs">{item.label}</p>
            <p className="font-medium break-words">{item.value || "-"}</p>
          </div>
        ))}

        {/* Created At */}
        <div className="sm:col-span-2 min-w-0">
          <p className="text-muted-foreground text-xs">Created At</p>
          <p className="font-medium break-words">
            {sellerdetails?.createdAt
              ? new Date(sellerdetails.createdAt).toLocaleString()
              : "-"}
          </p>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3">

        <button
          disabled={loading && openModal1}
          onClick={() => setOpenmodal1(!openModal1)}
          className="w-full sm:flex-1 px-4 py-3 rounded-xl font-medium transition
          bg-yellow-400 text-black hover:bg-yellow-300 active:scale-[0.98]"
        >
          Edit Profile
        </button>

        <button
          onClick={() => setOpenmodal(!openModal)}
          disabled={loading && openModal}
          className="w-full sm:flex-1 px-4 py-3 rounded-xl font-medium transition
          bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}