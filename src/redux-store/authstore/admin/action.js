import { 
    REGISTER_ADMIN_REQUEST,
        REGISTER_ADMIN_SUCCESS,        
        REGISTER_ADMIN_FAILURE,

      LOGIN_ADMIN_FAILURE, 
      LOGIN_ADMIN_REQUEST,
       LOGIN_ADMIN_SUCCESS, 
       LOGOUT_ADMIN_FAILURE,
        LOGOUT_ADMIN_REQUEST,
         LOGOUT_ADMIN_SUCCESS, 
         
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const LoginADMIN=(data)=>async(dispatch)=>{
 
    try{
        dispatch({
            type:LOGIN_ADMIN_REQUEST
        })
        const res=await axios.post(`${backend_url}/auth/login/admin`,
            data,
            {
  withCredentials: true
});
        console.log(res);
        dispatch({
            type:LOGIN_ADMIN_SUCCESS,
            payload:res.data
        })
    }catch(e){
        toast.error(e.message,"error");
        dispatch({
            type:LOGIN_ADMIN_FAILURE,
            payload:e.message
        })
    }
    finally{
        //  window.location.reload();
    }
}

export const RegisterADMIN=(data,token)=>async(dispatch)=>{
  
 
    try{
        dispatch({
            type:REGISTER_ADMIN_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/create/ADMIN`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        console.log(res,"kjnjknkjnkjn");
        dispatch({
            type:REGISTER_ADMIN_SUCCESS,
            payload:res.data
        })


    }catch(e){
        console.log("error in register ADMIN action");
        console.log(e)
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:REGISTER_ADMIN_FAILURE,
            payload:e.message
        })
    }
    finally{
        //  window.location.reload();
    }
}



// export const getADMINDetails=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:GET_ADMIN_DETAILS_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/api/ADMIN/getADMINdetails`,data);
//         console.log(res);
//         dispatch({
//             type:GET_ADMIN_DETAILS_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:GET_ADMIN_DETAILS_FAILURE,
//             payload:e.message
//         })
//     }
// }



// export const LoginADMIN=(data)=>async(dispatch)=>{
 
//     try{
//         dispatch({
//             type:LOGIN_ADMIN_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/auth/login`,data);
//         console.log(res);
    
//         dispatch({
//             type:LOGIN_ADMIN_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         toast.error(e.message);
//         dispatch({
//             type:LOGIN_ADMIN_FAILURE,
//             payload:e.message
//         })
//     }
// }
// export const LogOutADMIN=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:LOGOUT_ADMIN_REQUEST,
//             payload:data
//         })
//         Cookies.remove("ADMINToken");
//         console.log(res);
//         dispatch({
//             type:LOGOUT_ADMIN_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:LOGOUT_ADMIN_FAILURE,
//             payload:e.message
//         })
//     }
// }

