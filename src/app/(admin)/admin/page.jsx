"use client";


import Cookies from "js-cookie";

import {  Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState ,useEffect} from "react";
import { useDispatch ,useSelector} from "react-redux";
import AdminDashBoardReducer from '@/redux-store/authstore/adminDashboard/reducer';
import { totalCountForAdminDashBoard } from "@/redux-store/authstore/adminDashboard/action";
import StatSection from "@/components/Admin/DashBoard/StatSection";



export default function page(){

const dispatch=useDispatch();

const totalCountData=useSelector((state)=>state.AdminDashBoardReducer.AdminTotalData);
console.log(totalCountData,"total count data");


const loadData=()=>{
    const token=Cookies.get("adminToken");
    dispatch(totalCountForAdminDashBoard({token}));
}

useEffect(()=>{
loadData();
},[]);





    return (
        <>
<div className="w-full overflow-y-auto h-full grid grid-cols-1  gap-5 hide-scrollbar">
    <div>

        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        </div>
        <div className="w-full">
            <div className="p-4 md:p-8">
  {totalCountData && (
    <>
      <StatSection title="Overview" data={totalCountData[0]} />
      <StatSection title="Seller Stats" data={totalCountData[1]} />
      <StatSection title="Shop Stats" data={totalCountData[2]} />
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