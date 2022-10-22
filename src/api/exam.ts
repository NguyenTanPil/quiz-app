import axios from 'axios';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { convertMinutesToDuration, shuffleArray } from '../utils';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import { getCookie } from '../utils/cookie';
import { Exam } from '../utils/types';
import { getCategoryById } from './category';
import { updateQuiz } from './quiz';

export const getExamsByUserId = async () => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getExamByUserIdUrl;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data.map((exam: any) => ({
      id: exam.main[0].id,
      name: exam.main[0].name,
      category: { id: exam.main[0].categoryId, name: exam.optional.categoryName },
      totalQuestions: exam.sub.total,
      createdAt: exam.main[0].createdAt * QUIZ_APP_CONSTANTS.COMMON.oneSecond,
    }));

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
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

    const examRes = response.data.data;
    const structureExam = JSON.parse(examRes.main[0].structureExam);

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
      id: examRes.main[0].id,
      name: examRes.main[0].name,
      timeStart: examRes.main[0].timeStart,
      category: { id: examRes.main[0].categoryId, name: examRes.optional.categoryName },
      quizStructure: { easy: structureExam.easy, medium: structureExam.normal, hard: structureExam.difficult },
      timeDuration: convertMinutesToDuration(examRes.main[0].timeDuration),
      countLimit: examRes.main[0].countLimit,
      quizList: questions,
    };

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getGeneraExamById = async (examId: string) => {
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

    const examRes = response.data.data;
    const structureExam = JSON.parse(examRes.main[0].structureExam);

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
      id: examRes.main[0].id,
      name: examRes.main[0].name,
      timeStart: examRes.main[0].timeStart,
      category: { id: examRes.main[0].categoryId, name: examRes.optional.categoryName },
      quizStructure: { easy: structureExam.easy, medium: structureExam.normal, hard: structureExam.difficult },
      timeDuration: examRes.main[0].timeDuration * 60,
      countLimit: examRes.main[0].countLimit,
      quizList: questions,
    };

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const submitExam = async (examId: string, answerIds: string[]) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.submitExamUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: { questionBankId: examId, answerIds },
      headers: { Authorization: `Bearer ${token}` },
    });

    return { isSuccess: true, data: response.data.data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getResult = async () => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getResultUrl;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data.map((result: any, idx: number) => ({
      no: idx + 1,
      id: result.id,
      score: result.numCorrect,
      restTime: result.restTime,
      submitDate: result.dateSubmit,
    }));

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
