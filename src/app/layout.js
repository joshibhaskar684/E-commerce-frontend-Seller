import ReduxProvider from "@/redux-store/ReduxProvider";
import "./globals.css";
import { ToastContainer } from "react-toastify";


export const metadata = {
  title: "Quick for Business",
  description: "This is an business site of Quick where  business can register and sell their products in our site quicksin.in",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >


        <ToastContainer
  position="bottom-center"           // bottom center
  autoClose={1500}                  // shorter auto close
  hideProgressBar={true}            // hide progress bar for minimal look
  closeOnClick
  pauseOnHover
  draggable={false}                  // simpler, cleaner
  pauseOnFocusLoss={false}
  theme="colored"
  className="!w-80 sm:!w-96 !p-2 !text-sm !rounded-lg !shadow-lg"
/>
  
        <ReduxProvider>
        {children}
        </ReduxProvider>
       
      </body>
    </html>
  );
}
