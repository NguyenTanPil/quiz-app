import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import axios from 'axios';
import { getCookie } from '../utils/cookie';

const token = getCookie('bearerToken');

export const createCategory = async (formValues: any) => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.createCategoryUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: formValues,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.response?.data.message };
  }
};

export const updateCategory = async (formValues: any, categoryId: string) => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.updateCategoryUrl + categoryId;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: formValues,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.response?.data.message };
  }
};

export const getCategoryOfUser = async () => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getCategoryByUserIdUrl;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.response?.data.message };
  }
};
