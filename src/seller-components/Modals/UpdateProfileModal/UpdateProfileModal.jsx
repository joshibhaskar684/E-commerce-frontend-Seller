
"use client";
import { Modal } from "@mui/material";

export default function UpdateProfileModal({ setName,name, setMobile,mobileno,setOpenmodal,loading, openModal ,updateDetails}) {
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
                              Update Profile Details
                            </h1>
                        </div>
                        <div className="">
                            <h1 className="text-center ">
                            Name and Mobile no can be updated only and if want to update (either name or mobile no) then both the fields are required to be filled. In that case add the old data in feild which you dont want to update .
                                                        </h1>
                        </div>
                        <div className="border p-5 md:border-0 md:p-10">
                            <form className=" grid grid-cols-1 gap-5  md:p-15 md:border rounded" onSubmit={(e)=>updateDetails(e)}>
                                 
                                <input 
                                type="text"
                                 placeholder="Enter The Name" 
                                 className="border p-2 w-full" 
                                 required
                                  name="name"
                                   value={name}
    onChange={(e) => setName(e.target.value)}
                                    />
                                    <input 
                                type="text"
                                 placeholder="Enter The Mobile No" 
                                 className="border p-2 w-full" 
                                 required
                                  name="mobileno"
                                   value={mobileno}
    onChange={(e) => setMobile(e.target.value)}
                                    />
                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <button type="submit" 
                                    disabled={loading}
                                     className={`border cursor-pointer turncate p-5 w-full rounded font-bold text-md bg-foreground overflow-hidden text-background ${ loading? "cursor-not-allowed bg-background text-foreground":"bg-yellow-500 "}`}>
                                        {loading?"Submitting....":"Submit"}
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
