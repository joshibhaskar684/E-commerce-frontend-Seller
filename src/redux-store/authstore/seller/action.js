import {
    GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST,
    GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS,
    GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE,


    TOTAL_SELLER_COUNT_DATA_REQUEST,
    TOTAL_SELLER_COUNT_DATA_SUCCESS,
    TOTAL_SELLER_COUNT_DATA_FAILURE,

    GET_SELLER_PROFILE_REQUEST,
    GET_SELLER_PROFILE_SUCCESS,
    GET_SELLER_PROFILE_FAILURE,

    GET_REJECTED_SELLER_PAGE_REQUEST,
    GET_REJECTED_SELLER_PAGE_SUCCESS,
    GET_REJECTED_SELLER_PAGE_FAILURE,

    GET_SUSPENDED_SELLER_PAGE_REQUEST,
    GET_SUSPENDED_SELLER_PAGE_SUCCESS,
    GET_SUSPENDED_SELLER_PAGE_FAILURE,


    GET_APPROVED_SELLER_PAGE_REQUEST,
    GET_APPROVED_SELLER_PAGE_SUCCESS,
    GET_APPROVED_SELLER_PAGE_FAILURE,

    GET_UNAPPROVED_SELLER_PAGE_REQUEST,
    GET_UNAPPROVED_SELLER_PAGE_SUCCESS,
    GET_UNAPPROVED_SELLER_PAGE_FAILURE,

    GET_SELLER_BY_ID_REQUEST,
    GET_SELLER_BY_ID_SUCCESS,
    GET_SELLER_BY_ID_FAILURE,

    APPROVE_SELLER_BY_ID_REQUEST,
    APPROVE_SELLER_BY_ID_SUCCESS,
    APPROVE_SELLER_BY_ID_FAILURE,


    REJECT_SELLER_BY_ID_REQUEST,
    REJECT_SELLER_BY_ID_SUCCESS,
    REJECT_SELLER_BY_ID_FAILURE,

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




export const totalShopsCountForSellerDashBoard = (data) => async (dispatch) => {

    const token = data.token;
    try {
        dispatch({
            type: GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/shops/seller/shop/count`,
            {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response, "respomse")
        dispatch({
            type: GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log(e.message, "error")
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE,
            payload: e.message
        })
    }

}


export const totalSellerCountForAdmin = (data) => async (dispatch) => {


    const token = data.token;
    try {
        dispatch({
            type: TOTAL_SELLER_COUNT_DATA_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/seller/count`,
            {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response, "respomse")
        dispatch({
            type: TOTAL_SELLER_COUNT_DATA_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log(e.message, "error")
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: TOTAL_SELLER_COUNT_DATA_FAILURE,
            payload: e.message
        })
    }

}

export const getSellerProfile = (data) => async (dispatch) => {
    const token = data.token;
    console.log(token, data, "token in action");
    try {
        dispatch({
            type: GET_SELLER_PROFILE_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/seller/profile`,
            {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response, "kjnjknkjnkjn");
        dispatch({
            type: GET_SELLER_PROFILE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_SELLER_PROFILE_FAILURE,
            payload: e.message
        })
    }

}


export const getRejectedSeller = (data, token) => async (dispatch) => {


    const pageno = data.pageno - 1;
    const pagesize = data.pagesize;
    try {
        dispatch({
            type: GET_REJECTED_SELLER_PAGE_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/seller/rejected/seller/page`,
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

        console.log(response, "kjnjknkjnkjn");
        dispatch({
            type: GET_REJECTED_SELLER_PAGE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_REJECTED_SELLER_PAGE_FAILURE,
            payload: e.message
        })
    }

}


export const getSuspendedSeller = (data, token) => async (dispatch) => {


    const pageno = data.pageno - 1;
    const pagesize = data.pagesize;
    try {
        dispatch({
            type: GET_SUSPENDED_SELLER_PAGE_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/seller/suspended/seller/page`,
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

        console.log(response, "kjnjknkjnkjn");
        dispatch({
            type: GET_SUSPENDED_SELLER_PAGE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_SUSPENDED_SELLER_PAGE_FAILURE,
            payload: e.message
        })
    }

}




export const rejectSellerById = (data, token) => async (dispatch) => {

    const id = data.id;

    try {
        dispatch({
            type: REJECT_SELLER_BY_ID_REQUEST,
            payload: data
        })
        const res = await axios.post(`${backend_url}/auth/seller/reject/seller/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        console.log(res, "kjnjknkjnkjn");
        dispatch({
            type: REJECT_SELLER_BY_ID_SUCCESS,
            payload: res.data
        })
        toast.success("Seller rejected successfully");
    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: REJECT_SELLER_BY_ID_FAILURE,
            payload: e.message
        })
    }

}


export const ReApproveSellerById = (data, token) => async (dispatch) => {

    const id = data.id;
    try {
        dispatch({
            type: APPROVE_SELLER_BY_ID_REQUEST,
            payload: data
        })
        const res = await axios.post(`${backend_url}/auth/seller/approve/seller/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        console.log(res, "kjnjknkjnkjn");
        dispatch({
            type: APPROVE_SELLER_BY_ID_SUCCESS,
            payload: res.data
        })
        toast.success("Seller Approved successfully");

    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: APPROVE_SELLER_BY_ID_FAILURE,
            payload: e.message
        })
    }

}

export const SuspendSellerById = (data, token) => async (dispatch) => {

    const id = data.id;
    try {
        dispatch({
            type: APPROVE_SELLER_BY_ID_REQUEST,
            payload: data
        })
        const res = await axios.post(`${backend_url}/auth/seller/suspend/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        dispatch({
            type: APPROVE_SELLER_BY_ID_SUCCESS,
            payload: res.data
        })
        toast.success("Seller suspended successfully");

    } catch (e) {
        console.log("error in suspend seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: APPROVE_SELLER_BY_ID_FAILURE,
            payload: e.message
        })
    }

}

export const ApproveSellerById = (data, token) => async (dispatch) => {

    const id = data.id;
    try {
        dispatch({
            type: APPROVE_SELLER_BY_ID_REQUEST,
            payload: data
        })
        const res = await axios.post(`${backend_url}/auth/seller/approve/seller/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        console.log(res, "kjnjknkjnkjn");
        dispatch({
            type: APPROVE_SELLER_BY_ID_SUCCESS,
            payload: res.data
        })
        toast.success("Seller Approved successfully");

    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: APPROVE_SELLER_BY_ID_FAILURE,
            payload: e.message
        })
    }

}



export const getSellerById = (data, token) => async (dispatch) => {

    console.log(data)
    const id = data.id;
    try {
        dispatch({
            type: GET_SELLER_BY_ID_REQUEST,
            payload: data
        })
        const res = await axios.get(`${backend_url}/auth/seller/check/seller/${id}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        console.log(res, "kjnjknkjnkjn");
        dispatch({
            type: GET_SELLER_BY_ID_SUCCESS,
            payload: res.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_SELLER_BY_ID_FAILURE,
            payload: e.message
        })
    }

}


export const getApprovedSeller = (data, token) => async (dispatch) => {


    const pageno = data.pageno - 1;
    const pagesize = data.pagesize;
    try {
        dispatch({
            type: GET_APPROVED_SELLER_PAGE_REQUEST,
            payload: data
        })



        const response = await axios.get(
            `${backend_url}/auth/seller/approve/seller/page`,
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

        console.log(response, "kjnjknkjnkjn");
        dispatch({
            type: GET_APPROVED_SELLER_PAGE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_APPROVED_SELLER_PAGE_FAILURE,
            payload: e.message
        })
    }

}


export const getUnApprovedSeller = (data, token) => async (dispatch) => {

    const pageno = data.pageno - 1;
    const pagesize = data.pagesize;
    try {
        dispatch({
            type: GET_UNAPPROVED_SELLER_PAGE_REQUEST,
            payload: data
        })


        const response = await axios.get(
            `${backend_url}/auth/seller/unapprove/seller/page`,
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

        console.log(response, "kjnjknkjnkjn");
        dispatch({
            type: GET_UNAPPROVED_SELLER_PAGE_SUCCESS,
            payload: response.data
        })


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: GET_UNAPPROVED_SELLER_PAGE_FAILURE,
            payload: e.message
        })
    }

}









export const LoginSeller = (data) => async (dispatch) => {

    try {
        dispatch({
            type: LOGIN_SELLER_REQUEST
        })
        const res = await axios.post(`${backend_url}/auth/login/seller`,
            data,
            {
                withCredentials: true
            });
        console.log(res);
        dispatch({
            type: LOGIN_SELLER_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        toast.error(e.message, "error");
        dispatch({
            type: LOGIN_SELLER_FAILURE,
            payload: e.message
        })
    }

}


export const RegisterSeller = (data, token) => async (dispatch) => {


    try {
        dispatch({
            type: REGISTER_SELLER_REQUEST,
            payload: data
        })
        const res = await axios.post(`${backend_url}/auth/seller/create/seller`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        console.log(res, "kjnjknkjnkjn");
        dispatch({
            type: REGISTER_SELLER_SUCCESS,
            payload: res.data
        })
        toast.success("Seller Registered successfully");


    } catch (e) {
        console.log("error in register seller action");
        console.log(e)
        const message =
            e.response?.data?.error ||
            e.response?.data ||
            e.message ||
            "Unknown error";

        toast.error(message);
        dispatch({
            type: REGISTER_SELLER_FAILURE,
            payload: e.message
        })
    }

}

