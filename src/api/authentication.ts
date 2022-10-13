import axios from 'axios';
import { collection, doc, DocumentData, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';

export const createAccount = async (formValues: any) => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.signUpUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: formValues,
    });
    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, data: error.response?.data.errors };
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
    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, data: error.response?.data.error };
  }
};

export const updateUser = async (userId: string, formValues: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, formValues);
};
