import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { Exam, Quiz } from '../utils/types';
import { createQuiz, updateQuiz } from './quiz';

export const getExamsByUserId = async (userId: string) => {
  const exams: Exam[] = [];

  const q = query(collection(db, 'exams'), where('creatorId', '==', userId));
  const response = await getDocs(q);

  response.forEach((doc) => {
    exams.push(doc.data() as Exam);
  });

  return exams;
};

export const createExam = async (formValues: any, questionList: any[]) => {
  const response = await addDoc(collection(db, 'exams'), formValues);

  await Promise.all(
    questionList.map(async (question) => {
      await createQuiz(question);
    }),
  );

  return response;
};

export const updateExam = async (formValues: any, questionList: any[], examId: string) => {
  // exam
  if (Object.keys(formValues).length > 1) {
    let examId = '';

    const q = query(collection(db, 'exams'), where('id', '==', formValues.id));
    const response = await getDocs(q);

    response.forEach((doc) => {
      examId = doc.id;
    });

    const examRef = doc(db, 'exams', examId);
    const res = await updateDoc(examRef, formValues);
  }

  // questions
  if (questionList.length > 0) {
    const questions: { questionId: string; id: string }[] = [];

    const q = query(collection(db, 'questions'), where('examId', '==', examId));
    const response = await getDocs(q);

    response.forEach((doc) => {
      questions.push({ questionId: doc.id, id: doc.data().id });
    });

    await Promise.all(
      questions.map(async (question) => {
        const currentQuestion = questionList.filter((q) => q.id === question.id)[0];

        delete currentQuestion.id;

        await updateQuiz(question.questionId, currentQuestion);
      }),
    );
  }
};

export const getExamById = async (examId: string) => {
  const exams: Exam[] = [];

  const q = query(collection(db, 'exams'), where('id', '==', examId));
  const response = await getDocs(q);

  response.forEach((doc) => {
    exams.push(doc.data() as Exam);
  });

  if (exams.length === 0) {
    return { data: null };
  }

  return { data: exams[0] };
};
