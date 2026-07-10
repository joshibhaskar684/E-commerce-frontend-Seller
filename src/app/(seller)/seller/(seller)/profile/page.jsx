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

export default function page() {
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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-950 dark:text-zinc-50 overflow-y-auto hide-scrollbar">
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">
          
          {/* User Details Section */}
          <section>
            <UserDetails
              sellerdetails={seller}
              loading={loading}
              setOpenmodal={setOpenmodal}
              setOpenmodal1={setOpenmodal1}
              openModal={openModal}
              openModal1={openModal1}
            />
          </section>

          {/* Divider */}
          <div className="border-t border-zinc-200 dark:border-zinc-800" />

          {/* Shops Section */}
          <section className="space-y-6">
            
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Your Shops</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Approval of shops may require 24–48 hrs. After approval, you can add products.
                </p>
              </div>
              
              <a
                href="/seller/shops/apply"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 shrink-0 w-full sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                Apply for New Shop
              </a>
            </div>

            {/* Shop Cards Grid */}
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
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950/50">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                    You haven't applied for any shops yet.<br/> Click "Apply for New Shop" to get started.
                  </p>
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