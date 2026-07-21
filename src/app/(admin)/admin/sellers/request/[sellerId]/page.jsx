"use client"

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import { getSellerById, ApproveSellerById, rejectSellerById } from "@/redux-store/authstore/seller/action";
import SellerDataCard from "@/components/Admin/Cards/SellerDataCard/SellerDataCard";
import RejectSellerModal from "@/components/Admin/Modals/RejectSellerModal";

export default function SellerDetailsPage() {
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState("");
    const [rejection, setRejection] = useState(false);
    const [openModal, setOpenmodal] = useState(false);
    
    const params = useParams();
    const sellerId = params.sellerId;
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.sellerReducer.sellerdetails);

    useEffect(() => {
        handleFetchingSellerData();
    }, [])

    const handleFetchingSellerData = () => {
        const token = Cookies.get("adminToken");
        dispatch(getSellerById({ id: sellerId }, token)) 
    }

    const ApproveRequest = async () => { 
        setLoading(true)
        try {
            const token = Cookies.get("adminToken");
            await dispatch(ApproveSellerById({id: sellerId}, token))
            window.location.reload();
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    } 
    
    const handleRejectSeller = async (e) => {
        e.preventDefault();
        setRejection(true);
        try {
            const token = Cookies.get("adminToken");
            await dispatch(rejectSellerById({id: sellerId, reason}, token));
            window.location.reload();
        } catch(e) {
            console.error(e);
        } finally {
            setRejection(false);
        }
    }

    return (
        <div className="w-full h-full overflow-y-auto hide-scrollbar p-4 md:p-8 pt-6">
            <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Seller Request Details</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Review the complete application before approving or rejecting.
                    </p>
                </div>

                <SellerDataCard seller={seller} />

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-zinc-950 hover:bg-yellow-400 h-11 px-8 py-2 flex-1 shadow-sm"
                        onClick={() => ApproveRequest()}
                    >
                        {loading ? "Approving..." : "Approve Seller"}
                    </button>

                    <button 
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 border border-red-200 bg-white hover:bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-background dark:hover:bg-red-950/50 h-11 px-8 py-2 flex-1 shadow-sm" 
                        onClick={() => setOpenmodal(true)}
                    >
                        Reject Seller
                    </button>
                </div>
            </div>
            
            <RejectSellerModal 
                setReason={setReason}  
                reason={reason} 
                setOpenmodal={setOpenmodal} 
                openModal={openModal} 
                rejection={rejection} 
                sellerId={sellerId} 
                handleRejectSeller={handleRejectSeller}
            />
        </div>
    )
}