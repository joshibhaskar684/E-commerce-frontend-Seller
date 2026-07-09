"use client";

import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CreateShop, Request2Shop } from "@/redux-store/authstore/shops/action";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans text-zinc-950 dark:text-zinc-50">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Card Wrapper */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col space-y-1.5 p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">
              Create Your Shop
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Fill in the details below to set up your new storefront or request access.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6 space-y-8">
              
              {/* Shop Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Shop Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    name="shopName"
                    placeholder="Shop Name"
                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Shop Description"
                    className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 resize-none dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    rows={3}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Shop Media
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex w-full gap-2">
                    <input
                      name="logoUrl"
                      placeholder="Logo URL"
                      className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 shadow-sm h-9 px-3 shrink-0 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <FaCloudUploadAlt className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex w-full gap-2">
                    <input
                      name="bannerUrl"
                      placeholder="Banner URL"
                      className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 shadow-sm h-9 px-3 shrink-0 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    >
                      <FaCloudUploadAlt className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Shop Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <textarea
                    name="address"
                    placeholder="Full Address"
                    className="flex min-h-[60px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 resize-none dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    rows={2}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="city"
                    placeholder="City"
                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="state"
                    placeholder="State"
                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    className="flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleSubmit1}
                disabled={loading1}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 shadow-sm h-9 px-4 py-2 w-full sm:w-auto disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                {loading1 ? "Requesting..." : "Request For Other Shop"}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-9 px-4 py-2 w-full sm:w-auto disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                {loading ? "Creating..." : "Create Shop"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}