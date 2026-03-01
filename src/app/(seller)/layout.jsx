import SellerDesktopBar from "@/seller-components/seller-navbar-desktop/Seller-desktop-bar";
import SellermobileNavbar from "@/seller-components/seller-navbar-mobile/Seller-mobile-Navbar";

export default function layout({children}){
    return(
        <>
        <SellermobileNavbar/>
        <div className="flex flex-row md:fixed h-full w-full">

            <SellerDesktopBar/>

            <div className="div md:overflow-hidden md:overflow-y-auto w-full p-5"> {children}</div>
        </div>
        </>
    )
}