import { FaUser, FaUserMd } from "react-icons/fa";

export default function UserDetails({ name, email, phone ,openModal,openModal1,setOpenmodal,setOpenmodal1,loading}) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2  md:border-b p-5 gap-3 md:mt-15">
                <div className="grid grid-cols-1 place-items-center   p-2 ">
                    <FaUser className="w-[150px] h-[150px] rounded-full border p-4" />
                </div>
                <div className="grid   grid-cols-1">
                    <h1 className=" font-bold">Name : <span className="font-normal">{name}</span></h1>

                    <h1 className=" font-bold">Email : <span className="font-normal">{email}</span></h1>

                    <h1 className=" font-bold">Phone : <span className="font-normal">{phone}</span></h1>

                </div>
                
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:mt-5 gap-5">
  <button 
  disabled={loading&&openModal1}
  onClick={() => setOpenmodal1(openModal1 ? false : true)}
  className=" border border-green-300 bg-foreground text-background cursor-pointer truncate rounded w-full md:w-1/2 p-5 text-center">
    Edit Profile
  </button>
  <button 
  
  onClick={() => setOpenmodal(openModal ? false : true)}
  disabled={loading&&openModal}
  className="border w-full md:w-1/2 cursor-pointer hover:bg-foreground hover:text-background truncate p-5 text-center">
    Change Password
  </button>
</div>
        </>
    )
}