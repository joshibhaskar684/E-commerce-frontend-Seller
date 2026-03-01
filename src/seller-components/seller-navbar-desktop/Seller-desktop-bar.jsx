import { FaAdjust, FaUserCircle } from "react-icons/fa";

export default function SellerDesktopBar() {

    const sidebardata=[
        {label:"DashBoard",link:"/seller",icon:FaAdjust },
        {label:"Products",link:"/seller/products",icon:FaAdjust },
        {label:"Orders",link:"/seller/orders",icon:FaAdjust },
        {label:"Create Products",link:"/seller/products/create",icon:FaAdjust },
        {label:"Check Delivery Status",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },
        {label:"DashBoard",link:"/",icon:FaAdjust },


    ]
    return (
        <>
            <div className="w-[400px] border-r h-screen hidden md:grid grid-cols-1 p-5 gap-3 bg-yellow-500    ">

                <div className=" flex flex-row gap-2 items-center ">
                    <img src="/QuickLogo.png" alt="logo image   " className='w-[40px] h-[40px] '></img>
                    <h1 className="text-2xl font-bold">
                        Quick Seller
                    </h1>
                </div>
                <div className=" grid grid-cols-1 gap-2 overflow-hidden overflow-y-auto h-full pt-10  hide-scrollbar ">


                 {
    sidebardata.map((item,index) => {
        const Icon = item.icon;
return (
  <a
    key={index}
    href={item.link}
    className="
      flex items-center gap-3
      px-4 py-2
      font-bold border rounded-md
      hover:bg-foreground hover:text-background
      transition-colors
    "
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="truncate">{item.label}</span>
  </a>
);
    })
}
                       </div>
                <a className=" flex flex-row gap-2 border items-center h-10 px-4 " href="/seller/profile">
                    <FaUserCircle className="text-2xl font-bold" />
                    <h1 className="text-md font-bold" href="/seller/profile">
                        Profile
                    </h1>
                </a>
            </div>
        </>
    )
}