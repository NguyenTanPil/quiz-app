import axios from 'axios';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import { getCookie } from '../utils/cookie';

export const getClassesByUserId = async () => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getClassesByIdUrl;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const createClass = async (formValues: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.createClassUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: formValues,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const updateClass = async (formValues: any, categoryId: string) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.updateClassUrl + categoryId;

  try {
    const response = await axios({
      method: 'patch',
      url,
      data: formValues,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getClassDetail = async (classId: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getClassesByIdUrl + `/${classId}`;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
