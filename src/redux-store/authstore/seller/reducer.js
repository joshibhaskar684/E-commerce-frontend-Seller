import { FaProductHunt } from "react-icons/fa";
import {


     GET_REJECTED_SELLER_PAGE_REQUEST,
    GET_REJECTED_SELLER_PAGE_SUCCESS,
    GET_REJECTED_SELLER_PAGE_FAILURE,
    
GET_SUSPENDED_SELLER_PAGE_REQUEST,
GET_SUSPENDED_SELLER_PAGE_SUCCESS,
GET_SUSPENDED_SELLER_PAGE_FAILURE,

        APPROVE_SELLER_BY_ID_REQUEST,
        APPROVE_SELLER_BY_ID_SUCCESS,
        APPROVE_SELLER_BY_ID_FAILURE,

        
        REJECT_SELLER_BY_ID_REQUEST,
        REJECT_SELLER_BY_ID_SUCCESS,
        REJECT_SELLER_BY_ID_FAILURE,
    
    GET_UNAPPROVED_SELLER_PAGE_REQUEST,
    GET_UNAPPROVED_SELLER_PAGE_SUCCESS,        
    GET_UNAPPROVED_SELLER_PAGE_FAILURE,

    GET_APPROVED_SELLER_PAGE_REQUEST,
        GET_APPROVED_SELLER_PAGE_SUCCESS,        
        GET_APPROVED_SELLER_PAGE_FAILURE,

        
        GET_SELLER_BY_ID_REQUEST,
        GET_SELLER_BY_ID_SUCCESS,
        GET_SELLER_BY_ID_FAILURE,

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
    rejectedseller:null,
    suspendedseller:null,
    approveseller: null,
    unapproveseller:null,
    seller:null,
    sellerdetails: null,
    payload: null,
    error: null,
    loading: false
};

export default function sellerReducer(state = initalstate, action) {
    switch (action.type) {

        case  GET_REJECTED_SELLER_PAGE_REQUEST:
        case GET_SUSPENDED_SELLER_PAGE_REQUEST:
        case APPROVE_SELLER_BY_ID_REQUEST:
        case REJECT_SELLER_BY_ID_REQUEST:
        case  GET_SELLER_BY_ID_REQUEST:
        case GET_APPROVED_SELLER_PAGE_REQUEST:
        case GET_UNAPPROVED_SELLER_PAGE_REQUEST:
        case REGISTER_SELLER_REQUEST:
        case LOGIN_SELLER_REQUEST:
            case LOGOUT_SELLER_REQUEST:
            return { ...state, loading: true }

             case  GET_APPROVED_SELLER_PAGE_SUCCESS:
            return { ...state, approveseller: action.payload, loading: false }

            case  GET_UNAPPROVED_SELLER_PAGE_SUCCESS:
            return { ...state, unapproveseller: action.payload, loading: false }

            case GET_SELLER_BY_ID_SUCCESS:
            return { ...state, sellerdetails: action.payload, loading: false }


        case  GET_REJECTED_SELLER_PAGE_SUCCESS:
             return { ...state, rejectedseller: action.payload, loading: false }

        case GET_SUSPENDED_SELLER_PAGE_SUCCESS:
             return { ...state, suspendedseller: action.payload, loading: false }


        case APPROVE_SELLER_BY_ID_SUCCESS:
        case REJECT_SELLER_BY_ID_SUCCESS:
        case LOGOUT_SELLER_SUCCESS:
        case REGISTER_SELLER_SUCCESS:
        case LOGIN_SELLER_SUCCESS:
            return { ...state, seller: action.payload, loading: false }


        
        case  GET_REJECTED_SELLER_PAGE_FAILURE:
        case GET_SUSPENDED_SELLER_PAGE_FAILURE:
        case APPROVE_SELLER_BY_ID_FAILURE:
        case REJECT_SELLER_BY_ID_FAILURE:
        case GET_SELLER_BY_ID_FAILURE:
        case  GET_APPROVED_SELLER_PAGE_FAILURE:
        case  GET_UNAPPROVED_SELLER_PAGE_FAILURE:
        case REGISTER_SELLER_FAILURE:
        case LOGIN_SELLER_FAILURE:
        case LOGOUT_SELLER_FAILURE:
            return { ...state, error: action.payload, loading: false }


            default:
            return state;
    }
}