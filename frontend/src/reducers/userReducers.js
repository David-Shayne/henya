import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_CLEAR,
  USER_UPDATE_RESET,
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAIL,
  USERS_RESET_LIST,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS
} from '../constants/userConstants';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialUserLoginState = {
  userInfo: userInfoFromStorage,
  isLoading: false
};

const initialUserRegisterState = {
  isLoading: false
};

const initialUserUpdateState = {
  isLoading: false,
  success: false
};

export const userLoginReducer = (
  state = initialUserLoginState,
  { type, payload }
) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, isLoading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { ...state, isLoading: false, error: payload };
    case USER_LOGOUT: {
      return { ...state, userInfo: null };
    }
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state = initialUserRegisterState,
  { type, payload }
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case USER_REGISTER_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (
  state = initialUserUpdateState,
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { ...state, isLoading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case USER_UPDATE_FAIL:
      return { ...state, isLoading: false, error: payload };
    case USER_UPDATE_RESET:
      return;
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { user: {}, isLoading: false },
  { type, payload }
) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, user: payload };
    case USER_DETAILS_FAIL:
      return { ...state, isLoading: false, error: payload };
    case USER_DETAILS_CLEAR:
      return { ...state, isLoading: false, user: {} };
    default:
      return state;
  }
};

export const usersReducer = (
  state = { users: {}, isLoading: true },
  { type, payload }
) => {
  switch (type) {
    case USERS_REQUEST:
      return { ...state, isLoading: true };
    case USERS_SUCCESS:
      return { ...state, isLoading: false, users: payload };
    case USERS_FAIL:
      return { ...state, isLoading: false, error: payload };
    case USERS_RESET_LIST:
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state = { isLoading: true, success: false },
  { type, payload }
) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { ...state, isLoading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case USER_DELETE_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
