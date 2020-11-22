import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  productDetailsReducer,
  productsReducer
} from './reducers/productReducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  usersReducer,
  userDeleteReducer
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderReducer,
  orderPayReducer,
  myOrdersReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  users: usersReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
