import { GET_USER_DETAILS_FAILURE, 
    GET_USER_DETAILS_REQUEST,
     GET_USER_DETAILS_SUCCESS,
      LOGIN_USER_FAILURE, 
      LOGIN_USER_REQUEST,
       LOGIN_USER_SUCCESS, 
       LOGOUT_USER_FAILURE,
        LOGOUT_USER_REQUEST,
         LOGOUT_USER_SUCCESS, 
         REGISTER_USER_FAILURE, 
         REGISTER_USER_REQUEST, 
         REGISTER_USER_SUCCESS, 
         UPDATE_USER_FAILURE,
          UPDATE_USER_REQUEST,
           UPDATE_USER_SUCCESS, 
           DELETE_USER_FAILURE,
            DELETE_USER_REQUEST, 
            DELETE_USER_SUCCESS, 
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserDetails=(data)=>async(dispatch)=>{
    try{
        dispatch({
            type:GET_USER_DETAILS_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/api/user/getuserdetails`,data);
        console.log(res);
        dispatch({
            type:GET_USER_DETAILS_SUCCESS,
            payload:res.data
        })
    }catch(e){
        dispatch({
            type:GET_USER_DETAILS_FAILURE,
            payload:e.message
        })
    }
}



export const LoginSeller=(data)=>async(dispatch)=>{
 
    try{
        dispatch({
            type:LOGIN_USER_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/login`,data);
        console.log(res);
    
        dispatch({
            type:LOGIN_USER_SUCCESS,
            payload:res.data
        })
    }catch(e){
        toast.error(e.message);
        dispatch({
            type:LOGIN_USER_FAILURE,
            payload:e.message
        })
    }
}
export const LogOutSeller=(data)=>async(dispatch)=>{
    try{
        dispatch({
            type:LOGOUT_USER_REQUEST,
            payload:data
        })
        Cookies.remove("sellerToken");
        console.log(res);
        dispatch({
            type:LOGOUT_USER_SUCCESS,
            payload:res.data
        })
    }catch(e){
        dispatch({
            type:LOGOUT_USER_FAILURE,
            payload:e.message
        })
    }
}

