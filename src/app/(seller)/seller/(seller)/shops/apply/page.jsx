"use client";

import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CreateShop ,Request2Shop} from "@/redux-store/authstore/shops/action"; 

export default function ShopForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const [loading1, setLoading1] = useState(false);

  const [form, setForm] = useState({
    shopName: "",
    description: "",
    logoUrl: "",
    bannerUrl: "",
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

  const handleFileUpload = (e) => {
    e.preventDefault();
    // TODO: implement upload logic (Cloudinary / S3 etc.)
    toast.info("Upload feature coming soon");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.shopName) {
      toast.error("Shop Name is required");
      return;
    }

    const token = Cookies.get("sellerToken");
    if (!token) {
      toast.error("Seller Login Required");
      return;
    }

    setLoading(true);

    try {

      await dispatch(CreateShop(form, token));


    } catch (error) {
      console.error(error);
      toast.error("Failed to create shop");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit1 = async () => {
  
    if (!form.shopName) {
      toast.error("Shop Name is required");
      return;
    }

    const token = Cookies.get("sellerToken");
    if (!token) {
      toast.error("Seller Login Required");
      return;
    }

    setLoading1(true);

    try {

      await dispatch(Request2Shop(form, token));


    } catch (error) {
      console.error(error);
      toast.error("Failed to Request shop");
    } finally {
      setLoading1(false);
    }
  };


  return (
    <div className="w-full bg-background  grid grid-cols-1 gap-15 p-5">
      
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Create Your Shop
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Shop Info */}
        <div className="w-full p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Shop Information
          </h2>

          <div className="grid  gap-4">
            <input
              name="shopName"
              placeholder="Shop Name"
              className="p-5 border text-foreground text-lg rounded"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Shop Description"
              className="p-5 border text-foreground text-lg rounded col-span-2 resize-none"
              rows={3}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Media Upload */}
        <div className="w-full p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Shop Media
          </h2>

          <div className="grid  gap-4">

            <div className="flex gap-3">
              <input
                name="logoUrl"
                placeholder="Logo URL"
                className="p-5 border text-foreground text-lg rounded w-full"
                onChange={handleChange}
              />
              <button type="button" onClick={handleFileUpload} className="border p-5 rounded">
                <FaCloudUploadAlt className="text-3xl text-foreground" />
              </button>
            </div>

            <div className="flex gap-3">
              <input
                name="bannerUrl"
                placeholder="Banner URL"
                className="p-5 border text-foreground text-lg rounded w-full"
                onChange={handleChange}
              />
              <button type="button" onClick={handleFileUpload} className="border p-5 rounded">
                <FaCloudUploadAlt className="text-3xl text-foreground" />
              </button>
            </div>

          </div>
        </div>

        {/* Address */}
        <div className="w-full p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Shop Address
          </h2>

          <div className="grid  gap-4">
            <textarea
              name="address"
              placeholder="Full Address"
              className="p-5 border text-foreground text-lg rounded resize-none col-span-2"
              rows={2}
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="City"
              className="p-5 border text-foreground text-lg rounded"
              onChange={handleChange}
              required
            />

            <input
              name="state"
              placeholder="State"
              className="p-5 border text-foreground text-lg rounded"
              onChange={handleChange}
              required
            />

            <input
              name="pincode"
              placeholder="Pincode"
              className="p-5 border text-foreground text-lg rounded"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid w-full gap-5 p-5">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-5 bg-background border cursor-pointer border-foreground text-foreground text-xl font-semibold rounded transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
            }`}
          >
            {loading ? "Submitting..." : "Create Shop"}
          </button>

<button
            type="button"
            onClick={()=>handleSubmit1()}
            disabled={loading1}
            className={`w-full p-5 bg-background border cursor-pointer border-foreground text-foreground text-xl font-semibold rounded transition ${
              loading1 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
            }`}
          >
            {loading1 ? "Submitting..." : "Request For Other Shop"}
          </button>
         
        </div>
      </form>
    </div>
  );
}