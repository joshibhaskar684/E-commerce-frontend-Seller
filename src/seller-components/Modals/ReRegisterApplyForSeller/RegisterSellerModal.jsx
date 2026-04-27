
"use client";
import RegisterComponent from "@/seller-components/RegisterComponent/RegisterComponent";
import { Modal } from "@mui/material";

export default function RegisterSellerModal({handleSubmit,handleChange,handleFileUpload,loading,setOpenmodal, openModal }) {
    const handleClose = () => {
        setOpenmodal(openModal ? false : true);
    }
    return (
        <>
            <Modal open={openModal} onClose={handleClose}>
                <div className="z-50  bg-transparent/70  h-full w-full grid grid-cols-1 p-10 ">
                    <div className="border flex flex-col gap-5 bg-foreground text-background p-5  md:pt-20">
                       
 <RegisterComponent
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleFileUpload={handleFileUpload}
      loading={loading}
    />
    

                    </div>
                </div>
            </Modal>

        </>
    )
}
