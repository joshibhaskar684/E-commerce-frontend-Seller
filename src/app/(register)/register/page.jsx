"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { RegisterSeller } from "@/redux-store/authstore/seller/action";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import RegisterComponent from "@/seller-components/RegisterComponent/RegisterComponent";


export default function SellerForm() {
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e, field) => {  
    e.preventDefault();
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.panNumber) {
      alert("PAN Number is required");
      return;
    }

 
    setLoading(true);


    const token= Cookies.get("verifyToken");
       if(!token){
 toast.error("error! Email Verification Required");
      return;
    }
    try {
      await dispatch(RegisterSeller(form,token));
      console.log("Submitting:", form ,token);
    } catch (error) {
      console.error(error);
      alert("Failed to submit seller");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

 <RegisterComponent
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleFileUpload={handleFileUpload}
      loading={loading}
    />
    
   

    

    </>
  );
}