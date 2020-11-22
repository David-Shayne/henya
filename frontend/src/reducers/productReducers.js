import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET
} from '../constants/productConstants';

const initialProductsState = { products: [], isLoading: false };
const initialProductDetailsState = {
  product: { reviews: [] },
  isLoading: false
};

export const productsReducer = (
  state = initialProductsState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCTS_REQUEST:
      return { ...state, isLoading: true, products: [] };
    case PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, products: payload };
    case PRODUCTS_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = initialProductDetailsState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, isLoading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
