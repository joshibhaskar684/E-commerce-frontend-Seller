"use client";

import Cookies from "js-cookie";
import { getSuspendedSHOPS } from "@/redux-store/authstore/shops/action";
import SellerCard from "@/components/Admin/Cards/SellerCard/SellerCard";
import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";

export default function page(){
       const dispatch=useDispatch();   
       const searchParams = useSearchParams();
     const [totalPage,setTotalPages]=useState(1);
        const [pageno,setPageno]=useState(Number(searchParams.get("pageno")) || 1);
        const [selectedId ,setSelectedId]=useState('');
        const [pagesize,setPagesize]=useState(Number(searchParams.get("pagesize")) || 12);
        const router=useRouter();
       
    const seller=useSelector((state)=>state.ShopsReducer.suspendedShops);

    console.log(seller,"products");
    useEffect(()=>{
handleSellerLoading();
    },[pageno,pagesize]
    );
    const handleSellerLoading=()=>{
        const token=Cookies.get("adminToken");
        dispatch(getSuspendedSHOPS({pageno,pagesize},token));
        
    }
    
    const handleViewMore=(id)=>{
        try{
        setSelectedId(id);
        router.push(`/admin/shop/${id}`);
    }
    catch(e){

    }finally{
    }
    }
        

     useEffect(()=>{
        setTotalPages(seller?.totalPages)
       },[seller]);

     const handlePaginationChange = (_, page) => {
        setPageno(page);

        const params = new URLSearchParams(searchParams.toString());
        params.set("pageno", page);

        router.push(`?${params.toString()}`);
    };

    return (
        <>
        <div className="grid grid-cols-1 gap-5">
            <div className="w-full">
<h1 className="font-bold text-2xl">Suspended Shops </h1>

            </div>

             <div className="grid grid-cols-1 md:grid-cols-2  gap-5">

{
    seller?.content?.map((item,index)=>(
        <SellerCard seller={item} key={index} handleViewMore={handleViewMore} selectedId={selectedId}/>
    ))
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