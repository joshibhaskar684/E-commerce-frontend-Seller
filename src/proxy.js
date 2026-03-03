import Cookies from "js-cookie";
import {  NextRequest, NextResponse } from "next/server";

export async function proxy(request){
 const url = request.nextUrl.clone();

 const {pathname} = url;
 
   const sellerToken = request.cookies.get("sellerToken")?.value;
 

  if (pathname === "/seller-login") {
    if(sellerToken)
    {
    return NextResponse.redirect(new URL("/seller", request.url));
  }
  else{
 return NextResponse.next();
  }
  }

 if(pathname.startsWith("/seller")){
    if(!sellerToken){
        return NextResponse.redirect(new URL("/seller-login",request.url))
    }
    else {
      return NextResponse.next();
    }
 }



    return NextResponse.next();

}


export const config={
  matcher:["/admin/:path*","/seller/:path*","/seller-login"],
  
}

