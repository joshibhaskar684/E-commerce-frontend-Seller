import { FaUser, FaUserMd } from "react-icons/fa";

export default function UserDetails ({image,name,email,phone}) {
    return (
        <>
                <div className="grid grid-cols-1 md:grid-cols-2 border p-5 gap-3 ">
                    <div className="grid grid-cols-1  ">
                        <FaUser  className="w-[100px] h-[100px] rounded-full border"/>
                                           </div>
                    <div className="grid   grid-cols-1">
                        <h1 className=" font-bold">Name : <span className="font-normal">{name}</span></h1>
                        
                        <h1 className=" font-bold">Email : <span className="font-normal">{email}</span></h1>
                        
                        <h1 className=" font-bold">Phone : <span className="font-normal">{phone}</span></h1>
                        
                    </div>
                </div>
        </>
    )
}