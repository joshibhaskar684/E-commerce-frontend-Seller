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
DELETE_CATEGORY_FAILURE,
GET_DELETED_CATEGORIES_REQUEST,
GET_DELETED_CATEGORIES_SUCCESS,
GET_DELETED_CATEGORIES_FAILURE,
RESTORE_CATEGORY_REQUEST,
RESTORE_CATEGORY_SUCCESS,
RESTORE_CATEGORY_FAILURE            } from "./actiontype";

import Cookies from "js-cookie";
import axios from "axios";

import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

// The backend answers with a plain body / stack trace, so keep the messages short
// and derive the useful ones from the status code.
const errorMessage = (error, fallback) => {
    const status = error?.response?.status;
    if (status === 400) return "Invalid request - the name may already be in use.";
    if (status === 404 || status === 500) return "Category not found on the server.";
    return fallback;
};


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
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: respose.data });
        toast.success("Category created successfully");
        return true;
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error(errorMessage(error, "Failed to create category"));
        return false;
    }finally{
        categoryData.setLoading?.(false)
    }
};


export const updateCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
        // const token = Cookies.get("token");
        // Endpoint is a PUT and expects { name, parentId } where parentId carries
        // the id of the category being renamed.
        const respose= await axios.put(`${backend_url}/products/category/update`, {
            name: categoryData.name,
            parentId: categoryData.parentId,
        });
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: respose.data });
        toast.success("Category Updated successfully");
        return true;
    } catch (error) {
        dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: error.message });
        toast.error(errorMessage(error, "Failed to update category"));
        return false;
    }finally{
        categoryData.setLoading?.(false)
    }
};



export const deleteCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        // const token = Cookies.get("token");
        // Endpoint is a DELETE that reads a body: { id } selects the row, and
        // parentId has to be non null or the server side null check blows up.
        await axios.delete(`${backend_url}/products/category/delete`, {
            data: {
                id: categoryData.id,
                name: categoryData.name,
                parentId: categoryData.parentId ?? categoryData.id,
            },
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryData.id });
        toast.success("Category Deleted successfully");
        return true;
    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.message });
        toast.error(errorMessage(error, "Failed to Delete category"));
        return false;
    }finally{
        categoryData.setLoading?.(false)
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
        return true;
    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.message });
        toast.error("Failed to create category");
        return false;
    }finally{
        categoryData.setLoading?.(false)
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
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: respose.data });
    } catch (error) {

        toast.error("Failed to fetch categories",error.message);

        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }
};





export const getDeletedCategories = () => async (dispatch) => {
    dispatch({ type: GET_DELETED_CATEGORIES_REQUEST });
    try {
        const respose= await axios.get(`${backend_url}/products/category/deleted`);
        dispatch({ type: GET_DELETED_CATEGORIES_SUCCESS, payload: respose.data });
    } catch (error) {

        toast.error("Failed to fetch deleted categories",error.message);

        dispatch({ type: GET_DELETED_CATEGORIES_FAILURE, payload: error.message });
    }
};


export const restoreCategory = (categoryData) => async (dispatch) => {
    dispatch({ type: RESTORE_CATEGORY_REQUEST });
    try {
        // Endpoint is a PUT. The id of the category travels in `parentId` (same as
        // update) and `status` has to be sent or the server refuses the action.
        await axios.put(`${backend_url}/products/category/restore`, {
            id: categoryData.id,
            name: categoryData.name,
            parentId: categoryData.id,
            status: "ACTIVE",
        });
        dispatch({ type: RESTORE_CATEGORY_SUCCESS, payload: categoryData.id });
        toast.success("Category restored successfully");
        return true;
    } catch (error) {
        dispatch({ type: RESTORE_CATEGORY_FAILURE, payload: error.message });
        toast.error(errorMessage(error, "Failed to restore category"));
        return false;
    }finally{
        categoryData.setLoading?.(false)
    }
};
