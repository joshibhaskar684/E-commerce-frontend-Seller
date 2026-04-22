import { FaProductHunt } from "react-icons/fa";
import {
     GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST,
       GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS,        
        GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE,
   
} from "./actiontype";

const initalstate = {
    AdminTotalData: null,
    
    token: null,
    products: [],
    productsdetails: null,
    payload: null,
    error: null,
    loading: false
};

export default function AdminDashBoardReducer(state = initalstate, action) {
    switch (action.type) {
        case GET_TOTAL_DATA_OF_AUTH_SERVICE_REQUEST:
            return { ...state, loading: true }

        case GET_TOTAL_DATA_OF_AUTH_SERVICE_SUCCESS:
              return { ...state, AdminTotalData: action.payload, loading: false }
        
        case GET_TOTAL_DATA_OF_AUTH_SERVICE_FAILURE:
            return { ...state, error: action.payload, loading: false }
       
        default:
            return state;
    }
}