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

const initalState={
    categories:null,
    products:null,
    productsdetails:null,
    data:[],
    loading:false,
    error:null
}
export const productReducer=(state=initalState,action)=>{
    switch(action.type){
        case GET_CATEGORIES_REQUEST:
        case GET_PRODUCTS_REQUEST:
        case CREATE_PRODUCTS_REQUEST:
            case GET_PRODUCTS_BY_ID_REQUEST:
                case UPDATE_PRODUCTS_REQUEST:
                    case DELETE_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case CREATE_PRODUCTS_SUCCESS:
            case UPDATE_PRODUCTS_SUCCESS:
            case DELETE_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
            case GET_PRODUCTS_SUCCESS:
                  return{
                ...state,
                loading:false,
                products:action.payload
            }
            case GET_PRODUCTS_BY_ID_SUCCESS:
                 return{
                ...state,
                loading:false,
                productsdetails:action.payload
            }
               
            case  GET_CATEGORIES_SUCCESS:
                 return{
                ...state,
                loading:false,
                categories:action.payload
            }
            case GET_PRODUCTS_FAILURE:
            case GET_PRODUCTS_BY_ID_FAILURE:
            case GET_CATEGORIES_FAILURE:
            case CREATE_PRODUCTS_FAILURE:
                case UPDATE_PRODUCTS_FAILURE:
                    case DELETE_PRODUCTS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}