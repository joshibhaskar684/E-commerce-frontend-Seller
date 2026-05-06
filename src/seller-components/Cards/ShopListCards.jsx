"use client";

import { useRouter } from "next/navigation";

export default function ShopListCards({
  closeShopwithId,
  shopdata,
  closingId,
  setClosingId,
  setRedirectingId,
  redirectingId,
}) {

  const router=useRouter();
  const handleClose = async() => {
    const id = shopdata?.id;
  setClosingId(id);
  closeShopwithId(id); 

 };
const handleRedirect=()=>{
   router.push(`/seller/shops/${shopdata?.id}`);
   setRedirectingId(shopdata?.id);

}
  const isClosing = closingId === shopdata?.id;
const isRedirect=redirectingId===shopdata?.id;

const statusStyles = {
  ACTIVE: "bg-blue-100 text-blue-700",
  INACTIVE: "bg-gray-100 text-gray-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-200 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  SUSPENDED: "bg-purple-100 text-purple-700",
};

const status = shopdata?.status?.trim()?.toUpperCase();

  return (


    <>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5  overflow-hidden w-full p-4 rounded-xl border border-border bg-background text-foreground shadow-sm">
  
  {/* Left Side */}
  <div className="flex-1 min-w-0 w-full">
    <h1 className="text-lg sm:text-xl font-semibold truncate">
      {shopdata?.businessName}
    </h1>

    {/* Status */}
    <p className="text-sm mt-1">
      Status:{" "}
      <span className={`px-2 py-1 rounded ${statusStyles[status]}`}>
  {status}
</span>
    </p>
  </div>

  {/* Right Side */}
  <div className="gap-5 grid grid-cols-1 md:grid-cols-2 p-5 w-full ">
    <button
      onClick={handleClose}
      disabled={isClosing}
      className={`ml-4 shrink-0 px-4 py-2 w-full text-sm font-medium rounded-lg border transition-all duration-200 bg-red-500
      ${
        isClosing
          ? "bg-muted text-muted-foreground border-muted cursor-not-allowed"
          : " text-white border-red-500 hover:bg-red-600 hover:border-red-600"
      }`}
    >
      {isClosing ? "Closing..." : "Close"}
    </button>

    <button
      onClick={handleRedirect}
      disabled={isRedirect}
      className={`ml-4 shrink-0 px-4 py-2 w-full text-sm font-medium rounded-lg border transition-all duration-200
      ${
        isRedirect
          ? "bg-muted text-muted-foreground border-muted cursor-not-allowed"
          : "bg-yellow-500 text-white border hover:bg-yellow-600 hover:border-yellow-600"
      }`}
    >
      {isRedirect ? "redirecting..." : "View"}
    </button>
  </div>
</div>
    
    
    </>
  );
}