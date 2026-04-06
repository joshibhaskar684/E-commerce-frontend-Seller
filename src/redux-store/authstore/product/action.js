import axios from "axios"
import { 
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_SUCCESS 

} from "./actiontype"
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createProduct = (data) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCTS_REQUEST});
    try {
        // const token = Cookies.get("token");
        const respose= await axios.post(`${backend_url}/products/category`, data
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
          }finally{
        categoryData?.setLoading(false)
    }
};
