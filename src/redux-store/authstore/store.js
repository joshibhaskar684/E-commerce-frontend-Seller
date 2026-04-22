import { configureStore } from '@reduxjs/toolkit';
// import authreducer from "./auth/reducer";
import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import categoryReducer from './category/reducer';

import  sellerReducer  from './seller/reducer';
import  verifyReducer  from './verify/reducer';
import  ShopsReducer from './shops/reducer';
import  AdminReducer  from './admin/reducer';
import { productReducer } from './product/reducer';
import AdminDashBoardReducer from './adminDashboard/reducer';
// import adminauthreducer from "./adminauth/reducer";
// import AdminComponentsReducer from"./admincomponents/reducer";
// import { PurchaseReducer } from './purchase/reducer';

const rootReducer = combineReducers({
  userReducer:userReducer,
  categoryReducer:categoryReducer,
  productReducer:productReducer,
  verifyReducer:verifyReducer,
  sellerReducer:sellerReducer,
  AdminReducer:AdminReducer,
  ShopsReducer:ShopsReducer,
  AdminDashBoardReducer:AdminDashBoardReducer,
//   auth: authreducer,
//   adminauth:adminauthreducer,
// AdminCR:AdminComponentsReducer,
// purchaseStore:PurchaseReducer,
  
  // other reducers...
});
export const store = configureStore({
  reducer: rootReducer,
});