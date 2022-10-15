import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import { Exam, Quiz } from '../utils/types';
import { createQuiz, updateQuiz } from './quiz';
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { convertMinutesToDuration } from '../utils';
import { getCategoryById } from './category';

export const getExamsByUserId = async (userId: string) => {
  const exams: Exam[] = [];

  const q = query(collection(db, 'exams'), where('creatorId', '==', userId));
  const response = await getDocs(q);

  response.forEach((doc) => {
    exams.push(doc.data() as Exam);
  });

  return exams;
};

export const createExam = async (formValues: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.createExamUrl;

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
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getExamByIdUrl + examId;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status !== '200') {
      return { isSuccess: false, data: response.data.errors[0].id };
    }

    const category = await getCategoryById('0d191462-bd66-4143-b37c-ddf92f74b19e');
    const examRes = response.data.data;
    const structureExam = JSON.parse(examRes.general.main[0].structureExam);

    const questions = examRes.question.map((q: any) => {
      const { id, content: question, level } = q.content[0];
      const answers = q.answer.map((answer: any) => ({ ...answer[0], isCorrect: !!answer[0].isCorrect }));

      return {
        id,
        question,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(level - 1),
        answers,
      };
    });

    const data = {
      id: examRes.general.main[0].id,
      name: examRes.general.main[0].name,
      timeStart: examRes.general.main[0].timeStart,
      category: { id: category.data.id, name: category.data.name },
      quizStructure: { easy: structureExam.esay, medium: structureExam.normal, hard: structureExam.difficult },
      timeDuration: convertMinutesToDuration(examRes.general.main[0].timeDuration),
      countLimit: examRes.general.main[0].countLimit,
      quizList: questions,
    };

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
