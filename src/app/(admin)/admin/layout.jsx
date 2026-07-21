import Navbar from "@/components/Admin/Navbar/Navbar";
import Sidebar from "@/components/Admin/SideBar/sidebar";
import { cookies } from "next/headers";

export default async function Layout({ children }) {

      const cookieStore = await cookies();
   const token = cookieStore.get('adminToken')?.value ?? null
  return (<>
   <Navbar tokenPresent={token}/>
   <div className="flex w-full h-full fixed flex-row top-16">
                  <div className="">
                      <Sidebar/>
                  </div>
                  <div className="overflow-y-auto flex-1 p-5  hide-scrollbar pt-2 pb-24 ">
                       {children}
                  </div>
  
              </div>
      
  </>
     
     
  );
}