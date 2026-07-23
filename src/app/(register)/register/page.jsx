"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterSeller } from "@/redux-store/authstore/seller/action";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import RegisterComponent from "@/seller-components/RegisterComponent/RegisterComponent";

const dummyRequests = [
  { id: "REQ-0982", date: "2026-06-12", status: "Approved" },
  { id: "REQ-1045", date: "2026-07-01", status: "Pending" },
  { id: "REQ-1050", date: "2026-07-04", status: "Rejected" },
];

export default function SellerForm() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
      alert("PAN Number is required");
      return;
    }

    setLoading(true);

    const token = Cookies.get("verifyToken");
    if (!token) {
      toast.error("Error! Email Verification Required");
      setLoading(false);
      return;
    }
    
    try {
      await dispatch(RegisterSeller(form, token));
      console.log("Submitting:", form, token);
      handleClose(); // Optionally close modal on success
    } catch (error) {
      console.error(error);
      alert("Failed to submit seller");
    } finally {
      setLoading(false);
    }
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
                Manage your seller account applications and register for new access.
              </p>
            </div>
            <button
              onClick={handleOpen}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
            >
              Apply Now
            </button>
          </div>

          {/* Dummy Data Table Section (Shadcn Card/Table styling) */}
          <div className="rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 overflow-hidden">
            <div className="flex flex-col space-y-1.5 p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold leading-none tracking-tight">Previous Registration Requests</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b border-zinc-200 dark:border-zinc-800">
                  <tr className="border-b transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                    <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Request ID</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Date Applied</th>
                    <th className="h-12 px-6 text-left align-middle font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {dummyRequests.map((req) => (
                    <tr key={req.id} className="border-b border-zinc-200 dark:border-zinc-800 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
                      <td className="p-6 align-middle font-medium">{req.id}</td>
                      <td className="p-6 align-middle">{req.date}</td>
                      <td className="p-6 align-middle">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 ${
                            req.status === "Approved"
                              ? "border-transparent bg-green-100 text-green-900 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400"
                              : req.status === "Pending"
                              ? "border-transparent bg-yellow-100 text-yellow-900 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "border-transparent bg-red-100 text-red-900 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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