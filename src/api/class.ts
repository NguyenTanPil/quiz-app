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

export const getClassDetail = async (classId: any, isStudent: any) => {
  const token = getCookie('token');
  let subUrl = isStudent ? QUIZ_APP_CONSTANTS.API.getClassDetailByStudent : QUIZ_APP_CONSTANTS.API.getClassesByIdUrl;
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + subUrl + `/${classId}`;

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

export const joinClass = async (id: string) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.joinClassUrl + `${id}`;

  try {
    const response = await axios({
      method: 'patch',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getAllClass = async () => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getAllClass;

  try {
    const response = await axios(url);

    const listClass = response.data.data.map((item: any) => {
      const color = item.main[0].color;
      const id = item.main[0].id;
      const name = item.main[0].name;
      const note = item.main[0].note;
      const authorName = item.sub[0].name;
      const authorId = item.sub[0].id;
      const studentIds = item.main[0].examineeIds ? JSON.parse(item.main[0].examineeIds) : [];

      return {
        id,
        color,
        name,
        note,
        authorName,
        authorId,
        studentIds,
      };
    });

    return { isSuccess: true, data: listClass };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
