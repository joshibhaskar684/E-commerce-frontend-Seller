"use client";


import Cookies from "js-cookie";

import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import AdminDashBoardReducer from '@/redux-store/authstore/adminDashboard/reducer';
import { totalShopsCountForSellerDashBoard } from "@/redux-store/authstore/seller/action";
import StatSection from "@/components/Admin/DashBoard/StatSection";



export default function page(){

const dispatch=useDispatch();

const totalCountData=useSelector((state)=>state.sellerReducer.totalShopCount);
console.log(totalCountData,"total count data");


const loadData=()=>{
    const token=Cookies.get("sellerToken");
    dispatch(totalShopsCountForSellerDashBoard({token}));
}

useEffect(()=>{
loadData();
},[]);





    return (
        <>
<div className="w-full overflow-y-auto h-full grid grid-cols-1  gap-5 hide-scrollbar">
    <div className="w-full">

        <h1 className="text-2xl font-bold ">Seller Dashboard</h1>

        </div>
        <div className="w-full">
            <div className="p-4 ">
  {totalCountData && (
    <>
       <StatSection title="Shop Stats" data={totalCountData} />
    </>
  )}
</div>

            </div>
<div className="">
    
</div>

</div>

        
        </>
    )
}