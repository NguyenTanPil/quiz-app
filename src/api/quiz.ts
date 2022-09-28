import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { Quiz } from '../utils/types';

export const createQuiz = async (formValues: any) => {
  const response = await addDoc(collection(db, 'questions'), formValues);

  return response;
};

export const getQuizzes = async (creatorId: string) => {
  const questions: Quiz[] = [];

  const q = query(collection(db, 'questions'), where('examId', '==', creatorId));
  const response = await getDocs(q);

  response.forEach((doc) => {
    questions.push(doc.data() as Quiz);
  });

  return questions;
};

export const updateQuiz = async (id: string, formValues: any) => {
  const quizRef = doc(db, 'questions', id);
  await updateDoc(quizRef, formValues);
};
