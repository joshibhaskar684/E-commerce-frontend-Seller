"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import ProductCarousel from "@/components/Admin/Carousel/ProductCarousel";

import { getProductsByIdSeller } from "@/redux-store/authstore/product/action";

export default function page() {
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const productId = params.productId;
    const dispatch = useDispatch();
    const productdetails = useSelector((state) => state.productReducer.productsdetails);

    const UpdateProduct = async (id) => {
        setLoading(true)
        try {

        } catch (error) {
            await dispatch()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      
          const token=Cookies.get("sellerToken");
          console.log("token", token);
        dispatch(getProductsByIdSeller({ productId , token}));
    }
        , []
    )


    return (
        <>

            <div className="w-full grid grid-cols-1 place-items-center p-5">
                <div className="w-full">
                    <h1 className="font-bold text-2xl">Products Details</h1>
                </div>

                <div className="w-full grid grid-cols-1  place-items-center p-5 gap-5">


                   <div className="w-full border rounded-xl p-4 md:p-6 bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* IMAGE SECTION */}
  <div className="w-full">

    {/* Carousel */}
    <div className="relative w-full overflow-hidden rounded-xl">
      
      <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
        {productdetails?.images?.map((img, index) => (
          <div
            key={index}
            className="min-w-full snap-center flex justify-center items-center"
          >
            <img
              src={img}
              alt={`product-${index}`}
              className="w-full h-72 md:h-96 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

    </div>

    {/* Thumbnail strip (desktop only) */}
    <div className="hidden md:flex gap-2 mt-3 overflow-x-auto">
      {productdetails?.images?.map((img, index) => (
        <img
          key={index}
          src={img}
          className="w-16 h-16 object-cover rounded-md border hover:border-black cursor-pointer"
          alt=""
        />
      ))}
    </div>
  </div>

  {/* PRICING SECTION */}
  <div className="flex flex-col justify-center space-y-4">

    <p className="text-sm text-gray-500">Price</p>

    <div className="flex items-end gap-3 flex-wrap">
      <span className="text-3xl font-bold text-green-600">
        ₹{productdetails?.price}
      </span>

      {productdetails?.originalPrice && (
        <span className="text-gray-400 line-through text-lg">
          ₹{productdetails?.originalPrice}
        </span>
      )}
    </div>

    {/* Discount Badge */}
    {productdetails?.originalPrice && productdetails?.price && (
      <span className="inline-block w-fit bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
        {Math.round(
          ((productdetails.originalPrice - productdetails.price) /
            productdetails.originalPrice) *
          100
        )}% OFF
      </span>
    )}

    {/* CTA Button (optional but recommended) */}
   
  </div>
</div>


                    <div className="w-full  p-5 rounded grid grid-cols-1 gap-4">

                        {/* Name */}
                        <h1 className="text-2xl font-semibold">
                            {productdetails?.name}
                        </h1>

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <p><span className="font-medium">Brand:</span> {productdetails?.brand}</p>
                            <p><span className="font-medium">Color:</span> {productdetails?.color}</p>
                            <p><span className="font-medium">Quantity:</span> {productdetails?.quantity}</p>
                            <p><span className="font-medium">Return Days:</span> {productdetails?.returnDay}</p>
                        </div>

                        {/* Category */}
                        <div>
                            <p className="font-medium">Category ID:</p>
                            <p className="">{productdetails?.categoryId}</p>
                        </div>

                        {/* Category Path */}
                        <div>
                            <p className="font-medium">Category :</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {productdetails?.categoryPath?.map((cat, index) => (
                                    <span key={index} className="bg-foreground text-background px-2 py-1 rounded text-sm p-5">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-medium">Description:</p>
                            <p className="">{productdetails?.description}</p>
                        </div>

                        {/* Specifications (dynamic map) */}
                        <div>
                            <p className="font-medium">Specifications:</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {productdetails?.specifications &&
                                    Object.entries(productdetails.specifications).map(([key, value]) => (
                                        <div key={key} className=" p-2 rounded">
                                            <p className="text-sm font-medium line-clamp-2">{key}</p>
                                            <p className=" text-sm">{value}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                            <p><span className="font-medium">Product ID:</span> {productdetails?.id}</p>
                            <p><span className="font-medium">Store ID:</span> {productdetails?.storeId}</p>
                            <p>
                                <span className="font-medium">Created At:</span>{" "}
                                {productdetails?.createdAt
                                    ? new Date(productdetails.createdAt).toLocaleString()
                                    : "-"}
                            </p>
                            <p>
                                <span className="font-medium">Updated At:</span>{" "}
                                {productdetails?.updatedAt
                                    ? new Date(productdetails.updatedAt).toLocaleString()
                                    : "-"}
                            </p>
                        </div>

                    </div>


                </div>
                <div className="w-full grid grid-cols-1  place-items-center p-5 gap-5 ">

                    <button onClick={() => UpdateProduct(productdetails?.id)} className={`border p-5 w-full bg-yellow-500 rounded cursor-pointer ${loading ? "cursor-not-allowed bg-yellow-500/50 " : ""}`}>{loading ? "Updating...." : "Update Product"} </button>

                </div>
            </div>
        </>
    )
}