"use client";

import { deleteCategory } from "@/redux-store/authstore/category/action";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function page(){
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data ={
            name: formData.get("name"),
            parentId: formData.get("parentId") || null,
            setLoading
        }
        try{
            dispatch(deleteCategory(data));
        
        }catch(error){
            console.log(error.message);
        }finally{
           
        }
        console.log(data);
    }
    return (
        <>
<div className="w-full p-5 grid grid-cols-1 gap-5">
    
    <div className="">
        <h1 className="text-2xl font-bold mb-5">Delete Category</h1>
    </div>
    <div className="md:p-5">
        <form onSubmit={handleSubmit} className="flex flex-col  gap-5 md:p-5 rounded">
<label htmlFor="name" className="font-bold">Name</label>
<input type="text" name="name" id="name" className="border p-2 rounded" required />
<label htmlFor="parentId" className="font-bold">Category Id</label>
<input type="text" name="parentId" id="parentId" className="border p-2 rounded" required  />
<button
  className={`bg-yellow-500 text-white p-3 rounded text-2xl font-bold cursor-pointer mt-3 ${
    loading ? 'opacity-50 cursor-not-allowed bg-foreground text-background' : ''
  }`}
  type="submit"
>
  {loading ? "Deleting..." : "Delete Category"}
</button>
     </form>

    </div>
</div>
        </>
    )
}