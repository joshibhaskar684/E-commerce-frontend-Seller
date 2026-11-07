import { 

      LOGIN_USER_FAILURE, 
      LOGIN_USER_REQUEST,
       LOGIN_USER_SUCCESS, 
       LOGOUT_USER_FAILURE,
        LOGOUT_USER_REQUEST,
         LOGOUT_USER_SUCCESS, 
         
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const VerifyForSeller = (data) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_USER_REQUEST,
            payload: data
        });
        const res = await axios.post(`${backend_url}/auth/login/verify`,
            data,
            {
                withCredentials: true
            });

        const successMsg = res.data?.message || "Email verified successfully! You can now complete registration.";
        toast.success(successMsg);

        dispatch({
            type: LOGIN_USER_SUCCESS,
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
                errorMsg = "Invalid email or password. Please check your credentials.";
            } else if (e.message === "Network Error") {
                errorMsg = "Unable to connect to server. Please check your internet connection.";
            } else {
                errorMsg = e.message || "Email verification failed. Please try again.";
            }
        } else if (typeof errorMsg === "string" && errorMsg.toLowerCase().includes("bad credentials")) {
            errorMsg = "Invalid email or password. Please try again.";
        }

        toast.error(errorMsg);
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
    }
}




// export const getUserDetails=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:GET_USER_DETAILS_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/api/user/getuserdetails`,data);
//         console.log(res);
//         dispatch({
//             type:GET_USER_DETAILS_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:GET_USER_DETAILS_FAILURE,
//             payload:e.message
//         })
//     }
// }



// export const LoginSeller=(data)=>async(dispatch)=>{
 
//     try{
//         dispatch({
//             type:LOGIN_USER_REQUEST,
//             payload:data
//         })
//         const res=await axios.post(`${backend_url}/auth/login`,data);
//         console.log(res);
    
//         dispatch({
//             type:LOGIN_USER_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         toast.error(e.message);
//         dispatch({
//             type:LOGIN_USER_FAILURE,
//             payload:e.message
//         })
//     }
// }
// export const LogOutSeller=(data)=>async(dispatch)=>{
//     try{
//         dispatch({
//             type:LOGOUT_USER_REQUEST,
//             payload:data
//         })
//         Cookies.remove("sellerToken");
//         console.log(res);
//         dispatch({
//             type:LOGOUT_USER_SUCCESS,
//             payload:res.data
//         })
//     }catch(e){
//         dispatch({
//             type:LOGOUT_USER_FAILURE,
//             payload:e.message
//         })
//     }
// }

