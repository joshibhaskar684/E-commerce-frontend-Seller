"use client";

import { Modal } from "@mui/material";
import { FiEdit3, FiAlertCircle } from "react-icons/fi";

export default function UpdateProfileModal({
  setName,
  name,
  setMobile,
  mobileno,
  setOpenmodal,
  loading,
  openModal,
  updateDetails,
}) {
  const handleClose = () => {
    setOpenmodal(openModal ? false : true);
  };

  const inputClass =
    "h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-300";

  return (
    <Modal open={openModal} onClose={handleClose}>
      <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-zinc-950/60 p-4 backdrop-blur-sm">
        <div className="my-auto w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex items-start gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <FiEdit3 className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div className="min-w-0 space-y-1">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Update Profile Details
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Only your name and mobile number can be changed.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => updateDetails(e)} className="space-y-5 p-6">

            <div className="space-y-2">
              <label
                htmlFor="profileName"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Name
              </label>
              <input
                id="profileName"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profileMobile"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Mobile number
              </label>
              <input
                id="profileMobile"
                name="mobileno"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter your mobile number"
                required
                value={mobileno}
                onChange={(e) => setMobile(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-start gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/50">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Both fields are submitted together. Leave a field at its current value if you
                do not want to change it.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium whitespace-nowrap text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:flex-1 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                {loading ? "Submitting…" : "Save changes"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium whitespace-nowrap text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none sm:flex-1 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
