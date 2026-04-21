"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import { closeShopWithId,SuspendShopByid,getShopById,rejectShopById} from "@/redux-store/authstore/shops/action";
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
        const token=Cookies.get("sellerToken");
        dispatch(getShopById({ id:sellerId},token )) 
    }

    const ApproveRequest=async()=>{ 
        setLoading(true)
        try{
             const token=Cookies.get("sellerToken");
            await dispatch(closeShopWithId({id:sellerId,token}))
           
        }
        catch(e){

        }finally{
            setLoading(false)
        }
    } 
    


    return (
        <>
        <div className="grid grid-cols-1 w-full p-5 gap-5 overflow-y-auto">
            <div className=" w-full">
                <h1 className="text-2xl md:text-3xl font-bold">Shop Data</h1>
            </div>
<div className="p-5 w-full">

<ShopDataCard seller={seller}/>
            </div>
            <div className="p-5 w-full grid grid-cols-1  gap-5 p-5">
<button
disabled={loading}
 className={`border p-5 text-xl font-bold rounded bg-yellow-500  cursor-pointer ${loading?" bg-background cursor-not-allowed":""}`}
 onClick={()=>ApproveRequest()}>
   {loading?"Closing....": "Close Shop"}
    </button>
            </div>
            </div>        </>
    )
}
