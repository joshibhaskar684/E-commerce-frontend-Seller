import { 
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_SUCCESS 

} from "./actiontype"


const initalState={
    products:[],
    productsdetails:null,
    data:[],
    loading:false,
    error:null
}
export const productReducer=(state=initalState,action)=>{
    switch(action.type){
        
        case CREATE_PRODUCTS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case CREATE_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
            case CREATE_PRODUCTS_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}