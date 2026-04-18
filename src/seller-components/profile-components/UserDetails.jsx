import { FaUser } from "react-icons/fa";

export default function SellerDetails({
sellerdetails,
openModal,
openModal1,
setOpenmodal,
setOpenmodal1,
loading
}) {
return (
<> <div className="grid grid-cols-1 md:grid-cols-2 md:border-b p-5 gap-3 md:mt-15">


    {/* Avatar */}
    <div className="grid grid-cols-1 place-items-center p-2">
      <FaUser className="w-[150px] h-[150px] rounded-full border p-4" />
    </div>

    {/* Seller Info */}
    <div className="grid grid-cols-1 gap-1">
      <h1 className="font-bold">
        Business Name :{" "}
        <span className="font-normal">
          {sellerdetails?.businessName}
        </span>
      </h1>

      <h1 className="font-bold">
        Email :{" "}
        <span className="font-normal">
          {sellerdetails?.sellerEmail}
        </span>
      </h1>

      <h1 className="font-bold">
        Phone :{" "}
        <span className="font-normal">
          {sellerdetails?.mobileNo}
        </span>
      </h1>

      <h1 className="font-bold">
        Status :{" "}
        <span className="font-normal">
          {sellerdetails?.status}
        </span>
      </h1>

      <h1 className="font-bold">
        Address :{" "}
        <span className="font-normal">
          {sellerdetails?.address}
        </span>
      </h1>

      <h1 className="font-bold">
        City :{" "}
        <span className="font-normal">
          {sellerdetails?.city}
        </span>
      </h1>

      <h1 className="font-bold">
        State :{" "}
        <span className="font-normal">
          {sellerdetails?.state}
        </span>
      </h1>

      <h1 className="font-bold">
        Pincode :{" "}
        <span className="font-normal">
          {sellerdetails?.pincode}
        </span>
      </h1>

      <h1 className="font-bold">
        Created At :{" "}
        <span className="font-normal">
          {sellerdetails?.createdAt}
        </span>
      </h1>
    </div>
  </div>

  {/* Buttons */}
  <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:mt-5 gap-5">
    
    <button
      disabled={loading && openModal1}
      onClick={() => setOpenmodal1(!openModal1)}
      className="border border-green-300 bg-foreground text-background cursor-pointer truncate rounded w-full md:w-1/2 p-5 text-center"
    >
      Edit Profile
    </button>

    <button
      onClick={() => setOpenmodal(!openModal)}
      disabled={loading && openModal}
      className="border w-full md:w-1/2 cursor-pointer hover:bg-foreground hover:text-background truncate p-5 text-center"
    >
      Change Password
    </button>

  </div>
</>

);
}
