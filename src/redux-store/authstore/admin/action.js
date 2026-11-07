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


export const LoginADMIN = (data) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_ADMIN_REQUEST
        });
        const res = await axios.post(`${backend_url}/auth/login/admin`,
            data,
            {
                withCredentials: true
            });

        const successMsg = res.data?.message || "Admin login successful! Welcome back.";
        toast.success(successMsg);

        dispatch({
            type: LOGIN_ADMIN_SUCCESS,
            payload: res.data
        });
        return { success: true, message: successMsg, data: res.data };
    } catch (e) {
        let errorMsg =
            e.response?.data?.message ||
            e.response?.data?.error ||
            (typeof e.response?.data === "string" ? e.response?.data : null);

        if (!errorMsg) {
            if (e.response?.status === 401) {
                errorMsg = "Invalid email or password. Please try again.";
            } else if (e.response?.status === 400 || e.response?.status === 403) {
                errorMsg = "Admin login failed. Your account does not have administrator privileges.";
            } else if (e.message === "Network Error") {
                errorMsg = "Unable to connect to server. Please check your internet connection.";
            } else {
                errorMsg = e.message || "Admin login failed. Please try again.";
            }
        } else if (typeof errorMsg === "string" && errorMsg.toLowerCase().includes("bad credentials")) {
            errorMsg = "Invalid email or password. Please try again.";
        }

        toast.error(errorMsg);
        dispatch({
            type: LOGIN_ADMIN_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
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

        dispatch({
            type:REGISTER_ADMIN_SUCCESS,
            payload:res.data
        })


    }catch(e){
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

