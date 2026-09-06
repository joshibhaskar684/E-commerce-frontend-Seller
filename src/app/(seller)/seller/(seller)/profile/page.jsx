"use client";

import ChangePasswordModal from "@/seller-components/Modals/ChangePasswordModal/ChangePasswordModal";
import UpdateProfileModal from "@/seller-components/Modals/UpdateProfileModal/UpdateProfileModal";
import UserDetails from "@/seller-components/profile-components/UserDetails";
import ShopListCards from "@/seller-components/Cards/ShopListCards";

import Cookies from "js-cookie";

import { getShopListIntro, closeShopWithId } from "@/redux-store/authstore/shops/action";
import { getSellerProfile } from "@/redux-store/authstore/seller/action";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FiPlus, FiInbox } from "react-icons/fi";

function ProfileSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex flex-col items-center gap-5 border-b border-zinc-200 p-6 sm:flex-row sm:items-start dark:border-zinc-800">
        <div className="h-20 w-20 shrink-0 rounded-full bg-zinc-200 sm:h-24 sm:w-24 dark:bg-zinc-800" />
        <div className="w-full space-y-3">
          <div className="h-5 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [mobileno, setMobile] = useState("");
  const [name, setName] = useState("");
  const [openModal, setOpenmodal] = useState(false);
  const [openModal1, setOpenmodal1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closingId, setClosingId] = useState("");

  const [redirectingId, setRedirectingId] = useState("");

  const seller = useSelector((state) => state.sellerReducer.sellerdetails);
  const shops = useSelector((state) => state.ShopsReducer.shopsList);
  const profileLoading = useSelector((state) => state.sellerReducer.loading);

  const changePassword = async (e) => {
    e.preventDefault();
  };

  const updateDetails = async (e) => {
    e.preventDefault();
  };

  const getSellerdata = async () => {
    const token = Cookies.get("sellerToken");

    await dispatch(getSellerProfile({ token }));
    await dispatch(getShopListIntro({ token }));
  };

  useEffect(() => {
    getSellerdata();
  }, []);

  const closeShopwithId = async (id) => {
    const token = Cookies.get("sellerToken");

    try {
      await dispatch(closeShopWithId({ id, token }));
    } catch (error) {
      console.error(error);
    } finally {
      setClosingId("");
      // Refresh the page after closing the shop
    }
  };

  return (
    <>
      <div className="hide-scrollbar min-h-screen overflow-y-auto bg-zinc-50 font-sans text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="mx-auto max-w-5xl space-y-8 p-6 md:p-10">

          {/* Page header */}
          <div className="flex flex-col space-y-1.5 border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your seller account details and the shops registered under it.
            </p>
          </div>

          {/* Seller details */}
          <section>
            {profileLoading && !seller ? (
              <ProfileSkeleton />
            ) : (
              <UserDetails
                sellerdetails={seller}
                loading={loading}
                setOpenmodal={setOpenmodal}
                setOpenmodal1={setOpenmodal1}
                openModal={openModal}
                openModal1={openModal1}
              />
            )}
          </section>

          {/* Shops */}
          <section className="space-y-5">

            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tight">Your Shops</h2>
                  {shops?.length > 0 && (
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-zinc-500/20 ring-inset dark:bg-zinc-800 dark:text-zinc-400">
                      {shops.length}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Approval may take 24&ndash;48 hrs. After approval, you can add products.
                </p>
              </div>

              <Link
                href="/seller/shops/apply"
                className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-md bg-zinc-900 px-4 text-sm font-medium whitespace-nowrap text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                <FiPlus className="h-4 w-4" />
                Apply for New Shop
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {shops && shops?.length > 0 ? (
                shops.map((item, index) => (
                  <ShopListCards
                    key={index}
                    shopdata={item}
                    closeShopwithId={closeShopwithId}
                    setClosingId={setClosingId}
                    closingId={closingId}
                    redirectingId={redirectingId}
                    setRedirectingId={setRedirectingId}
                  />
                ))
              ) : (
                <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white p-12 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <FiInbox className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">No shops yet</h3>
                  <p className="mt-1 mb-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    You haven&apos;t applied for any shops yet. Apply to start selling.
                  </p>
                  <Link
                    href="/seller/shops/apply"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-yellow-500 px-4 text-sm font-medium whitespace-nowrap text-zinc-950 shadow-sm transition-colors hover:bg-yellow-400 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none dark:focus-visible:ring-zinc-300"
                  >
                    <FiPlus className="h-4 w-4" />
                    Apply for your first shop
                  </Link>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        oldPassword={oldPassword}
        newPassword={newPassword}
        setOldPassword={setOldPassword}
        setnewPassword={setnewPassword}
        setOpenmodal={setOpenmodal}
        openModal={openModal}
        changePassword={changePassword}
        loading={loading}
      />

      <UpdateProfileModal
        setName={setName}
        name={name}
        setMobile={setMobile}
        mobileno={mobileno}
        setOpenmodal={setOpenmodal1}
        openModal={openModal1}
        updateDetails={updateDetails}
        loading={loading}
      />
    </>
  );
}
