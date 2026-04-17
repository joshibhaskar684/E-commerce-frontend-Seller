"use client";
import ChangePasswordModal from "@/seller-components/Modals/ChangePasswordModal/ChangePasswordModal";
import UpdateProfileModal from "@/seller-components/Modals/UpdateProfileModal/UpdateProfileModal";
import UserDetails from "@/seller-components/profile-components/UserDetails";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function page () {

    const [oldPassword, setOldPassword] = useState('');
         const [newPassword, setnewPassword] = useState('');
         const [mobileno, setMobile] = useState('');
         const [name, setName] = useState('');
         const [openModal, setOpenmodal] = useState(false);
    const [openModal1, setOpenmodal1] = useState(false);
        const [loading, setLoading] = useState(false);
        

    const changePassword=async(e)=>{
        e.preventDefault();

    }
    const updateDetails=async(e)=>{
        e.preventDefault();

    }
         return (
        <>
            <div className="grid grid-cols-1 p-5 ">
<div className="w-full mb-20">
               <UserDetails 
                name={"Bhaskar"} 
                phone={"6395653472"}
                 email={"email@email.com"}
                  loading={loading} 
                  setOpenmodal={setOpenmodal}
                   setOpenmodal1={setOpenmodal1} 
                   openModal={openModal}
                   openModal1={openModal1}
                   />

                   </div>
                   <div className="w-full grid grid-cols-1 gap-5">
                    <div className="w-full">
                        <h1 className="text-2xl text-4xl font-bold">
                            Shops
                        </h1>
<p className="text-2xl ">Approval of shops may required 24-48 hr and after Approval you can only add product etc .</p>
                    </div>
                    <div className="w-full">
                        
                    </div>
                    
<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                        <a className="border p-2 text-center " href="/seller/shops/apply">Apply for  New Shop </a>
                         <button className="border p-2">Close Shop </button>
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