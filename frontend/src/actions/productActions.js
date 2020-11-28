import {
  PRODUCTS_FAIL,
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';
import Axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  try {
    //fetch requested
    dispatch({
      type: PRODUCTS_REQUEST,
      payload: null
    });

    //fetch all products
    const { data } = await Axios.get('/api/products');
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    //fetch failed
    dispatch({
      type: PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    //fetch requested
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    //fetch all products
    const { data } = await Axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //fetch failed
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateProductById = (id, product) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token
      }
    };

    //Attempting to update user
    const { data } = await Axios.put(`/api/products/${id}`, product, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token
      }
    };

    //Attempting to update user
    const { data } = await Axios.post(`/api/products/create`, product, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo.token
      }
    };

    //Attempting to update user
    const { data } = await Axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
