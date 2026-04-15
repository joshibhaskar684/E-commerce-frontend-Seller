import { FaProductHunt } from "react-icons/fa";
import {

    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAILURE,

    LOGIN_ADMIN_FAILURE,

    LOGIN_ADMIN_REQUEST,
    LOGIN_ADMIN_SUCCESS,
    LOGOUT_ADMIN_FAILURE,
    LOGOUT_ADMIN_REQUEST,
    LOGOUT_ADMIN_SUCCESS,
} from "./actiontype";

const initalstate = {
    ADMIN: null,
    
    token: null,
    products: [],
    productsdetails: null,
    payload: null,
    error: null,
    loading: false
};

export default function AdminReducer(state = initalstate, action) {
    switch (action.type) {
        case REGISTER_ADMIN_REQUEST:
        case LOGIN_ADMIN_REQUEST:
            return { ...state, loading: true }
        case REGISTER_ADMIN_SUCCESS:
              return { ...state, ADMIN: action.payload, loading: false }
        case LOGIN_ADMIN_SUCCESS:
            return { ...state, ADMIN: action.payload, loading: false }
        case REGISTER_ADMIN_FAILURE:
        case LOGIN_ADMIN_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case LOGOUT_ADMIN_REQUEST:
            return { ...state, loading: true }
        case LOGOUT_ADMIN_SUCCESS:
            return { ...state, loading: false }
        case LOGOUT_ADMIN_FAILURE:
            return { ...state, loading: false }

        default:
            return state;
    }
}