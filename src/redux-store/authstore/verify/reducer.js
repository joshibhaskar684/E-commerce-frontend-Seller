import { FaProductHunt } from "react-icons/fa";
import { 
      LOGIN_USER_FAILURE, 
      LOGIN_USER_REQUEST,
       LOGIN_USER_SUCCESS, 
       LOGOUT_USER_FAILURE,
        LOGOUT_USER_REQUEST,
         LOGOUT_USER_SUCCESS, 
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

 export default function verifyReducer(state=initalstate,action){
    switch(action.type){
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
      
        default:
            return state;
    }
 }