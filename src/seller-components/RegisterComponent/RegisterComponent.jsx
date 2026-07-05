import React from "react";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";

const RegisterComponent = ({
  handleSubmit,
  handleChange,
  handleFileUpload,
  loading,
  handleClose
}) => {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg flex flex-col font-sans text-zinc-950 dark:text-zinc-50">
      
      {/* HEADER */}
      <div className="flex flex-col space-y-1.5 p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Register As a Seller
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your business and banking details below to create your account.
        </p>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* Business Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Business Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="businessName" placeholder="Business Owner Name" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} required />
            <input name="mobileNo" placeholder="Mobile Number" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} required />
            <input name="panNumber" placeholder="PAN Number" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} required />
            <input name="gstNumber" placeholder="GST Number (Optional)" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} />
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex w-full gap-2">
              <input name="idProofUrl" placeholder="ID Proof URL" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} required />
              <button type="button" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-3 shadow-sm" onClick={(e) => handleFileUpload(e, 'idProof')}>
                <FaCloudUploadAlt className="h-4 w-4" />
              </button>
            </div>
            <div className="flex w-full gap-2">
              <input name="panCardUrl" placeholder="PAN Card URL" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" onChange={handleChange} required />
              <button type="button" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-3 shadow-sm" onClick={(e) => handleFileUpload(e, 'panCard')}>
                <FaCloudUploadAlt className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Bank Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="accountHolderName" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="Account Holder Name" onChange={handleChange} required />
            <input name="accountNumber" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="Account Number" onChange={handleChange} required />
            <input name="ifscCode" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="IFSC Code" onChange={handleChange} required />
            <input name="bankName" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="Bank Name" onChange={handleChange} required />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <textarea
              name="address"
              placeholder="Full Address"
              className="flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
              rows={2}
              onChange={handleChange}
              required
            />
            <input name="city" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="City" onChange={handleChange} required />
            <input name="state" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="State" onChange={handleChange} required />
            <input name="pincode" className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300" placeholder="Pincode" onChange={handleChange} required />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 shadow-sm h-9 px-4 py-2 w-full sm:w-auto dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 w-full sm:w-auto disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegisterComponent;