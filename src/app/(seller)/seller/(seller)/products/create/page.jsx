"use client";

import Cookies from "js-cookie";

import { createProduct, getCategorytree } from "@/redux-store/authstore/product/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategorySelect } from './M';
import { FaPlus, FaTimes } from "react-icons/fa";
import { getSellerIdAndShopIdList } from "@/redux-store/authstore/seller/action";
import { toast } from "react-toastify";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]);
  const [specs, setSpecs] = useState({});
  const [name, setName] = useState("");   // for input: spec name
  const [value, setValue] = useState(""); // for input: spec value

  const dispatch = useDispatch();
  const [categoryId, SetCategoryId] = useState("");
  
  const [sellerId, setSellerId] = useState("");
  const [shopId, setShopId] = useState("");

  const CategoriesList = useSelector((state) => state.productReducer.categories);
  const sellerIdAndShopIdList = useSelector((state) => state.sellerReducer.sellerIdAndShopIdList);

  useEffect(() => {
    setSellerId(sellerIdAndShopIdList?.sellerId || "");
    console.log("Seller ID set to:", sellerIdAndShopIdList?.sellerId);
  }, [sellerIdAndShopIdList]);

  const addSpec = () => {
    if (!name) return;
    setSpecs(prev => ({
      ...prev,
      [name]: value
    }));
    setName("");
    setValue("");
  };

  useEffect(() => {
    console.log("useEffect called")
    getCategories()
    getSellerAndShopIdData()
  }, []);

  const getCategories = async () => {
    console.log("getCategories called")
    try {
      await dispatch(getCategorytree({}))
    } catch (error) {
      console.error(error);
    }
  };

  const getSellerAndShopIdData = async () => {
    console.log("getSellerAndShopIdData called")
    const token = Cookies.get("sellerToken")
    try {
      await dispatch(getSellerIdAndShopIdList({ token }))
    } catch (error) {
      console.error(error);
    }
  };

  console.log(categoryId, "categoriesId")
  console.log("categoryshopId", shopId)
  console.log(categoryPath.toLocaleString(), "categoriesList")

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeSpec = (index) => {
    const newSpecs = { ...specs };
    const keyToRemove = Object.keys(newSpecs)[index];
    delete newSpecs[keyToRemove];
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
      
    setLoading(true)
    if (!shopId) {
      toast.error("Please select a shop / create shop before creating a product.");
      setLoading(false);
      return;
    }

    const token = Cookies.get("sellerToken");
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      brand: formData.get("brand"),
      shopId,
      sellerId,
      categoryId,
      categoryPath,
      freeShipping: formData.get("freeShipping") === "true",
      color: formData.get("color"),
      price: parseFloat(formData.get("price")),
      originalPrice: parseFloat(formData.get("originalPrice")),
      store: formData.get("store"),
      quantity: parseInt(formData.get("quantity")),
      returnDay: parseInt(formData.get("returnDay")),
      description: formData.get("description"),
      images,
      slug: formData.get("name").toLowerCase().replace(/\s+/g, '-'),
      specifications: specs,
      token,
    };

    let errs = {};
    if (!data.name || data.name.trim().length < 3) errs.name = "Product name must be at least 3 characters.";
    if (!data.brand || data.brand.trim().length < 2) errs.brand = "Brand is required.";
    if (!data.color || data.color.trim().length < 2) errs.color = "Color is required.";
    if (isNaN(data.originalPrice) || data.originalPrice <= 0) errs.originalPrice = "Original price must be greater than 0.";
    if (isNaN(data.price) || data.price <= 0) errs.price = "Selling price must be greater than 0.";
    if (data.price > data.originalPrice) errs.price = "Selling price cannot exceed original price.";
    if (isNaN(data.quantity) || data.quantity < 0) errs.quantity = "Quantity must be a valid number.";
    if (isNaN(data.returnDay) || data.returnDay < 0) errs.returnDay = "Return days must be a valid number.";
    if (!data.description || data.description.trim().length < 10) errs.description = "Description must be at least 10 characters.";
    if (images.length === 0) errs.images = "At least one product image is required.";
    if (!categoryId) errs.categoryId = "Please assign a category.";
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setLoading(false);
      return;
    }
    setErrors({});

    try {
      await dispatch(createProduct(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
    console.log(data, "formData")
  }

  // Common Tailwind classes for standard shadcn appearance
  const inputClass = "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300";
  const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block";
  
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans text-zinc-950 dark:text-zinc-50">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Product</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Add a new product to your catalog. Fill in the details below.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-zinc-200 dark:divide-zinc-800">
            
            {/* Section: Basic Info */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Shop Selection */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Select Shop</label>
                  {sellerIdAndShopIdList && (
                    <select
                      name="shopId"
                      className={`${inputClass} bg-white dark:bg-zinc-950`}
                      value={shopId}
                      onChange={(e) => setShopId(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a shop...</option>
                      {sellerIdAndShopIdList?.shopIdData?.map((item, index) => (
                        <option key={index} value={item?.id}>
                          {item?.businessName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Category component wrapper */}
                <div className="md:col-span-2 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 bg-zinc-50/50 dark:bg-zinc-900/20">
                  <label className={labelClass}>Category Assignment</label>
                  {CategoriesList && CategoriesList.length > 0 && (
                    <CategorySelect
                      data={CategoriesList}
                      path={categoryPath}
                      setPath={setCategoryPath}
                      SetCategoryId={SetCategoryId}
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className={labelClass}>Category ID</label>
                  <input name="categoryId" placeholder="Auto-filled" className={`${inputClass} bg-zinc-50 dark:bg-zinc-900 text-zinc-500 ${errors.categoryId ? 'border-red-500' : ''}`} required readOnly value={categoryId} />
                  {errors.categoryId && <span className="text-red-500 text-xs">{errors.categoryId}</span>}
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Category Path</label>
                  <input name="category" placeholder="Auto-filled" className={`${inputClass} bg-zinc-50 dark:bg-zinc-900 text-zinc-500`} required readOnly value={categoryPath.join(" / ")} />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className={labelClass}>Product Name</label>
                  <input name="name" placeholder="E.g. Wireless Noise-Cancelling Headphones" className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`} required minLength={3} title="Product name must be at least 3 characters." />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>

                <div className="space-y-1">
                  <label className={labelClass}>Brand</label>
                  <input name="brand" placeholder="Brand Name" className={`${inputClass} ${errors.brand ? 'border-red-500' : ''}`} required minLength={2} title="Brand is required." />
                  {errors.brand && <span className="text-red-500 text-xs">{errors.brand}</span>}
                </div>

                <div className="space-y-1">
                  <label className={labelClass}>Color</label>
                  <input name="color" placeholder="Primary Color" className={`${inputClass} ${errors.color ? 'border-red-500' : ''}`} required minLength={2} title="Color is required." />
                  {errors.color && <span className="text-red-500 text-xs">{errors.color}</span>}
                </div>
              </div>
            </div>

            {/* Section: Media */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Product Images</h2>
              
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="Paste Image URL here..."
                  className={`${inputClass} ${errors.images ? 'border-red-500' : ''}`}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  title="Must be a valid web URL."
                />
                <button
                  onClick={() => { if(imageUrl) { setImages([...images, imageUrl]); setImageUrl(""); } }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 h-9 px-4 shadow-sm shrink-0 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <FaPlus className="mr-2 h-3 w-3" /> Add
                </button>
              </div>
              {errors.images && <span className="text-red-500 text-xs block mt-1">{errors.images}</span>}

              {images.length > 0 && (
                <div className="grid gap-3">
                  {images.map((item, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input type="text" value={item} readOnly className={`${inputClass} bg-zinc-50 dark:bg-zinc-900 text-zinc-500`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-900 h-9 px-3 shadow-sm shrink-0 dark:border-red-900/30 dark:bg-zinc-950 dark:hover:bg-red-900/50 dark:text-red-500"
                      >
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section: Pricing & Inventory */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className={labelClass}>Original Price</label>
                  <input type="number" name="originalPrice" placeholder="0.00" min="0.01" step="0.01" className={`${inputClass} ${errors.originalPrice ? 'border-red-500' : ''}`} required title="Original price must be greater than 0." />
                  {errors.originalPrice && <span className="text-red-500 text-xs">{errors.originalPrice}</span>}
                </div>
                
                <div className="space-y-1">
                  <label className={labelClass}>Selling Price</label>
                  <input type="number" name="price" placeholder="0.00" min="0.01" step="0.01" className={`${inputClass} ${errors.price ? 'border-red-500' : ''}`} required title="Selling price must be greater than 0." />
                  {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
                </div>
                
                <div className="space-y-1">
                  <label className={labelClass}>Available Quantity</label>
                  <input type="number" name="quantity" placeholder="0" min="0" className={`${inputClass} ${errors.quantity ? 'border-red-500' : ''}`} required title="Quantity must be a valid number." />
                  {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity}</span>}
                </div>

                <div className="space-y-1">
                  <label className={labelClass}>Return Days</label>
                  <input type="number" name="returnDay" placeholder="e.g. 7 or 14" min="0" max="365" className={`${inputClass} ${errors.returnDay ? 'border-red-500' : ''}`} required title="Return days must be a valid number (0-365)." />
                  {errors.returnDay && <span className="text-red-500 text-xs">{errors.returnDay}</span>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className={labelClass}>Free Shipping</label>
                  <div className="flex gap-6 items-center h-9">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="freeShipping" value="true" required className="accent-zinc-900 dark:accent-zinc-50 h-4 w-4" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="freeShipping" value="false" className="accent-zinc-900 dark:accent-zinc-50 h-4 w-4" />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Specifications */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Specifications</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  placeholder="E.g. RAM, Screen Size, Material"
                  value={name}
                  className={inputClass}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  placeholder="E.g. 16GB, 6.1 inches, Cotton"
                  value={value}
                  className={inputClass}
                  onChange={e => setValue(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addSpec}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 h-9 px-4 shadow-sm shrink-0 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                  <FaPlus className="mr-2 h-3 w-3" /> Add Spec
                </button>
              </div>

              {Object.keys(specs).length > 0 && (
                <div className="mt-4 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="text-left font-medium p-3 text-zinc-500">Name</th>
                        <th className="text-left font-medium p-3 text-zinc-500">Value</th>
                        <th className="w-[50px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {Object.entries(specs).map(([key, val], index) => (
                        <tr key={index}>
                          <td className="p-3 font-medium">{key}</td>
                          <td className="p-3 text-zinc-600 dark:text-zinc-400">{val}</td>
                          <td className="p-2 text-right">
                            <button
                              type="button"
                              onClick={() => removeSpec(index)}
                              className="p-2 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <FaTimes className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Section: Description */}
            <div className="p-6 space-y-4">
              <label className={labelClass}>Product Description</label>
              <textarea
                name="description"
                placeholder="Write a detailed description of the product..."
                className={`flex min-h-[120px] w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'} bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 resize-y dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300`}
                required
                minLength={10}
                title="Description must be at least 10 characters."
              />
              {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
            </div>

            {/* Form Footer / Submit */}
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/30 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 h-10 px-8 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300 w-full sm:w-auto"
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}