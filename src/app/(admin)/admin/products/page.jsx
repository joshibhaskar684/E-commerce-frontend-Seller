"use client";

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
        const [loading ,setLoading]=useState(false);
        const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 12);
        const router=useRouter();
       
    const products=useSelector((state)=>state.productReducer.products);

    useEffect(()=>{
        dispatch(getProducts(pageno,pagesize))
    },[]
    );
        

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

             <div className="w-full">

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