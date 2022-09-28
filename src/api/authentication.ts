import { addDoc, collection, doc, DocumentData, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';

export const createAccount = async (formValues: any) => {
  const response = await addDoc(collection(db, 'users'), formValues);

  return response;
};

export const checkSignIn = async (formValues: any) => {
  const { email, password } = formValues;
  const users: DocumentData[] = [];

  const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));
  const response = await getDocs(q);

  if (response.empty) {
    return { isSuccess: false };
  }

  response.forEach((doc) => {
    users.push({ userId: doc.id, ...doc.data() });
  });

  return { isSuccess: true, data: users[0] };
};

export const updateUser = async (userId: string, formValues: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, formValues);
};
