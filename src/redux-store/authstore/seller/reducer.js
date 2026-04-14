import { FaProductHunt } from "react-icons/fa";
import {

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

const initalstate = {
    SELLER: null,
    
    token: null,
    products: [],
    productsdetails: null,
    payload: null,
    error: null,
    loading: false
};

export default function sellerReducer(state = initalstate, action) {
    switch (action.type) {
        case REGISTER_SELLER_REQUEST:
        case LOGIN_SELLER_REQUEST:
            return { ...state, loading: true }
        case REGISTER_SELLER_SUCCESS:
              return { ...state, SELLER: action.payload, loading: false }
        case LOGIN_SELLER_SUCCESS:
            return { ...state, SELLER: action.payload, loading: false }
        case REGISTER_SELLER_FAILURE:
        case LOGIN_SELLER_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case LOGOUT_SELLER_REQUEST:
            return { ...state, loading: true }
        case LOGOUT_SELLER_SUCCESS:
            return { ...state, loading: false }
        case LOGOUT_SELLER_FAILURE:
            return { ...state, loading: false }

        default:
            return state;
    }
}