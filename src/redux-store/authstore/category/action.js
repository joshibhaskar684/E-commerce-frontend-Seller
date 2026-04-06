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
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products/category`, categoryData
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category created successfully");
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to create category");
    }finally{
        categoryData.setLoading(false)
    }
};


export const updateCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products/category/update`, categoryData
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category Updated successfully");
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to update category");
    }finally{
        categoryData.setLoading(false)
    }
};



export const deleteCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products/category/delete`, categoryData
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: respose.data.category });
        toast.success("Category Deleted successfully");
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to Delete category");
    }finally{
        categoryData.setLoading(false)
    }
};
export const createCategorywithparent = (categoryData) => async (dispatch) => {
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
    }finally{
        categoryData.setLoading(false)
    }

};



export const getCategoriesWhereIdNotNull =(data) => async (dispatch) => {
    const pageno=data.pageno||0;
    const pagesize=data.pagesize||12;
    dispatch({ type: GET_CATEGORIES_REQUEST});
    try {
        const respose= await axios.get(`${backend_url}/products/category/sub-category`, {
  params: {
    pageno: pageno,
    pagesize: pagesize
  }
});
console.log(respose.data,"maincategories");
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: respose.data });
    } catch (error) {

        toast.error("Failed to fetch categories",error.message);

        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }
};
export const getCategoryMain = (data) => async (dispatch) => {
    const pageno=data.pageno||0;
    const pagesize=data.pagesize||12;
    dispatch({ type: GET_CATEGORIES_REQUEST});
    try {
        const respose= await axios.get(`${backend_url}/products/category/main`, {
  params: {
    pageno: pageno,
    pagesize: pagesize
  }
});
console.log(respose.data,"maincategories");
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: respose.data });
    } catch (error) {

        toast.error("Failed to fetch categories",error.message);

        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }
};



