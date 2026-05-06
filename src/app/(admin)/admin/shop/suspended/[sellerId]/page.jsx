"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import { ApproveShopById,getShopById,rejectShopById} from "@/redux-store/authstore/shops/action";
import ShopDataCard from "@/components/Admin/Cards/ShopDataCard/ShopDataCard";
import RejectShopModal from "@/components/Admin/Modals/RejectSellerModal";

export default function page() {
    const [loading,setLoading]=useState(false);
    const [reason, setReason] = useState("");
    const [rejection,setRejection]=useState(false);
     const [openModal, setOpenmodal] = useState(false);
    const params = useParams();
    const sellerId = params.sellerId;
    const dispatch = useDispatch();
   
    const seller=useSelector((state)=>state.ShopsReducer.Shopsdetails);


    useEffect(() => {
        handleFetchingShopData();
    }
        , []
    )

    const handleFetchingShopData = () => {
        const token=Cookies.get("adminToken");
        dispatch(getShopById({ id:sellerId},token )) 
    }

    const ApproveRequest=async()=>{ 
        setLoading(true)
        try{
             const token=Cookies.get("adminToken");
            await dispatch(ApproveShopById({id:sellerId},token))
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
            await dispatch(rejectShopById({id,reason},token))

        }catch(e){

        }finally{
             setRejection(false);
        }

    }


    return (
        <>
        <div className="grid grid-cols-1 w-full p-5 gap-5">
            <div className=" w-full">
                <h1 className="text-2xl md:text-3xl font-bold">Shop Data</h1>
            </div>
<div className="p-5 w-full">

<ShopDataCard seller={seller}/>
            </div>
            <div className="p-5 w-full grid grid-cols-1 gap-5 p-5">

        </div>
            </div>
      </>
    )
}
