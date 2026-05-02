"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import { getSellerById,ApproveSellerById,rejectSellerById } from "@/redux-store/authstore/seller/action";
import SellerDataCard from "@/components/Admin/Cards/SellerDataCard/SellerDataCard";
import RejectSellerModal from "@/components/Admin/Modals/RejectSellerModal";

export default function page() {
    const [loading,setLoading]=useState(false);
    const [reason, setReason] = useState("");
    const [rejection,setRejection]=useState(false);
     const [openModal, setOpenmodal] = useState(false);
    const params = useParams();
    const sellerId = params.sellerId;
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.sellerReducer.sellerdetails);



    useEffect(() => {
        handleFetchingSellerData();
    }
        , []
    )

    const handleFetchingSellerData = () => {
        const token=Cookies.get("adminToken");
        dispatch(getSellerById({ id:sellerId},token )) 
    }

    const ApproveRequest=async()=>{ 
        setLoading(true)
        try{
             const token=Cookies.get("adminToken");
            await dispatch(ApproveSellerById({id:sellerId},token))
            window.location.reload();
        }
        catch(e){

        }finally{
            setLoading(false)
        }
    } 
    const handleRejectSeller=async(e)=>{
         e.preventDefault();
        setRejection(true);
        try{

        const token=Cookies.get("adminToken");
            await dispatch(rejectSellerById({id,reason},token))

        }catch(e){

        }finally{
             setRejection(false);
        }

    }


    return (
        <>
        <div className="grid grid-cols-1 w-full p-5 gap-5">
            <div className=" w-full">
                <h1 className="text-2xl md:text-3xl font-bold">Seller Data</h1>

            </div>
<div className="p-5 w-full">

<SellerDataCard seller={seller}/>

            </div>
            
            </div>
     </>
    )
}