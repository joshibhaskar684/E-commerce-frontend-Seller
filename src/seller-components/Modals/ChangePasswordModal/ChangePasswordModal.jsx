"use client";

import { Modal } from "@mui/material";
import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export default function ChangePasswordModal({
  oldPassword,
  newPassword,
  setOldPassword,
  setnewPassword,
  setOpenmodal,
  openModal,
  changePassword,
  loading,
}) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleClose = () => {
    setOpenmodal(openModal ? false : true);
  };

  const inputClass =
    "h-10 w-full rounded-md border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-950 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-300";

  const toggleClass =
    "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300";

  return (
    <Modal open={openModal} onClose={handleClose}>
      <div className="flex h-full w-full items-center justify-center overflow-y-auto bg-zinc-950/60 p-4 backdrop-blur-sm">
        <div className="my-auto w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex items-start gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <FiLock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div className="min-w-0 space-y-1">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Update Password
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Both fields are required to change your password.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => changePassword(e)} className="space-y-5 p-6">

            <div className="space-y-2">
              <label
                htmlFor="oldPassword"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Current password
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={showOld ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowOld((v) => !v)}
                  aria-label={showOld ? "Hide password" : "Show password"}
                  className={toggleClass}
                >
                  {showOld ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  required
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  aria-label={showNew ? "Hide password" : "Show password"}
                  className={toggleClass}
                >
                  {showNew ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/50">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                You will need to sign in again on other devices after changing your password.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium whitespace-nowrap text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:flex-1 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                {loading ? "Submitting…" : "Update password"}
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
