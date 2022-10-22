import axios from 'axios';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import { getCookie } from '../utils/cookie';

export const createAccount = async (formValues: any) => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.signUpUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: formValues,
    });

    if (response.data.status !== '200') {
      return { isSuccess: false, data: response.data.message };
    }

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const checkSignIn = async (formValues: any) => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.signInUrl;
  const { email, password } = formValues;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: { email, password },
    });

    if (response.data.status !== '200') {
      return { isSuccess: false, data: response.data.message };
    }

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const updateUserDetail = async (formValues: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.updateUserUrl;

  try {
    const response = await axios({
      method: 'patch',
      url,
      data: formValues,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.status !== '200') {
      return { isSuccess: false, data: response.data.message };
    }

    const newData = response.data.data[0];

    return { isSuccess: true, data: newData };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
