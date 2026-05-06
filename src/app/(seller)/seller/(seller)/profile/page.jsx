"use client";

import ChangePasswordModal from "@/seller-components/Modals/ChangePasswordModal/ChangePasswordModal";
import UpdateProfileModal from "@/seller-components/Modals/UpdateProfileModal/UpdateProfileModal";
import UserDetails from "@/seller-components/profile-components/UserDetails";
import ShopListCards from "@/seller-components/Cards/ShopListCards";

import Cookies from "js-cookie";

import { getShopListIntro ,closeShopWithId} from "@/redux-store/authstore/shops/action";
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
  } finally {
    setClosingId("");
    // Refresh the page after closing the shop
  }
};

  return (
    <>
      <div className="grid grid-cols-1 p-5 w-full h-full overflow-y-auto hide-scrollbar">
        
        {/* User Details */}
        <div className="w-full mb-20">
          <UserDetails
            sellerdetails={seller}
            loading={loading}
            setOpenmodal={setOpenmodal}
            setOpenmodal1={setOpenmodal1}
            openModal={openModal}
            openModal1={openModal1}
          />
        </div>

        {/* Spacer */}
        <div className="w-full h-[40px] p-10 mt-10" />

        {/* Shops Section */}
        <div className="w-full grid grid-cols-1 gap-5">
          <div className="w-full">
            <h1 className="text-4xl font-bold">Shops</h1>
            <p className="text-xl">
              Approval of shops may require 24–48 hrs. After approval, you can add products.
            </p>
          </div>

          {/* Shop Cards */}
          <div className="w-full grid grid-cols-1 gap-5">
            {shops && shops?.length>0 && shops?.map((item, index) => (
              <ShopListCards
                key={index}
                shopdata={item}
                closeShopwithId={closeShopwithId}
                setClosingId={setClosingId}
                closingId={closingId}
                redirectingId={redirectingId}
                setRedirectingId={setRedirectingId}
              />
            ))}
          </div>

          {/* Apply Shop Button */}
          <div className="w-full grid place-items-center gap-5">
            <a
              className="border p-2 text-center w-full"
              href="/seller/shops/apply"
            >
              Apply for New Shop
            </a>
          </div>
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