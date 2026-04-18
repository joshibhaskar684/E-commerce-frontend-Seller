"use client";

export default function ShopListCards({
  closeShopwithId,
  shopdata,
  closingId,
  setClosingId
}) {

  const handleClose = () => {
    setClosingId(shopdata?.id);
    closeShopwithId(shopdata?.id);
  };

  const isClosing = closingId === shopdata?.id;

  return (


    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
        
        </div>
    <div className="flex items-center justify-between p-4 mb-3 border rounded-lg shadow-sm bg-foreground">
      
      {/* Left side - Business Name */}
      <div className="text-base font-medium text-background">
        {shopdata?.businessName}
      </div>

      {/* Right side - Button */}
      <button
        onClick={handleClose}
        disabled={isClosing}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition
          ${isClosing 
            ? "bg-gray-400 cursor-not-allowed text-background" 
            : "bg-red-500 hover:bg-red-600 text-background"}
        `}
      >
        {isClosing ? "Closing..." : "Close"}
      </button>

    </div>
    
    
    </>
  );
}