"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import { getShopById,ApproveShopById,rejectShopById } from "@/redux-store/authstore/shops/action";
import ShopDataCard from "@/components/Admin/Cards/ShopDataCard/ShopDataCard";
import RejectShopModal from "@/components/Admin/Modals/RejectShopModal";

export default function page() {
    const [loading,setLoading] = useState(false);
    const [reason, setReason] = useState("");
    const [rejection,setRejection] = useState(false);
    const [openModal, setOpenmodal] = useState(false);
    const params = useParams();
    const sellerId = params.sellerId;
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.ShopsReducer.Shopsdetails);

    useEffect(() => {
        handleFetchingSellerData();
    }, [])

    const handleFetchingSellerData = () => {
        const token = Cookies.get("adminToken");
        dispatch(getShopById({ id:sellerId},token )) 
    }

    const ApproveRequest = async() => { 
        console.log("approve shop")
        setLoading(true);
        try{
            const token = Cookies.get("adminToken");
            await dispatch(ApproveShopById({id:sellerId},token))
            window.location.reload();
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    } 

    const handleRejectSeller = async(e) => {
        e.preventDefault();
        setRejection(true);
        try{
            const token = Cookies.get("adminToken");
            await dispatch(rejectShopById({id:sellerId,reason},token));
            window.location.reload();
        } catch(e) {
            console.error(e);
        } finally {
            setRejection(false);
        }
    }

    return (
        <>
            <div className="w-full h-full overflow-y-auto hide-scrollbar p-4 md:p-8 pt-6">
                <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
                    
                    {/* Header */}
                    <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Seller Shop Request Data</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Review the details of this shop request before approving or rejecting it.
                        </p>
                    </div>

                    <ShopDataCard seller={seller}/>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <button 
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-background dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-11 px-8 py-2 w-full sm:w-auto shadow-sm ml-auto"
                            onClick={() => setOpenmodal(true)}
                        >
                            Reject Shop
                        </button>
                        
                        <button
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-white hover:bg-yellow-600 h-11 px-8 py-2 w-full sm:w-auto shadow-sm"
                            onClick={() => ApproveRequest()}
                        >
                            {loading ? "Approving..." : "Approve Shop"}
                        </button>
                    </div>
                </div>
            </div>

            <RejectShopModal 
                setReason={setReason}  
                reason={reason} 
                setOpenmodal={setOpenmodal} 
                openModal={openModal} 
                rejection={rejection} 
                sellerId={sellerId} 
                handleRejectSeller={handleRejectSeller}
            />
        </>
    )
}