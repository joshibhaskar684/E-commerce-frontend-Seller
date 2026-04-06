"use client";

import SubCategoryCreateCard from "@/components/Admin/Cards/SubCategoryCreateCard/SubCategoryCreateCard";
import { getCategoryMain,getCategoriesWhereIdNotNull ,createCategory} from "@/redux-store/authstore/category/action";
import { Modal, Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";

export default function page(){
     const searchParams = useSearchParams();
    const [totalPage,setTotalPages]=useState(1);
    const [pageno,setPageno]=useState(Number(searchParams.get("pageno")) || 1);
    const [loading ,setLoading]=useState(false);
    const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 1);
    const router=useRouter();
    const dispatch=useDispatch();
    const [parentId ,setParentId]=useState('');
    const [subCategory,setSubCategoryName]=useState('');
    const MainCategories=useSelector((state)=>state.categoryReducer.maincategories);

    console.log(subCategory)
    const createSubCategory=async(e,id)=>{
    e.preventDefault();
    setParentId(id)
    try{
        await dispatch(createCategory({name:subCategory,parentId:id,setLoading}))
    }catch(error){

    }finally{
       setParentId('')
    }
    
}

   useEffect(()=>{
    setTotalPages(MainCategories?.totalPages)
   },[MainCategories]);
   useEffect(()=>{
    console.log("new1 category")
    getCategory();
   },[]);

   useEffect(()=>{
    getCategory();
   },[pageno,pagesize]);

    const getCategory=async()=>{
    try{
        console.log("getcategory function")
await dispatch(getCategoriesWhereIdNotNull({pageno:pageno-1,pagesize}))
    }catch(error){

    }finally{

    }
   }

    const handlePaginationChange = (_, page) => {
        setPageno(page);

        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);

        router.push(`?${params.toString()}`);
    };
    return (
        <>
<div className="grid grid-cols-1 gap-5 p-5 md:p-10">
<div className="grid grid-cols-1 gap-5 md:p-5">
    <h1 className="font-bold text-3xl">All Sub-Categories</h1>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  place-items-center">
{

MainCategories?.content?.map((item ,index)=>(<SubCategoryCreateCard 
    key={index} 
    loading={loading}
    parentId={parentId}
    categories={item}
    createSubCategory={createSubCategory}
    setSubCategoryName={setSubCategoryName}
     />))

}
    </div>

    <div className="grid grid-cols-1 gap-5 h-full mb-10 p-5 place-items-center">
       <Pagination
                           count={totalPage}
                           page={pageno}
                           onChange={handlePaginationChange}
                           color="primary"
                           sx={{
                               "& .MuiPaginationItem-root": {
                                   backgroundColor: "transparent",
                                   color: "var(--foreground)", // ensures text is visible
                               },
                               "& .Mui-selected": {
                                   backgroundColor: "primary.main", // selected page still colored
                                   color: "#fff",
                               },
                           }}
                       />
    </div>
    </div>
        
        </>
    )
}