import { FaArrowRight } from "react-icons/fa";

export default function ProductsCard({ product ,deleteProduct,loadingid}) {
  return (
    <div className="w-full bg-foreground text-background border rounded p-5 grid grid-cols-1 gap-3 place-items-center">
      
      {/* Image */}
      <div className="w-full grid grid-cols-1 place-items-center rounded overflow-hidden">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full/50 h-full/50 object-cover"
        />
      </div>

      {/* Brand */}
      <p className="text-sm opacity-70 w-full">{product?.brand}</p>

      {/* Name */}
      <h2 className="text-lg font-semibold line-clamp-1 w-full">
        {product?.name}
      </h2>

      {/* Category Path */}
      <p className="text-xs text-gray-500 line-clamp-1 w-full ">
        {product?.categoryPath?.join(" > ")}
      </p>

      {/* Price Section */}
      <div className="flex items-center gap-2 line-clamp-1 w-full">
        <span className="text-lg font-bold">
          ₹{product?.price}
        </span>
        {product?.originalPrice && (
          <span className="text-sm line-through opacity-60">
            ₹{product?.originalPrice}
          </span>
        )}
      </div>

      {/* Store ID (optional display) */}
      <p className="text-xs opacity-50 line-clamp-1 w-full">
        Store: {product?.storeId}
      </p>

      {/* Created / Updated Dates */}
      <div className="text-xs opacity-40  line-clamp-1 w-full">
        <p>
          Created: {product?.createdAt
            ? new Date(product.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
       
      </div>
      <div className="text-xs opacity-40  line-clamp-1 w-full">
        
        <p>
          Updated: {product?.updatedAt
            ? new Date(product.updatedAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 place-items-center gap-2">
        <a href={`/admin/products/${product?.id}`} className="w-full bg-yellow-500 text-background  py-2 rounded hover:bg-yellow-600 cursor-pointer transition flex gap-5 items-center justify-center border">
            View More <FaArrowRight className="inline-block ml-1" />
        </a>
         <button  onClick={()=>deleteProduct(product?.id)} className={`w-full bg-background text-foreground  py-2 rounded hover:bg-yellow-600 cursor-pointer transition flex gap-5 items-center justify-center border ${loadingid==product?.id ? " opacity-50 cursor-not-allowed" : ""}`} disabled={loadingid==product?.id}>
        { loadingid==product?.id ? "Deleting..." : "  Delete Product"} <FaArrowRight className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
}