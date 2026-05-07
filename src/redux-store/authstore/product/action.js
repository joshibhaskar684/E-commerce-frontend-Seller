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
        GET_PRODUCTS_BY_ID_REQUEST,
        GET_PRODUCTS_BY_ID_SUCCESS,
        GET_PRODUCTS_BY_ID_FAILURE,
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
    const token = data.token;
    dispatch({ type: CREATE_PRODUCTS_REQUEST});
    try {
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products`, data,
             {
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: respose.data });
        toast.success("Product created successfully");
    } catch (error) {
        toast.error("Failed to create Products",error.message);
        dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
          }
};
export const getProductsForSeller = (data) => async (dispatch) => {

    console.log("getproducts action called with data:", data);      
    dispatch({ type: GET_PRODUCTS_REQUEST});
    const pageno=data.pageno-1;
    const pagesize=data.pagesize||12;
    const token = data.token;
    console.log("getproducts")
    try {
        // const token = Cookies.get("token");
        const respose= await axios.get(`${backend_url}/products/page/seller`,
            
             {
            headers: {
                Authorization: `Bearer ${token}`,
            },
                params:{
                    pageno,
                    pagesize
                }}
        );

        console.log(respose,"getproducts  vs")
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to fetch Products",error.message);
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
          }
};

export const getProducts = (data) => async (dispatch) => {
    console.log("getproducts action called with data:", data);      
    dispatch({ type: GET_PRODUCTS_REQUEST});
    const pageno=data.pageno-1;
    const pagesize=data.pagesize||12;
    console.log("getproducts")
    try {
        // const token = Cookies.get("token");
        const respose= await axios.get(`${backend_url}/products/page`,
            {
                params:{
                    pageno,
                    pagesize
                }
            }
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );

        console.log(respose,"getproducts  vs")
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to fetch Products",error.message);
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
          }
};


export const getProductsByIdSeller = (data) => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_ID_REQUEST});
    const id=data.productId;
    const token = data.token;
    console.log("getproducts id" ,id)
    try {
        // const token = Cookies.get("token");
        const respose= await axios.get(`${backend_url}/products/seller/${id}`,
             {
            headers: {
                Authorization: `Bearer ${token}`,
            },}
        );
        console.log(respose, "product by id ")
        dispatch({ type: GET_PRODUCTS_BY_ID_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to fetch Product By ID",error.message);
        dispatch({ type:GET_PRODUCTS_BY_ID_FAILURE, payload: error.message });
          }
};

export const getProductsById = (data) => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_BY_ID_REQUEST});
    const id=data.productId;
    console.log("getproducts id" ,id)
    try {
        // const token = Cookies.get("token");
        const respose= await axios.get(`${backend_url}/products/${id}`
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        console.log(respose, "product by id ")
        dispatch({ type: GET_PRODUCTS_BY_ID_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to fetch Product By ID",error.message);
        dispatch({ type:GET_PRODUCTS_BY_ID_FAILURE, payload: error.message });
          }
};
export const updateProductsById = (data) => async (dispatch) => {
    dispatch({ type:UPDATE_PRODUCTS_REQUEST});
    const id=data.id;
    console.log("update products id")
    try {
        // const token = Cookies.get("token");
        const respose= await axios.put(`${backend_url}/products/update/${id}`, data
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: UPDATE_PRODUCTS_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to UPDATE Product By ID",error.message);
        dispatch({ type:UPDATE_PRODUCTS_FAILURE, payload: error.message });
          }
};

export const deleteProductsById = (data) => async (dispatch) => {
    dispatch({ type:DELETE_PRODUCTS_REQUEST});
    const id=data.id;
    console.log("DELETE products id")
    try {
        // const token = Cookies.get("token");
        const respose= await axios.put(`${backend_url}/products/delete/${id}`, data
            //  {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },}
        );
        dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: respose.data });
       
    } catch (error) {
        toast.error("Failed to delete Product By ID",error.message);
        dispatch({ type:DELETE_PRODUCTS_FAILURE, payload: error.message });
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
