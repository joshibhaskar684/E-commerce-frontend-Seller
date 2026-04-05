 import { 
    CREATE_CATEGORY_REQUEST,
CREATE_CATEGORY_SUCCESS,
CREATE_CATEGORY_FAILURE,
GET_CATEGORIES_REQUEST,
GET_CATEGORIES_SUCCESS,
GET_CATEGORIES_FAILURE,
UPDATE_CATEGORY_REQUEST,
UPDATE_CATEGORY_SUCCESS,
UPDATE_CATEGORY_FAILURE,
DELETE_CATEGORY_REQUEST,
DELETE_CATEGORY_SUCCESS,
DELETE_CATEGORY_FAILURE            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


export const createCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/api/v1/category/create-category`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category created successfully");
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to create category");
    }
};

export const getCategories = () => async (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    try {
        const respose= await axios.get(`${backend_url}/api/v1/category/get-categories`);
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: respose.data.categories });
    } catch (error) {
        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }
};

export const updateCategory = (categoryId, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
        const token = Cookies.get("token");
        const respose= await axios.put(`${backend_url}/api/v1/category/update-category/${categoryId}`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category updated successfully");
    } catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to update category");
    }
};

export const deleteCategory = (categoryId) => async (dispatch) => { 
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        const token = Cookies.get("token");
        const respose= await axios.delete(`${backend_url}/api/v1/category/delete-category/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category deleted successfully");
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to delete category");
    }
};  

