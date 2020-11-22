import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDERS_MY_LIST_REQUEST,
  ORDERS_MY_LIST_SUCCESS,
  ORDERS_MY_LIST_FAIL
} from '../constants/orderConstants';
import Axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
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

    //Attempting to login using user info
    const { data } = await Axios.post('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_REQUEST
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

    //Attempting to login using user info
    const { data } = await Axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
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

    //Attempting to login using user info
    const { data } = await Axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_MY_LIST_REQUEST
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

    //Attempting to login using user info
    const { data } = await Axios.get(`/api/orders/myOrders`, config);

    dispatch({
      type: ORDERS_MY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDERS_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_MY_LIST_REQUEST
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

    //Attempting to login using user info
    const { data } = await Axios.get(`/api/orders`, config);

    dispatch({
      type: ORDERS_MY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ORDERS_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
