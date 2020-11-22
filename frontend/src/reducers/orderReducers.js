import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDERS_MY_LIST_REQUEST,
  ORDERS_MY_LIST_SUCCESS,
  ORDERS_MY_LIST_FAIL
} from '../constants/orderConstants';

const initialCreateState = {
  error: null,
  order: null
};

export const orderCreateReducer = (
  state = initialCreateState,
  { type, payload }
) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...state };
    case ORDER_CREATE_SUCCESS:
      return { ...state, order: payload, success: true };
    case ORDER_CREATE_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export const orderReducer = (
  state = { order: {}, isLoading: true, error: null },
  { type, payload }
) => {
  switch (type) {
    case ORDER_REQUEST:
      return { ...state, isLoading: true };
    case ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
        isLoading: false
      };
    case ORDER_FAIL:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { isLoading: true };
    case ORDER_PAY_SUCCESS:
      return {
        success: true,
        isLoading: false
      };
    case ORDER_PAY_FAIL:
      return { error: payload, isLoading: false };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrdersReducer = (
  state = { orders: [], isLoading: false },
  { type, payload }
) => {
  switch (type) {
    case ORDERS_MY_LIST_REQUEST:
      return { isLoading: true };
    case ORDERS_MY_LIST_SUCCESS:
      return {
        orders: payload,
        isLoading: false
      };
    case ORDERS_MY_LIST_FAIL:
      return { error: payload, isLoading: false };
    default:
      return state;
  }
};
