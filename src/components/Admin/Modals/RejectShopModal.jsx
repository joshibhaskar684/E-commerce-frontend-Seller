"use client";
import { Modal } from "@mui/material";

export default function RejectShopModal({ setReason,reason,setOpenmodal,rejection, openModal ,sellerId,handleRejectSeller}) {
    const handleClose = () => {
        setOpenmodal(openModal ? false : true);
    }
    return (
        <>
            <Modal open={openModal} onClose={handleClose}>
                <div className="z-50  bg-transparent/70  h-full w-full grid grid-cols-1 p-10 ">
                    <div className="border flex flex-col gap-5 bg-foreground text-background p-5  md:pt-20">
                        <div className="w-full">
                            <h1 className="text-center text-2xl md:text-4xl font-bold w-full h-full">
                               Reject Shop
                            </h1>
                        </div>
                        <div className="">
                            <h1 className="text-center ">
                            
                                Please Enter The Reason For Rejecting This Shop Request   
                                                        </h1>
                        </div>
                        <div className="border p-5 md:border-0 md:p-10">
                            <form className=" grid grid-cols-1 gap-5  md:p-15 md:border rounded" onSubmit={(e)=>handleRejectSeller(e)}>
                                  <input type="text" value={sellerId} className="border p-2 w-full cursor-not-allowed" readOnly name="mobile_no" />
                             
                                <textarea 
                                type="text"
                                 placeholder="Enter The Reason For Rejecting This Seller Request" 
                                 className="border p-2 w-full" 
                                 required
                                  name="reason"
                                   value={reason}
    onChange={(e) => setReason(e.target.value)}
                                    />
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <button type="submit" 
                                    disabled={rejection}
                                     className={`border cursor-pointer turncate p-5 w-full rounded font-bold text-md bg-foreground overflow-hidden text-background ${ rejection? "cursor-not-allowed bg-foreground text-background":"bg-yellow-500 "}`}>
                                        {rejection?"Submitting....":"Submit"}
                                        </button>

                                    <button 
                                    onClick={() => handleClose()}  
                                    className="border cursor-pointer font-bold text-md turncate overflow-hidden p-5 rounded w-full bg-foreground text-background">Close</button>

                                </div>
                            </form>
                        </div>
                        


                    </div>
                </div>
            </Modal>

        </>
    )
}
