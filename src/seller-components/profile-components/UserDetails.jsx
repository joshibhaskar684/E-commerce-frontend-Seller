import { FaUser } from "react-icons/fa";
import { FiEdit3, FiLock, FiMail, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700 ring-green-600/20 dark:bg-green-950 dark:text-green-400 dark:ring-green-500/20",
  APPROVED: "bg-blue-100 text-blue-700 ring-blue-600/20 dark:bg-blue-950 dark:text-blue-400 dark:ring-blue-500/20",
  PENDING: "bg-yellow-100 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-950 dark:text-yellow-400 dark:ring-yellow-500/20",
  INACTIVE: "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-500/20",
  REJECTED: "bg-red-100 text-red-700 ring-red-600/20 dark:bg-red-950 dark:text-red-400 dark:ring-red-500/20",
  SUSPENDED: "bg-purple-100 text-purple-700 ring-purple-600/20 dark:bg-purple-950 dark:text-purple-400 dark:ring-purple-500/20",
};

const fallbackStatus =
  "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-500/20";

function Field({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {label}
      </p>
      <p className="break-words text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {value || "—"}
      </p>
    </div>
  );
}

export default function SellerDetails({
  sellerdetails,
  openModal,
  openModal1,
  setOpenmodal,
  setOpenmodal1,
  loading,
}) {
  const status = sellerdetails?.status?.trim()?.toUpperCase();

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">

      {/* Identity header */}
      <div className="flex flex-col items-center gap-5 border-b border-zinc-200 p-6 sm:flex-row sm:items-start dark:border-zinc-800">

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20 sm:h-24 sm:w-24">
          <FaUser className="h-8 w-8 text-yellow-600 sm:h-10 sm:w-10 dark:text-yellow-500" />
        </div>

        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
            <h2 className="truncate text-xl font-semibold tracking-tight">
              {sellerdetails?.businessName || "Business Name"}
            </h2>
            <span
              className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                statusStyles[status] || fallbackStatus
              }`}
            >
              {status || "UNKNOWN"}
            </span>
          </div>

          <div className="space-y-1">
            <p className="flex items-center justify-center gap-1.5 text-sm break-all text-zinc-500 sm:justify-start dark:text-zinc-400">
              <FiMail className="h-3.5 w-3.5 shrink-0" />
              {sellerdetails?.sellerEmail || "—"}
            </p>
            <p className="flex items-center justify-center gap-1.5 text-sm break-all text-zinc-500 sm:justify-start dark:text-zinc-400">
              <FiPhone className="h-3.5 w-3.5 shrink-0" />
              {sellerdetails?.mobileNo || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
        <Field icon={FiMapPin} label="Address" value={sellerdetails?.address} />
        <Field icon={FiMapPin} label="City" value={sellerdetails?.city} />
        <Field icon={FiMapPin} label="State" value={sellerdetails?.state} />
        <Field icon={FiMapPin} label="Pincode" value={sellerdetails?.pincode} />
        <div className="sm:col-span-2">
          <Field
            icon={FiCalendar}
            label="Created At"
            value={
              sellerdetails?.createdAt
                ? new Date(sellerdetails.createdAt).toLocaleString()
                : null
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50/50 p-6 sm:flex-row dark:border-zinc-800 dark:bg-zinc-950/30">
        <button
          type="button"
          disabled={loading && openModal1}
          onClick={() => setOpenmodal1(!openModal1)}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 text-sm font-medium whitespace-nowrap text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:flex-1 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
        >
          <FiEdit3 className="h-4 w-4" />
          Edit Profile
        </button>

        <button
          type="button"
          onClick={() => setOpenmodal(!openModal)}
          disabled={loading && openModal}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:flex-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-300"
        >
          <FiLock className="h-4 w-4" />
          Change Password
        </button>
      </div>
    </div>
  );
}
