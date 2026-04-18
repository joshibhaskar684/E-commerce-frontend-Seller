"use client";
import ChangePasswordModal from "@/seller-components/Modals/ChangePasswordModal/ChangePasswordModal";
import UpdateProfileModal from "@/seller-components/Modals/UpdateProfileModal/UpdateProfileModal";
import UserDetails from "@/seller-components/profile-components/UserDetails";

import Cookies from "js-cookie";

import {getShopListIntro } from "@/redux-store/authstore/shops/action";
import {getSellerProfile } from "@/redux-store/authstore/seller/action";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopListCards from "@/seller-components/Cards/ShopListCards";



export default function page () {
    
       const dispatch=useDispatch();   

    const [oldPassword, setOldPassword] = useState('');
         const [newPassword, setnewPassword] = useState('');
         const [mobileno, setMobile] = useState('');
         const [name, setName] = useState('');
         const [openModal, setOpenmodal] = useState(false);
    const [openModal1, setOpenmodal1] = useState(false);
        const [loading, setLoading] = useState(false);
        
    const seller=useSelector((state)=>state.sellerReducer.sellerdetails);
    
    const shops=useSelector((state)=>state.ShopsReducer.Shopsdetails);


    const changePassword=async(e)=>{
        e.preventDefault();

    }
    const updateDetails=async(e)=>{
        e.preventDefault();

    }
     
const getSellerdata=async()=>{
          const token = Cookies.get("sellerToken");
          console.log(token,"token");
         await dispatch(getSellerProfile({token}));
         await dispatch(getShopListIntro({token}));
}


 useEffect(()=>{
getSellerdata();
    },[]
    );


         return (
        <>
            <div className="grid grid-cols-1 p-5 h-full ">
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

                   <div className="h-[40px] p-10 h-full w-full mt-30"></div>
                   <div className="w-full grid grid-cols-1 gap-5">
                    <div className="w-full">
                        <h1 className="text-2xl text-4xl font-bold">
                            Shops
                        </h1>
<p className="text-2xl ">Approval of shops may required 24-48 hr and after Approval you can only add product etc .</p>
                    </div>
                    <div className="w-full">


                        <ShopListCards shopdata={shops} closeShopwithId={closeShopwithId}/>
                        
                    </div>
                    
<div className="w-full grid grid-cols-1  place-items-center gap-5">
                        <a className="border p-2 text-center w-full " href="/seller/shops/apply">Apply for  New Shop </a>
                         
                    </div>

                   </div>

            </div>
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
    )
}