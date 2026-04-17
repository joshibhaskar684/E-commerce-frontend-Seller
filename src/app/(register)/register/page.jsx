"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { RegisterSeller } from "@/redux-store/authstore/seller/action";

import { toast } from "react-toastify";
import Cookies from "js-cookie";


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

    
    <div className="w-full bg-foreground border  grid grid-cols-1 gap-5 p-5 ">
         
          <div className="w-full">
 <h1 className="text-3xl font-bold text-background mb-8 w-full">
          Register As a Seller
        </h1>
        </div>
       
        

         <form onSubmit={handleSubmit} className="space-y-8">

<div className="w-full p-5">
  <h2 className="text-lg font-semibold text-background mb-4">
              Business Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="businessName" placeholder="Business Owner Name" className="p-5 border text-background text-lg rounded" onChange={handleChange} required />
              <input name="mobileNo" placeholder="Mobile Number" className="p-5 border text-background  text-lg rounded" onChange={handleChange} required />
              <input name="panNumber" placeholder="PAN Number" className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
              <input name="gstNumber" placeholder="GST Number (Optional)" className="p-5 border text-lg  text-background rounded" onChange={handleChange} />
            </div>
        </div>
        
<div className="w-full p-5">
  <h2 className="text-lg font-semibold text-background mb-4">
               Documents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="w-full flex gap-5">
                <input name="idProofUrl" placeholder="ID Proof URL" className="p-5 border  text-lg  text-background rounded w-full" onChange={handleChange} required />
              <button className=" border rounded-lg" onClick={handleFileUpload} type="button" >   <FaCloudUploadAlt className="text-4xl text-background mb-2" /> </button>
              </div>
              <div className="w-full flex gap-5">
                 <input name="panCardUrl" placeholder="PAN Card URL" className="p-5 w-full text-lg  border text-background rounded" onChange={handleChange} required />
            <button className=" border rounded p-2" onClick={handleFileUpload} type="button" >   <FaCloudUploadAlt className="text-6xl  text-background " /> </button>
              </div>
               </div>
        </div>
       
<div className="w-full p-5">
  <h2 className="text-lg font-semibold text-background mb-4">
              Bank Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="accountHolderName" placeholder="Account Holder Name" className="p-5 border text-lg  text-background rounded" onChange={handleChange} required />
              <input  name="accountNumber" placeholder="Account Number" className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
              <input name="ifscCode" placeholder="IFSC Code" className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
              <input name="bankName" placeholder="Bank Name"  className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
             
              </div>
        </div>

<div className="w-full p-5">
  <h2 className="text-lg font-semibold text-background mb-4">
               Address
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
             <textarea
  name="address"
  placeholder="Full Address"
  className="p-5 border text-background text-lg rounded w-full resize-none"
  rows={2}
  onChange={handleChange}
  required
/>
  <input  name="city" placeholder="City"  className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
              <input name="state" placeholder="State" className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
              <input  name="pincode" placeholder="Pincode"  className="p-5 border text-background text-lg  rounded" onChange={handleChange} required />
             
              </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
         <button
            type="submit"
            disabled={loading}
            className={`w-full p-5 bg-background text-foreground cursor-pointer hover:bg-yellow-500 text-xl text-gray-900 font-semibold py-4 rounded-xl transition duration-200 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Register"}
          </button>


          <a href="/" className="text-background p-5 flex gap-5 items-center justify-center border font-bold text-xl rounded"> <FaArrowLeft className="text-background text-2xl" /> Back </a>
          </div>
         </form>
        </div>

    

    </>
  );
}