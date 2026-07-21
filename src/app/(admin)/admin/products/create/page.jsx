"use client";

import { createProduct, getCategorytree } from "@/redux-store/authstore/product/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategorySelect } from './M';
import { Plus, X, Image as ImageIcon, Tag, IndianRupee, Store, Palette, Package } from "lucide-react";
import Cookies from "js-cookie";

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]);
  const [specs, setSpecs] = useState({});
  const [name, setName] = useState("");   
  const [value, setValue] = useState(""); 

  const dispatch = useDispatch();
  const [categoryId, SetCategoryId] = useState("");
  const CategoriesList = useSelector((state) => state.productReducer.categories);

  const addSpec = (e) => {
    e.preventDefault();
    if (!name || !value) return; 
    setSpecs(prev => ({
      ...prev,
      [name]: value
    }));
    setName("");
    setValue("");
  };

  useEffect(() => {
    dispatch(getCategorytree({}));
  }, [dispatch]);

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
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      brand: formData.get("brand"),
      categoryId,
      categoryPath,
      color: formData.get("color"),
      price: parseFloat(formData.get("price")),
      originalPrice: parseFloat(formData.get("originalPrice")),
      store: formData.get("store"),
      quantity: parseInt(formData.get("quantity")),
      returnDay: parseInt(formData.get("returnDay")),
      description: formData.get("description"),
      images,
      specifications: specs,
    };
    try {
      await dispatch(createProduct(data));
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-zinc-50/50 dark:bg-background overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-background px-6 py-8">
            <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Product</h1>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Add a new product to your catalog. Fill in the details below.
                </p>
            </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 pb-20">
            <div className="max-w-4xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Basic Information */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Tag className="w-5 h-5 text-zinc-400" />
                                Basic Information
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Product Name</label>
                                <input name="name" placeholder="E.g. Wireless Headphones" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Brand</label>
                                <input name="brand" placeholder="E.g. Sony" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-foreground">Category Hierarchy</label>
                                {CategoriesList && CategoriesList.length > 0 && (
                                    <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                                        <CategorySelect
                                            data={CategoriesList}
                                            path={categoryPath}
                                            setPath={setCategoryPath}
                                            SetCategoryId={SetCategoryId}
                                        />
                                    </div>
                                )}
                                <input type="hidden" name="categoryId" required value={categoryId} />
                                <input type="hidden" name="category" required value={categoryPath.join(" / ")} />
                            </div>
                        </div>
                    </div>

                    {/* Pricing and Inventory */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-zinc-400" />
                                Pricing & Inventory
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Selling Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-zinc-500">₹</span>
                                    <input type="number" name="price" placeholder="0.00" className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required min="0" step="0.01" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Original Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-zinc-500">₹</span>
                                    <input type="number" name="originalPrice" placeholder="0.00" className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required min="0" step="0.01" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Quantity</label>
                                <input type="number" name="quantity" placeholder="0" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required min="0" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Return Days</label>
                                <input type="number" name="returnDay" placeholder="e.g. 7" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required min="0" />
                            </div>
                        </div>
                    </div>

                    {/* Attributes */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Package className="w-5 h-5 text-zinc-400" />
                                Attributes
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Primary Color</label>
                                <input name="color" placeholder="E.g. Matte Black" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Store Name</label>
                                <input name="store" placeholder="E.g. Official Electronics Store" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required />
                            </div>
                        </div>
                    </div>

                    {/* Media Assets */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-zinc-400" />
                                Media Assets
                            </h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <input
                                    type="url"
                                    placeholder="Enter Image URL (https://...)"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <button
                                    onClick={(e) => { 
                                        e.preventDefault(); 
                                        if (imageUrl) {
                                            setImages([...images, imageUrl]); 
                                            setImageUrl("");
                                        }
                                    }}
                                    type="button"
                                    className="inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 h-10 px-4 py-2 gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Add Image
                                </button>
                            </div>

                            {images.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                    {images.map((item, index) => (
                                        <div key={index} className="group relative flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 pr-10">
                                            <div className="h-10 w-10 shrink-0 rounded bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                                                <img src={item} alt="" className="h-full w-full object-cover" />
                                            </div>
                                            <span className="text-xs truncate text-zinc-600 dark:text-zinc-400">{item}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Palette className="w-5 h-5 text-zinc-400" />
                                Technical Specifications
                            </h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 space-y-2">
                                    <label className="text-sm font-medium text-foreground">Property</label>
                                    <input
                                        placeholder="E.g. Weight"
                                        value={name}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-sm font-medium text-foreground">Value</label>
                                    <input
                                        placeholder="E.g. 1.2kg"
                                        value={value}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        onChange={e => setValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') addSpec(e);
                                        }}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={addSpec}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-50 h-10 px-4 py-2 w-full sm:w-auto"
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add
                                    </button>
                                </div>
                            </div>

                            {Object.keys(specs).length > 0 && (
                                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-zinc-500">Property</th>
                                                <th className="px-4 py-3 text-left font-medium text-zinc-500">Value</th>
                                                <th className="px-4 py-3 text-right font-medium text-zinc-500 w-16">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                            {Object.entries(specs).map(([key, val], index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100 font-medium">{key}</td>
                                                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{val}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSpec(index)}
                                                            className="text-zinc-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-background rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Rich Description</label>
                            <textarea 
                                name="description" 
                                placeholder="Describe your product in detail..." 
                                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y" 
                                required 
                            />
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-white hover:bg-yellow-600 h-11 px-8 py-2 w-full sm:w-auto shadow-sm"
                            disabled={loading}
                        >
                            {loading ? "Creating Product..." : "Publish Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
  );
}