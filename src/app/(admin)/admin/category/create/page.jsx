"use client";

import { createCategory, createCategorywithparent } from "@/redux-store/authstore/category/action";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Loader2, PlusCircle } from "lucide-react";

export default function CreateCategoryPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        
        const parentId = formData.get("parentId");
        const data = {
            name: formData.get("name"),
            parentId: parentId ? parentId : null,
            setLoading
        };
        
        try {
            if (!data.parentId) {
                dispatch(createCategory(data));
            } else {
                dispatch(createCategorywithparent(data));
            }
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-full p-4 md:p-8 flex justify-center items-start pt-10">
            {/* Card Container */}
            <div className="w-full max-w-lg bg-background border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
                
                {/* Card Header */}
                <div className="flex flex-col space-y-1.5 p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                        <PlusCircle className="w-6 h-6 text-yellow-500" />
                        Create Category
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Add a new category or sub-category to your catalog.
                    </p>
                </div>

                {/* Card Content (Form) */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label 
                                htmlFor="name" 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="e.g., Electronics"
                                className="flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                                required 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label 
                                htmlFor="parentId" 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Parent ID (Optional)
                            </label>
                            <input 
                                type="text" 
                                name="parentId" 
                                id="parentId" 
                                placeholder="Leave blank for main category"
                                className="flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"  
                            />
                            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">
                                If this is a sub-category, paste the ID of the parent category here.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-zinc-950 hover:bg-yellow-400 h-11 px-8 py-2 w-full mt-2 shadow-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Category"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}