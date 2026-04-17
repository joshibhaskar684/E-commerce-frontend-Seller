import { FaProductHunt } from "react-icons/fa";
import {


     GET_REJECTED_SHOPS_PAGE_REQUEST,
    GET_REJECTED_SHOPS_PAGE_SUCCESS,
    GET_REJECTED_SHOPS_PAGE_FAILURE,
    
GET_SUSPENDED_SHOPS_PAGE_REQUEST,
GET_SUSPENDED_SHOPS_PAGE_SUCCESS,
GET_SUSPENDED_SHOPS_PAGE_FAILURE,

        APPROVE_SHOPS_BY_ID_REQUEST,
        APPROVE_SHOPS_BY_ID_SUCCESS,
        APPROVE_SHOPS_BY_ID_FAILURE,

        
        REJECT_SHOPS_BY_ID_REQUEST,
        REJECT_SHOPS_BY_ID_SUCCESS,
        REJECT_SHOPS_BY_ID_FAILURE,
    
    GET_UNAPPROVED_SHOPS_PAGE_REQUEST,
    GET_UNAPPROVED_SHOPS_PAGE_SUCCESS,        
    GET_UNAPPROVED_SHOPS_PAGE_FAILURE,

    GET_APPROVED_SHOPS_PAGE_REQUEST,
        GET_APPROVED_SHOPS_PAGE_SUCCESS,        
        GET_APPROVED_SHOPS_PAGE_FAILURE,

        
        GET_SHOPS_BY_ID_REQUEST,
        GET_SHOPS_BY_ID_SUCCESS,
        GET_SHOPS_BY_ID_FAILURE,

    REGISTER_SHOPS_REQUEST,
    REGISTER_SHOPS_SUCCESS,
    REGISTER_SHOPS_FAILURE,

    LOGIN_SHOPS_FAILURE,
    LOGIN_SHOPS_REQUEST,
    LOGIN_SHOPS_SUCCESS,

    LOGOUT_SHOPS_FAILURE,
    LOGOUT_SHOPS_REQUEST,
    LOGOUT_SHOPS_SUCCESS,

} from "./actiontype";

const initalstate = {
    rejectedSHOPS:null,
    suspendedSHOPS:null,
    approveSHOPS: null,
    unapproveShops:null,
    SHOPS:null,
    Shopsdetails: null,
    payload: null,
    error: null,
    loading: false
};

export default function ShopsReducer(state = initalstate, action) {
    switch (action.type) {

        case  GET_REJECTED_SHOPS_PAGE_REQUEST:
        case GET_SUSPENDED_SHOPS_PAGE_REQUEST:
        case APPROVE_SHOPS_BY_ID_REQUEST:
        case REJECT_SHOPS_BY_ID_REQUEST:
        case  GET_SHOPS_BY_ID_REQUEST:
        case GET_APPROVED_SHOPS_PAGE_REQUEST:
        case GET_UNAPPROVED_SHOPS_PAGE_REQUEST:
        case REGISTER_SHOPS_REQUEST:
        case LOGIN_SHOPS_REQUEST:
            case LOGOUT_SHOPS_REQUEST:
            return { ...state, loading: true }

             case  GET_APPROVED_SHOPS_PAGE_SUCCESS:
            return { ...state, approveSHOPS: action.payload, loading: false }

            case  GET_UNAPPROVED_SHOPS_PAGE_SUCCESS:
            return { ...state, unapproveShops: action.payload, loading: false }

            case GET_SHOPS_BY_ID_SUCCESS:
            return { ...state, Shopsdetails: action.payload, loading: false }


        case  GET_REJECTED_SHOPS_PAGE_SUCCESS:
             return { ...state, rejectedSHOPS: action.payload, loading: false }

        case GET_SUSPENDED_SHOPS_PAGE_SUCCESS:
             return { ...state, suspendedSHOPS: action.payload, loading: false }


        case APPROVE_SHOPS_BY_ID_SUCCESS:
        case REJECT_SHOPS_BY_ID_SUCCESS:
        case LOGOUT_SHOPS_SUCCESS:
        case REGISTER_SHOPS_SUCCESS:
        case LOGIN_SHOPS_SUCCESS:
            return { ...state, SHOPS: action.payload, loading: false }


        
        case  GET_REJECTED_SHOPS_PAGE_FAILURE:
        case GET_SUSPENDED_SHOPS_PAGE_FAILURE:
        case APPROVE_SHOPS_BY_ID_FAILURE:
        case REJECT_SHOPS_BY_ID_FAILURE:
        case GET_SHOPS_BY_ID_FAILURE:
        case  GET_APPROVED_SHOPS_PAGE_FAILURE:
        case  GET_UNAPPROVED_SHOPS_PAGE_FAILURE:
        case REGISTER_SHOPS_FAILURE:
        case LOGIN_SHOPS_FAILURE:
        case LOGOUT_SHOPS_FAILURE:
            return { ...state, error: action.payload, loading: false }


            default:
            return state;
    }
}