import { 
    REGISTER_SELLER_REQUEST,
        REGISTER_SELLER_SUCCESS,        
        REGISTER_SELLER_FAILURE,

      LOGIN_SELLER_FAILURE, 
      LOGIN_SELLER_REQUEST,
       LOGIN_SELLER_SUCCESS, 
       LOGOUT_SELLER_FAILURE,
        LOGOUT_SELLER_REQUEST,
         LOGOUT_SELLER_SUCCESS, 
         
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const LoginSeller=(data)=>async(dispatch)=>{
 
    try{
        dispatch({
            type:LOGIN_SELLER_REQUEST
        })
        const res=await axios.post(`${backend_url}/auth/login/seller`,
            data,
            {
  withCredentials: true
});
        console.log(res);
        dispatch({
            type:LOGIN_SELLER_SUCCESS,
            payload:res.data
        })
    }catch(e){
        toast.error(e.message,"error");
        dispatch({
            type:LOGIN_SELLER_FAILURE,
            payload:e.message
        })
    }
    finally{
        //  window.location.reload();
    }
}

export const RegisterSeller=(data,token)=>async(dispatch)=>{
    console.log(data,"dataATREGISTER SELLER");
    console.log(token,"dataATREGISTER SELLER  token");
   
 
    try{
        dispatch({
            type:REGISTER_SELLER_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/create/seller`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        console.log(res,"kjnjknkjnkjn");
        dispatch({
            type:REGISTER_SELLER_SUCCESS,
            payload:res.data
        })


    }catch(e){
        console.log("error in register seller action");
        console.log(e)
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:REGISTER_SELLER_FAILURE,
            payload:e.message
        })
    }
    finally{
        //  window.location.reload();
    }
}



// export const getSELLERDetails=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:GET_SELLER_DETAILS_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/api/SELLER/getSELLERdetails`,data);
//         console.log(res);
//         dispatch({
//             type:GET_SELLER_DETAILS_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:GET_SELLER_DETAILS_FAILURE,
//             payload:e.message
//         })
//     }
// }



// export const LoginSeller=(data)=>async(dispatch)=>{
 
//     try{
//         dispatch({
//             type:LOGIN_SELLER_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/auth/login`,data);
//         console.log(res);
    
//         dispatch({
//             type:LOGIN_SELLER_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         toast.error(e.message);
//         dispatch({
//             type:LOGIN_SELLER_FAILURE,
//             payload:e.message
//         })
//     }
// }
// export const LogOutSeller=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:LOGOUT_SELLER_REQUEST,
//             payload:data
//         })
//         Cookies.remove("sellerToken");
//         console.log(res);
//         dispatch({
//             type:LOGOUT_SELLER_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:LOGOUT_SELLER_FAILURE,
//             payload:e.message
//         })
//     }
// }

