import { 
    GET_USER_DETAILS_FAILURE, 
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    LOGIN_USER_FAILURE, 
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS, 
    GET_ALL_USERS_PAGE_FAILURE, 
    GET_ALL_USERS_PAGE_REQUEST, 
    GET_ALL_USERS_PAGE_SUCCESS, 
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

export const getUserListPage = (data) => async (dispatch) => {
    const token = data.token;
    const pageno = data.pageno;
    const pagesize = data.pagesize;
    try {
        dispatch({
            type: GET_ALL_USERS_PAGE_REQUEST,
            payload: data
        });

        const response = await axios.get(
            `${backend_url}/auth/users/page/data`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    pageno,
                    pagesize
                }
            }
        );
        dispatch({
            type: GET_ALL_USERS_PAGE_SUCCESS,
            payload: response.data
        });
        return { success: true, data: response.data };
    } catch (e) {
        const raw = e.response?.data?.message || e.response?.data?.error || e.response?.data || e.message || "Failed to load users";
        toast.error(typeof raw === "string" ? raw : "Failed to load users");
        dispatch({
            type: GET_ALL_USERS_PAGE_FAILURE,
            payload: e.message
        });
        return { success: false, error: e.message };
    }
};

export const getUserDetails = (data) => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_DETAILS_REQUEST,
            payload: data
        });
        const res = await axios.post(`${backend_url}/api/user/getuserdetails`, data);
        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: res.data
        });
        return { success: true, data: res.data };
    } catch (e) {
        dispatch({
            type: GET_USER_DETAILS_FAILURE,
            payload: e.message
        });
        return { success: false, error: e.message };
    }
};

export const LoginUser = (data) => async (dispatch) => {
    dispatch({
        type: LOGIN_USER_REQUEST,
        payload: data
    });
    try {
        const res = await axios.post(`${backend_url}/auth/login`, data, {
            withCredentials: true
        });

        if (res.data?.token) {
            Cookies.set("usertoken", res.data.token, { expires: 7 });
        }

        const successMsg = res.data?.message || "Login successful! Welcome back.";
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
                errorMsg = "Invalid email or password. Please try again.";
            } else if (e.response?.status === 404) {
                errorMsg = "Account not found. Please register first.";
            } else if (e.message === "Network Error") {
                errorMsg = "Unable to connect to server. Please check your internet connection.";
            } else {
                errorMsg = e.message || "Login failed. Please check your credentials.";
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
};

// Alias for backwards compatibility
export const LoginSeller = LoginUser;

export const LogOutUser = (data) => async (dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER_REQUEST,
            payload: data
        });
        Cookies.remove("usertoken");
        Cookies.remove("usertoken", { path: "/" });
        Cookies.remove("sellerToken");
        Cookies.remove("sellerToken", { path: "/" });
        Cookies.remove("verifyToken");
        Cookies.remove("verifyToken", { path: "/" });
        toast.success("Logged out successfully.");
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: null
        });
        return { success: true };
    } catch (e) {
        dispatch({
            type: LOGOUT_USER_FAILURE,
            payload: e.message
        });
        return { success: false, error: e.message };
    }
};

export const LogOutSeller = LogOutUser;

export const RegisterUser = (data) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        const payload = {
            name: data.name?.trim(),
            email: data.email?.trim(),
            password: data.password,
            mobileno: data.mobileno || data.mobile,
            mobile: data.mobile || data.mobileno
        };

        const res = await axios.post(`${backend_url}/auth/signup`, payload, {
            withCredentials: true
        });

        const successMsg = res.data?.message || "Registration successful! Please log in.";
        toast.success(successMsg);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
        return { success: true, message: successMsg, data: res.data };
    } catch (err) {
        let errorMsg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            (typeof err.response?.data === "string" ? err.response?.data : null);

        if (!errorMsg) {
            if (err.response?.status === 409) {
                errorMsg = "An account with this email already exists. Please log in.";
            } else if (err.response?.status === 400) {
                errorMsg = "Invalid registration details. Please check your inputs.";
            } else if (err.message === "Network Error") {
                errorMsg = "Unable to connect to server. Please check your internet connection.";
            } else {
                errorMsg = err.message || "Registration failed. Please try again.";
            }
        } else if (typeof errorMsg === "string" && (errorMsg.toLowerCase().includes("user already") || errorMsg.toLowerCase().includes("already exists"))) {
            errorMsg = "An account with this email already exists. Please log in.";
        }

        toast.error(errorMsg);
        dispatch({ type: REGISTER_USER_FAILURE, payload: errorMsg });
        return { success: false, error: errorMsg };
    }
};
