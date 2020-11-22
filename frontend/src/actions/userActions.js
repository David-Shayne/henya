import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_CLEAR,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAIL,
  USERS_RESET_LIST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from '../constants/userConstants';
import Axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //sets email in lower case
    email = String(email).toLowerCase();

    //Attempting to login using user info
    const { data } = await Axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  });
  dispatch({
    type: USER_DETAILS_CLEAR
  });
  dispatch({
    type: USERS_RESET_LIST
  });
  localStorage.removeItem('userInfo');
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    //Setting content as json in headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    //sets email in lower case
    email = String(email).toLowerCase();

    //Attempting to register user
    const { data } = await Axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
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

    //Attempting to get user details
    const { data } = await Axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
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
    const { data } = await Axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
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

    //Attempting to Delete user
    await Axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_REQUEST
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
    const { data } = await Axios.get(`/api/users`, config);

    dispatch({
      type: USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateUserById = (id, user) => async (dispatch, getState) => {
  console.log('working');
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
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
    const { data } = await Axios.put(`/api/users/${id}`, user, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
