"use client"

import { useParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PackageX } from "lucide-react";

import ProductCarousel from "@/components/Admin/Carousel/ProductCarousel";
import { Skeleton } from "@/components/Admin/shared/Skeleton";

import { getProductsById } from "@/redux-store/authstore/product/action";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [attempted, setAttempted] = useState(false);

    const params = useParams();
    const productId = params.productId;
    const dispatch = useDispatch();
    const details = useSelector((state) => state.productReducer.productsdetails);
    const fetching = useSelector((state) => state.productReducer.loading);

    // `productsdetails` holds whichever product was opened last, so the record
    // from the previous page would flash before this one arrives. Only trust it
    // once its id matches the route (records without an id are let through).
    const detailsId = details?.id ?? null;
    const productdetails =
        details && (!detailsId || String(detailsId) === String(productId)) ? details : null;

    const UpdateProduct = async (id) => {
        setLoading(true)
        try {

        } catch (error) {
            await dispatch()
        } finally {
            setLoading(false)
        }
    }

    const loadProduct = useCallback(async () => {
        await dispatch(getProductsById({ productId }));
        setAttempted(true);
    }, [dispatch, productId]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    if (!productdetails) {
        return fetching || !attempted ? (
            <ProductDetailSkeleton />
        ) : (
            <NotFound productId={productId} onRetry={loadProduct} />
        );
    }

    return (
        <>

            <div className="w-full grid grid-cols-1 place-items-center p-5">
                <div className="w-full">
                    <h1 className="font-bold text-2xl">Products Details</h1>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center p-5 gap-5">
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
                    <div className="w-full  border p-5 rounded grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Images */}
  <div className=" p-5">


    <div className="grid grid-cols-3 gap-3 ">
     <ProductCarousel productdetails={productdetails}/>
    </div>
  </div>

  {/* Pricing */}
  <div className="flex flex-col justify-center">
    <p className="font-medium mb-2">Price</p>

    <div className="flex items-center gap-3">
      {/* Current Price */}
      <span className="text-2xl font-semibold text-green-600">
        ₹{productdetails?.price}
      </span>

      {/* Original Price */}
      {productdetails?.originalPrice && (
        <span className="text-gray-500 line-through">
          ₹{productdetails?.originalPrice}
        </span>
      )}
    </div>

    {/* Discount */}
    {productdetails?.originalPrice && productdetails?.price && (
      <p className="text-sm text-red-500 mt-1">
        {Math.round(
          ((productdetails.originalPrice - productdetails.price) /
            productdetails.originalPrice) *
            100
        )}
        % OFF
      </p>
    )}
  </div>

</div>
                </div>
                <div className="w-full grid grid-cols-1  place-items-center p-5 gap-5 ">

                                       <button onClick={()=>UpdateProduct(productdetails?.id)} className={`border p-5 w-full bg-yellow-500 rounded cursor-pointer ${loading?"cursor-not-allowed bg-yellow-500/50 ":""}`}>{loading?"Updating....":"Update Product"} </button>

                </div>
            </div>
        </>
    )
}

/** Mirrors the layout above so the page does not jump once the product lands. */
function ProductDetailSkeleton() {
    return (
        <div className="grid w-full grid-cols-1 place-items-center p-5">
            <div className="w-full">
                <Skeleton className="h-8 w-52" />
            </div>

            <div className="grid w-full grid-cols-1 place-items-center gap-5 p-5 md:grid-cols-2">
                <div className="grid w-full grid-cols-1 gap-4 rounded p-5">
                    <Skeleton className="h-8 w-3/4" />

                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, field) => (
                            <Skeleton key={field} className="h-4 w-32" />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-56" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <div className="mt-1 flex flex-wrap gap-2">
                            {[0, 1, 2].map((chip) => (
                                <Skeleton key={chip} className="h-8 w-24 rounded" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-3.5 w-11/12" />
                        <Skeleton className="h-3.5 w-2/3" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {Array.from({ length: 4 }).map((_, spec) => (
                                <div key={spec} className="space-y-1.5 rounded p-2">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-3.5 w-16" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, meta) => (
                            <Skeleton key={meta} className="h-3.5 w-40" />
                        ))}
                    </div>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 rounded border p-5 md:grid-cols-2">
                    <div className="p-5">
                        <Skeleton className="mx-auto h-64 w-full max-w-md rounded" />
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                        <Skeleton className="h-4 w-16" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-28" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                        <Skeleton className="h-3.5 w-16" />
                    </div>
                </div>
            </div>

            <div className="grid w-full grid-cols-1 place-items-center gap-5 p-5">
                <Skeleton className="h-16 w-full rounded" />
            </div>
        </div>
    );
}

function NotFound({ productId, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-24 text-center">
            <div className="rounded-full border border-zinc-200 p-3 dark:border-zinc-800">
                <PackageX className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">Product not found</p>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                    Nothing came back for{" "}
                    <span className="font-mono text-xs">{String(productId)}</span>.
                </p>
            </div>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-4 text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
                Try again
            </button>
        </div>
    );
}
