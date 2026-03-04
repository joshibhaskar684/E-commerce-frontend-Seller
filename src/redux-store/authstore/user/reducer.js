import { FaProductHunt } from "react-icons/fa";
import { GET_USER_DETAILS_FAILURE, 
    GET_USER_DETAILS_REQUEST,
     GET_USER_DETAILS_SUCCESS,
      LOGIN_USER_FAILURE, 
      LOGIN_USER_REQUEST,
       LOGIN_USER_SUCCESS, 
       LOGOUT_USER_FAILURE,
        LOGOUT_USER_REQUEST,
         LOGOUT_USER_SUCCESS, 
         REGISTER_USER_FAILURE, 
         REGISTER_USER_REQUEST, 
         REGISTER_USER_SUCCESS, 
         UPDATE_USER_FAILURE,
          UPDATE_USER_REQUEST,
           UPDATE_USER_SUCCESS, 
           DELETE_USER_FAILURE,
            DELETE_USER_REQUEST, 
            DELETE_USER_SUCCESS, 
            } from "./actiontype";

const initalstate={
    user:null,
    token:null,
    products:[],
    productsdetails:null,
    payload:null,
    error:null,
     loading: false
};

 export default function userReducer(state=initalstate,action){
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {...state,loading:true}
        case REGISTER_USER_SUCCESS:
            return {...state,user:action.payload,loading:false}
        case REGISTER_USER_FAILURE:
            return {...state, error:action.payload,loading:false}
        case LOGIN_USER_REQUEST:
            return {...state,loading:true}
        case LOGIN_USER_SUCCESS:
            return {...state,user:action.payload,loading:false}
        case LOGIN_USER_FAILURE:
            return {...state,error:action.payload,loading:false}
        case LOGOUT_USER_REQUEST:
            return {...state,loading:true}
        case LOGOUT_USER_SUCCESS:
            return {...state,loading:false}
        case LOGOUT_USER_FAILURE:
            return {...state,loading:false}
        case GET_USER_DETAILS_REQUEST:
            return {...state,loading:true}
        case GET_USER_DETAILS_SUCCESS:
            return {...state,loading:false}
        case GET_USER_DETAILS_FAILURE:
            return {...state,loading:false}
        case UPDATE_USER_REQUEST:
            return {...state,loading:true}
        case UPDATE_USER_SUCCESS:
            return {...state,loading:false}
        case UPDATE_USER_FAILURE:
            return {...state,loading:false}
        case DELETE_USER_REQUEST:
            return {...state,loading:true}
        case DELETE_USER_SUCCESS:
            return {...state,loading:false}
        case DELETE_USER_FAILURE:
            return {...state,loading:false}
        default:
            return state;
    }
 }