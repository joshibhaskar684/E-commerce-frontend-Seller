import axios from "axios"
import { 
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_SUCCESS ,
     GET_CATEGORIES_REQUEST,
        GET_CATEGORIES_SUCCESS,
        GET_CATEGORIES_FAILURE,
        GET_PRODUCTS_REQUEST,
        GET_PRODUCTS_SUCCESS,
        GET_PRODUCTS_FAILURE,
        UPDATE_PRODUCTS_REQUEST,
        UPDATE_PRODUCTS_SUCCESS,
        UPDATE_PRODUCTS_FAILURE,
        DELETE_PRODUCTS_REQUEST,
        DELETE_PRODUCTS_SUCCESS,
        DELETE_PRODUCTS_FAILURE

} from "./actiontype"
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createProduct = (data) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCTS_REQUEST});
    try {
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products`, data
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: respose.data });
        toast.success("Product created successfully");
    } catch (error) {
        toast.error("Failed to create Products",error.message);
        dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
          }
};
export const getProducts = (data) => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST});
    console.log("getproducts")
    try {
        // const token = Cookies.get("token");
        const respose= await axios.get(`${backend_url}/products`, data
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to fetch Products",error.message);
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
          }
};


export const getCategorytree = (data) => async (dispatch) => {
   
    dispatch({ type: GET_CATEGORIES_REQUEST});
    try {
        const respose= await axios.get(`${backend_url}/products/category/tree`);
console.log(respose.data,"categories");
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: respose.data });
    } catch (error) {

        toast.error("Failed to fetch categories",error.message);

        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
    }
};
