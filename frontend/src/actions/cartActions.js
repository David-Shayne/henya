import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  CART_REMOVE_ALL_ITEMS
} from '../constants/cartConstants';
import { SAVE_SHIPPING } from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      quantity
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const removeAllFromCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ALL_ITEMS
  });

  localStorage.setItem('cartItems', JSON.stringify([]));
};

export const saveShipping = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING, payload: data });
  localStorage.setItem('shipping', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
