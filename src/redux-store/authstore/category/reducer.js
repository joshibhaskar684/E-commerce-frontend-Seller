 import { 
    CREATE_CATEGORY_REQUEST,
CREATE_CATEGORY_SUCCESS,
CREATE_CATEGORY_FAILURE,
GET_CATEGORIES_REQUEST,
GET_CATEGORIES_SUCCESS,
GET_CATEGORIES_FAILURE,
UPDATE_CATEGORY_REQUEST,
UPDATE_CATEGORY_SUCCESS,
UPDATE_CATEGORY_FAILURE,
DELETE_CATEGORY_REQUEST,
DELETE_CATEGORY_SUCCESS,
DELETE_CATEGORY_FAILURE,
GET_DELETED_CATEGORIES_REQUEST,
GET_DELETED_CATEGORIES_SUCCESS,
GET_DELETED_CATEGORIES_FAILURE,
RESTORE_CATEGORY_REQUEST,
RESTORE_CATEGORY_SUCCESS,
RESTORE_CATEGORY_FAILURE            } from "./actiontype";


const initialState = {
    categories: [],
    maincategories:[],
    deletedcategories:[],
    loading: false,
    error: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
        case GET_CATEGORIES_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case GET_DELETED_CATEGORIES_REQUEST:
        case RESTORE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false, 
                maincategories: action.payload,
            };
        case GET_DELETED_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                deletedcategories: action.payload,
            };
        case RESTORE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category?.id === action.payload?.id ? action.payload : category
                ),
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter((category) => category?.id !== action.payload),
            };
        case CREATE_CATEGORY_FAILURE:
        case GET_CATEGORIES_FAILURE:
        case UPDATE_CATEGORY_FAILURE:
        case DELETE_CATEGORY_FAILURE:
        case GET_DELETED_CATEGORIES_FAILURE:
        case RESTORE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;