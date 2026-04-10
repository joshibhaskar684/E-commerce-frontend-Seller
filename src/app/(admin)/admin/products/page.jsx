"use client";

import ProductsCard from "@/components/Admin/Cards/ProductsCard/ProductsCard";
import { getProducts } from "@/redux-store/authstore/product/action";
import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";

export default function page(){
    const dispatch=useDispatch();   
       const searchParams = useSearchParams();
     const [totalPage,setTotalPages]=useState(1);
        const [pageno,setPageno]=useState(Number(searchParams.get("pageno")) || 1);
        const [loadingId ,setLoadingId]=useState('');
        const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 12);
        const router=useRouter();
       
    const products=useSelector((state)=>state.productReducer.products);
    console.log(products,"products");
    useEffect(()=>{
        dispatch(getProducts({pageno,pagesize}));
    },[pageno,pagesize]
    );
    // useEffect(()=>{
    //     dispatch(getProducts(pageno,pagesize))
    // },[]
    // );
        
const deleteProduct=async(id)=>{
    setLoadingId(id);
    try{

    }catch(error){

    }finally{
        setLoadingId('');
    }
}
     useEffect(()=>{
        setTotalPages(products?.totalPages)
       },[products]);

     const handlePaginationChange = (_, page) => {
        setPageno(page);

        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);

        router.push(`?${params.toString()}`);
    };


    return (
        <>
        <div className="grid grid-cols-1 gap-5 p-5 place-items-center w-full">
            <div className="w-full">
<h1 className="font-bold text-2xl">Products</h1>
            </div>

             <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5">
                {
                    products?.content?.map((item,index)=>(<ProductsCard key={index} product={item} deleteProduct={deleteProduct} loadingid={loadingId} />))
                }

             </div>

             <div className="w-full grid grid-cols-1 gap-5 p-5 place-items-center ">
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