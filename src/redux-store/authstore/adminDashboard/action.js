import { 
    GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST,
       GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS,        
        GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE,

    
         
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";


const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const totalCountForAdminDashBoard=(data)=>async(dispatch)=>{

 const token=data.token;
    try{
        dispatch({
            type:GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.get(
            `${backend_url}/auth/dashboard/total/count`,
            {
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
console.log(response,"respomse")
        dispatch({
            type:GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS,
            payload:response.data
        })


    }catch(e){
        console.log(e.message,"error")
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE,
            payload:e.message
        })
    }
   
}