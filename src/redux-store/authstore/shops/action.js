import { 
TOTAL_SHOPS_COUNT_DATA_REQUEST,
TOTAL_SHOPS_COUNT_DATA_SUCCESS,
TOTAL_SHOPS_COUNT_DATA_FAILURE,


GET_SHOPS_LIST_REQUEST,
GET_SHOPS_LIST_SUCCESS,
GET_SHOPS_LIST_FAILURE,

    SUSPEND_SHOP_BY_ID_REQUEST,
    SUSPEND_SHOP_BY_ID_SUCCESS,
    SUSPEND_SHOP_BY_ID_FAILURE,

    GET_REJECTED_SHOPS_PAGE_REQUEST,
    GET_REJECTED_SHOPS_PAGE_SUCCESS,
    GET_REJECTED_SHOPS_PAGE_FAILURE,
    
GET_SUSPENDED_SHOPS_PAGE_REQUEST,
GET_SUSPENDED_SHOPS_PAGE_SUCCESS,
GET_SUSPENDED_SHOPS_PAGE_FAILURE,

    
    GET_APPROVED_SHOPS_PAGE_REQUEST,
        GET_APPROVED_SHOPS_PAGE_SUCCESS,        
        GET_APPROVED_SHOPS_PAGE_FAILURE,

    GET_UNAPPROVED_SHOPS_PAGE_REQUEST,
        GET_UNAPPROVED_SHOPS_PAGE_SUCCESS,        
        GET_UNAPPROVED_SHOPS_PAGE_FAILURE,

        GET_SHOPS_BY_ID_REQUEST,
        GET_SHOPS_BY_ID_SUCCESS,
        GET_SHOPS_BY_ID_FAILURE,
                
        APPROVE_SHOPS_BY_ID_REQUEST,
        APPROVE_SHOPS_BY_ID_SUCCESS,
        APPROVE_SHOPS_BY_ID_FAILURE,

        
        REJECT_SHOPS_BY_ID_REQUEST,
        REJECT_SHOPS_BY_ID_SUCCESS,
        REJECT_SHOPS_BY_ID_FAILURE,

    REGISTER_SHOPS_REQUEST,
        REGISTER_SHOPS_SUCCESS,        
        REGISTER_SHOPS_FAILURE,

      LOGIN_SHOPS_FAILURE, 
      LOGIN_SHOPS_REQUEST,
       LOGIN_SHOPS_SUCCESS,

       LOGOUT_SHOPS_FAILURE,
        LOGOUT_SHOPS_REQUEST,
         LOGOUT_SHOPS_SUCCESS, 
         
            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const totalShopCountForAdmin=(data)=>async(dispatch)=>{
 
 
 const token=data.token;
    try{
        dispatch({
            type:TOTAL_SHOPS_COUNT_DATA_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.get(
            `${backend_url}/auth/shops/shop/count`,
            {
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
console.log(response,"respomse")
        dispatch({
            type:TOTAL_SHOPS_COUNT_DATA_SUCCESS,
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
            type:TOTAL_SHOPS_COUNT_DATA_FAILURE,
            payload:e.message
        })
    }
   
}



export const closeShopWithId=(data)=>async(dispatch)=>{
 
 
 const token=data.token;
 const id=data.id;  
    try{
        dispatch({
            type:GET_SHOPS_LIST_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.post(
            `${backend_url}/auth/shops/close/${id}`,{},
            {
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
console.log(response,"respomse")
        dispatch({
            type:GET_SHOPS_LIST_SUCCESS,
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
            type:GET_SHOPS_LIST_FAILURE,
            payload:e.message
        })
    }
   
}


export const getShopListIntro=(data)=>async(dispatch)=>{
  
 
 const token=data.token;
    try{
        dispatch({
            type:GET_SHOPS_LIST_REQUEST,
            payload:data
        })
       
        

        
 const response = await axios.get(
            `${backend_url}/auth/shops/apply/total/shop`,
            {
                
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type:GET_SHOPS_LIST_SUCCESS,
            payload:response.data
        })


    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_SHOPS_LIST_FAILURE,
            payload:e.message
        })
    }
   
}


export const SuspendShopByid=(data,token)=>async(dispatch)=>{

    const id=data.id;
 
    try{
        dispatch({
            type:SUSPEND_SHOP_BY_ID_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/shops/suspend/shop/${id}`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:SUSPEND_SHOP_BY_ID_SUCCESS,
            payload:res.data
        })
        toast.success("SHOPS rejected successfully");
    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:SUSPEND_SHOP_BY_ID_FAILURE,
            payload:e.message
        })
    }



}

export const getRejectedSHOPS=(data,token)=>async(dispatch)=>{
  
 
 const pageno=data.pageno-1;  
 const pagesize=data.pagesize;
    try{
        dispatch({
            type:GET_REJECTED_SHOPS_PAGE_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.get(
            `${backend_url}/auth/shops/rejected/shop/page`,
            {
                params: {
                    pageno,
                    pagesize,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type:GET_REJECTED_SHOPS_PAGE_SUCCESS,
            payload:response.data
        })


    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_REJECTED_SHOPS_PAGE_FAILURE,
            payload:e.message
        })
    }
   
}


export const getSuspendedSHOPS=(data,token)=>async(dispatch)=>{
  
 
 const pageno=data.pageno-1;  
 const pagesize=data.pagesize;
    try{
        dispatch({
            type:GET_SUSPENDED_SHOPS_PAGE_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.get(
            `${backend_url}/auth/shops/suspended/shop/page`,
            {
                params: {
                    pageno,
                    pagesize,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type:GET_SUSPENDED_SHOPS_PAGE_SUCCESS,
            payload:response.data
        })


    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_SUSPENDED_SHOPS_PAGE_FAILURE,
            payload:e.message
        })
    }
   
}




export const rejectShopById=(data,token)=>async(dispatch)=>{
  
    const id=data.id;
 
    try{
        dispatch({
            type:REJECT_SHOPS_BY_ID_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/shops/reject/shop/${id}`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:REJECT_SHOPS_BY_ID_SUCCESS,
            payload:res.data
        })
        toast.success("SHOPS rejected successfully");
    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:REJECT_SHOPS_BY_ID_FAILURE,
            payload:e.message
        })
    }
   
}



export const ApproveShopById=(data,token)=>async(dispatch)=>{
 const id=data.id;
    try{
        dispatch({
            type:APPROVE_SHOPS_BY_ID_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/shops/approve/shop/${id}`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:APPROVE_SHOPS_BY_ID_SUCCESS,
            payload:res.data
        })
toast.success("SHOPS Approved successfully");

    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type: APPROVE_SHOPS_BY_ID_FAILURE,
            payload:e.message
        })
    }
   
}



export const getShopById=(data,token)=>async(dispatch)=>{
  
 
 const id=data.id;
    try{
        dispatch({
            type:GET_SHOPS_BY_ID_REQUEST,
            payload:data
        })
        const res=await axios.get(`${backend_url}/auth/shops/check/shop/${id}`,
          
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:GET_SHOPS_BY_ID_SUCCESS,
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
            type:GET_SHOPS_BY_ID_FAILURE,
            payload:e.message
        })
    }
   
}


export const getApprovedSHOPS=(data,token)=>async(dispatch)=>{
  
 
 const pageno=data.pageno-1;  
 const pagesize=data.pagesize;
    try{
        dispatch({
            type:GET_APPROVED_SHOPS_PAGE_REQUEST,
            payload:data
        })
       
        
        
 const response = await axios.get(
            `${backend_url}/auth/shops/approve/shop/page`,
            {
                params: {
                    pageno,
                    pagesize,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type:GET_APPROVED_SHOPS_PAGE_SUCCESS,
            payload:response.data
        })


    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_APPROVED_SHOPS_PAGE_FAILURE,
            payload:e.message
        })
    }
   
}


export const getUnApprovedSHOPS=(data,token)=>async(dispatch)=>{
    
 const pageno=data.pageno-1;  
 const pagesize=data.pagesize;
    try{
        dispatch({
            type:GET_UNAPPROVED_SHOPS_PAGE_REQUEST,
            payload:data
        })
       

 const response = await axios.get(
            `${backend_url}/auth/shops/unapprove/shop/page`,
            {
                params: {
                    pageno,
                    pagesize,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type:GET_UNAPPROVED_SHOPS_PAGE_SUCCESS,
            payload:response.data
        })


    }catch(e){

         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:GET_UNAPPROVED_SHOPS_PAGE_FAILURE,
            payload:e.message
        })
    }
   
}









export const LoginSHOPS=(data)=>async(dispatch)=>{
 
    try{
        dispatch({
            type:LOGIN_SHOPS_REQUEST
        })
        const res=await axios.post(`${backend_url}/auth/login/SHOPS`,
            data,
            {
  withCredentials: true
});
        dispatch({
            type:LOGIN_SHOPS_SUCCESS,
            payload:res.data
        })
    }catch(e){
        toast.error(e.message,"error");
        dispatch({
            type:LOGIN_SHOPS_FAILURE,
            payload:e.message
        })
    }
   
}




export const Request2Shop=(data,token)=>async(dispatch)=>{
  
 
    try{
        dispatch({
            type:REGISTER_SHOPS_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/shops/applyforshop`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:REGISTER_SHOPS_SUCCESS,
            payload:res.data
        })
        toast.success("Application Submitted successfully");
        
    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:REGISTER_SHOPS_FAILURE,
            payload:e.message
        })
    }
  
}



export const CreateShop=(data,token)=>async(dispatch)=>{
  
 
    try{
        dispatch({
            type:REGISTER_SHOPS_REQUEST,
            payload:data
        })
        const res=await axios.post(`${backend_url}/auth/shops/create/shop`,
            data,
            {
                headers: {
      Authorization: `Bearer ${token}`
    }
});

        dispatch({
            type:REGISTER_SHOPS_SUCCESS,
            payload:res.data
        })
        toast.success("SHOP Registered successfully");

    }catch(e){
         const message =
    e.response?.data?.error ||
    e.response?.data ||
    e.message ||
    "Unknown error";

  toast.error(message);
        dispatch({
            type:REGISTER_SHOPS_FAILURE,
            payload:e.message
        })
    }
  
}

