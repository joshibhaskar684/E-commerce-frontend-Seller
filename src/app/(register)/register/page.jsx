"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterSeller, getSellerApplications } from "@/redux-store/authstore/seller/action";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import RegisterComponent from "@/seller-components/RegisterComponent/RegisterComponent";
import { Loader2, RefreshCw, FileText, CheckCircle2, Clock, AlertCircle, ShieldAlert } from "lucide-react";

export default function SellerForm() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { sellerApplications = [], loading: applicationsLoading } = useSelector(
    (state) => state.sellerReducer || {}
  );

  const [form, setForm] = useState({
    businessName: "",
    mobileNo: "",
    panNumber: "",
    gstNumber: "",
    idProofUrl: "",
    panCardUrl: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadApplications = useCallback(async (showToast = false) => {
    const token = Cookies.get("verifyToken") || Cookies.get("sellerToken") || Cookies.get("usertoken");
    if (!token) {
      return;
    }
    if (showToast) setRefreshing(true);
    await dispatch(getSellerApplications(token));
    if (showToast) {
      setRefreshing(false);
      toast.info("Applications refreshed");
    }
  }, [dispatch]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e, field) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.panNumber) {
      toast.warn("PAN Number is required to register as a seller.");
      return;
    }

    setLoading(true);

    const token = Cookies.get("verifyToken") || Cookies.get("sellerToken") || Cookies.get("usertoken");
    if (!token) {
      toast.error("Email verification is required before seller registration.");
      setLoading(false);
      return;
    }
    
    try {
      const res = await dispatch(RegisterSeller(form, token));
      if (res?.success) {
        handleClose();
        // Reset form
        setForm({
          businessName: "",
          mobileNo: "",
          panNumber: "",
          gstNumber: "",
          idProofUrl: "",
          panCardUrl: "",
          accountHolderName: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
        // Immediately reload real applications
        loadApplications();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return String(dateStr);
    }
  };

  const renderStatusBadge = (status) => {
    const s = String(status || "").toUpperCase();
    if (s === "APPROVED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Approved
        </span>
      );
    }
    if (s === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-950/40 dark:text-yellow-400">
          <Clock className="h-3.5 w-3.5" />
          Pending
        </span>
      );
    }
    if (s === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5" />
          Rejected
        </span>
      );
    }
    if (s === "SUSPENDED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400">
          <ShieldAlert className="h-3.5 w-3.5" />
          Suspended
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        {status || "Unknown"}
      </span>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans text-zinc-950 dark:text-zinc-50">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Seller Registration</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Track your seller account applications and submit new requests.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => loadApplications(true)}
                disabled={applicationsLoading || refreshing}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
                title="Refresh applications"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing || applicationsLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleOpen}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Real Data Applications Table Section */}
          <div className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold leading-none tracking-tight">Previous Registration Requests</h3>
              {Array.isArray(sellerApplications) && sellerApplications.length > 0 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {sellerApplications.length} {sellerApplications.length === 1 ? "application" : "applications"}
                </span>
              )}
            </div>

            {applicationsLoading && (!sellerApplications || sellerApplications.length === 0) ? (
              <div className="p-12 flex flex-col items-center justify-center gap-3 text-zinc-500">
                <Loader2 className="h-6 w-6 animate-spin text-yellow-500" />
                <span className="text-sm">Loading applications...</span>
              </div>
            ) : !Array.isArray(sellerApplications) || sellerApplications.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-zinc-400" />
                </div>
                <h4 className="font-medium text-base text-foreground">No applications found</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm">
                  You haven't submitted any seller applications yet. Click "Apply Now" to get started selling on Quick.
                </p>
                <button
                  onClick={handleOpen}
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold px-4 py-2 text-sm transition-colors cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              <div className="p-0 overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b border-zinc-200 dark:border-zinc-800">
                    <tr className="border-b transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                      <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Application ID</th>
                      <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Date Applied</th>
                      <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                      <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Remarks / Reason</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {sellerApplications.map((req, idx) => (
                      <tr
                        key={req.applicationId || idx}
                        className="transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                      >
                        <td className="p-6 align-middle font-medium">
                          #{req.applicationId || "N/A"}
                        </td>
                        <td className="p-6 align-middle text-zinc-600 dark:text-zinc-300">
                          {formatDate(req.submissionDate)}
                        </td>
                        <td className="p-6 align-middle">
                          {renderStatusBadge(req.status)}
                        </td>
                        <td className="p-6 align-middle text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
                          {req.reason ? (
                            <span className={req.status?.toUpperCase() === "REJECTED" ? "text-red-600 dark:text-red-400" : ""}>
                              {req.reason}
                            </span>
                          ) : (
                            <span className="text-zinc-400 italic">No notes provided</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 py-10 sm:p-6">
            <div className="w-full max-w-3xl bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg relative mx-auto transition-all duration-300">
              <RegisterComponent
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFileUpload={handleFileUpload}
                loading={loading}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
