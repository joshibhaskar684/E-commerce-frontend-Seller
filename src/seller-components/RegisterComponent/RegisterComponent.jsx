import React from "react";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";

const RegisterComponent = ({
  handleSubmit,
  handleChange,
  handleFileUpload,
  loading,
}) => {
  return (
    <div className="w-full min-h-screen bg-background flex justify-center px-3 sm:px-5 md:px-8 py-6">
      
      <div className="w-full max-w-5xl bg-foreground/5 border border-foreground/10 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 overflow-hidden">
        
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Register As a Seller
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Business Info */}
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-foreground/10">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Business Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="businessName" placeholder="Business Owner Name" className="input" onChange={handleChange} required />
              <input name="mobileNo" placeholder="Mobile Number" className="input" onChange={handleChange} required />
              <input name="panNumber" placeholder="PAN Number" className="input" onChange={handleChange} required />
              <input name="gstNumber" placeholder="GST Number (Optional)" className="input" onChange={handleChange} />
            </div>
          </div>

          {/* Documents */}
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-foreground/10">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Documents
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="flex w-full gap-2">
                <input name="idProofUrl" placeholder="ID Proof URL" className="input flex-1 min-w-0" onChange={handleChange} required />
                <button type="button" className="upload-btn shrink-0" onClick={handleFileUpload}>
                  <FaCloudUploadAlt />
                </button>
              </div>

              <div className="flex w-full gap-2">
                <input name="panCardUrl" placeholder="PAN Card URL" className="input flex-1 min-w-0" onChange={handleChange} required />
                <button type="button" className="upload-btn shrink-0" onClick={handleFileUpload}>
                  <FaCloudUploadAlt />
                </button>
              </div>

            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-foreground/10">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Bank Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="accountHolderName" className="input" placeholder="Account Holder Name" onChange={handleChange} required />
              <input name="accountNumber" className="input" placeholder="Account Number" onChange={handleChange} required />
              <input name="ifscCode" className="input" placeholder="IFSC Code" onChange={handleChange} required />
              <input name="bankName" className="input" placeholder="Bank Name" onChange={handleChange} required />
            </div>
          </div>

          {/* Address */}
          <div className="bg-background rounded-xl p-4 sm:p-5 border border-foreground/10">
            <h2 className="text-lg font-semibold text-blue-500 mb-4">
              Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <textarea
                name="address"
                placeholder="Full Address"
                className="input sm:col-span-2 "
                rows={3}
                onChange={handleChange}
                required
              />
              <input name="city" className="input" placeholder="City" onChange={handleChange} required />
              <input name="state" className="input" placeholder="State" onChange={handleChange} required />
              <input name="pincode" className="input sm:col-span-2" placeholder="Pincode" onChange={handleChange} required />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                loading
                  ? "bg-yellow-400 opacity-50 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-300 text-black"
              }`}
            >
              {loading ? "Submitting..." : "Register"}
            </button>

            <a
              href="/"
              className="flex items-center justify-center gap-2 border border-foreground/20 py-3 rounded-xl text-foreground hover:bg-foreground/5"
            >
              <FaArrowLeft />
              Back
            </a>
          </div>

        </form>
      </div>

      {/* Tailwind Utility Classes */}
      <style jsx>{`
        .input {
          @apply w-full px-3 py-2 rounded-lg border border-foreground/20 bg-transparent text-foreground text-sm outline-none focus:ring-2 focus:ring-blue-400;
        }

        .upload-btn {
          @apply flex items-center justify-center px-3 rounded-lg bg-green-500 text-white hover:bg-green-600;
        }
      `}</style>
    </div>
  );
};

export default RegisterComponent;