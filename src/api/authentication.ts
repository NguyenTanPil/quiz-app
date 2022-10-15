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

export const updateUser = async (userId: string, formValues: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, formValues);
};
