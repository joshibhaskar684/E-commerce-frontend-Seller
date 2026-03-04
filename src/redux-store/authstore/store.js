import { configureStore } from '@reduxjs/toolkit';
// import authreducer from "./auth/reducer";
import { combineReducers } from 'redux';
import userReducer from './user/reducer';
// import adminauthreducer from "./adminauth/reducer";
// import AdminComponentsReducer from"./admincomponents/reducer";
// import { PurchaseReducer } from './purchase/reducer';

const rootReducer = combineReducers({
  userReducer:userReducer,
//   auth: authreducer,
//   adminauth:adminauthreducer,
// AdminCR:AdminComponentsReducer,
// purchaseStore:PurchaseReducer,
  
  // other reducers...
});
export const store = configureStore({
  reducer: rootReducer,
});