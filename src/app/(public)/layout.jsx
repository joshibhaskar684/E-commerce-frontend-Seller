import { cookies } from "next/headers";
import Footer from "@/components/Footer/page";
import Navbar from "@/components/Navbar/page";

export default async function layout({ children }) {

          const cookieStore = await cookies();
       const token = cookieStore.get('sellerToken')?.value ?? null
    return (
        <>
        <Navbar tokenPresent={token}/>
            {children}
            <Footer/>
        </>
    )
}