import axios from 'axios';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';
import { convertMinutesToDuration, shuffleArray } from '../utils';
import { QUIZ_APP_CONSTANTS } from '../utils/constants';
import { getCookie } from '../utils/cookie';
import { Exam } from '../utils/types';
import { getCategoryById } from './category';
import { updateQuiz } from './quiz';

export const getExamsByClassId = async () => {
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

export const updateExam = async (formValues: any, examId: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.updateExamByIdUrl + examId;

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

export const getExamById = async (examId: any) => {
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

    const questions = examRes.question.map((q: any) => {
      const { id, content: question, level } = q.content[0];
      const answers = q.answer.map((answer: any) => ({ ...answer[0], isCorrect: !!answer[0].isCorrect }));

      return {
        id,
        question,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(level),
        answers,
      };
    });

    const data = {
      id: examRes.main[0].id,
      name: examRes.main[0].name,
      category: { id: examRes.main[0].categoryId, name: examRes.optional.categoryName },
      countLimit: examRes.main[0].countLimit || 1,
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
      const { id, content: question, level, topQuestionsId, bottomQuestionsId } = q.content[0];
      const answers = q.answer.map((answer: any) => ({ ...answer[0], isCorrect: !!answer[0].isCorrect }));

      return {
        id,
        question,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(level),
        answers,
        topIds: JSON.parse(topQuestionsId),
        bottomIds: JSON.parse(bottomQuestionsId),
        topIndex: 0,
        bottomIndex: 0,
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

export const submitExam = async (examId: string, answerIds: string[], restTime: number) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.submitExamUrl;

  try {
    const response = await axios({
      method: 'post',
      url,
      data: { examId, answerIds, restTime },
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
      examId: result['examId '],
    }));

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const updateQuestions = async (formValues: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.updateQuestionsUrl;

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

export const addQuestion = async (formValues: any, examId: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.addQuestionsUrl + examId;

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

export const createSubExam = async (formValues: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.createSubExamUrl;

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

export const getDetailSubExamQuestions = async (examId: string) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getSubExamDetailUrl + examId;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data.question.map((item: any) => ({
      id: item.content[0].id,
      question: item.content[0].content,
      level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(item.content[0].level),
      answers: item.answer.map((anw: any) => ({
        id: anw[0].id,
        content: anw[0].content,
        isCorrect: !!anw[0].isCorrect,
      })),
    }));

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getQuestionForReview = async (questionBankId: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getQuestionsForReviewUrl + questionBankId;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data.question.map((item: any) => ({
      id: item.content[0].id,
      question: item.content[0].content,
      level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(item.content[0].level),
      answers: item.answer.map((anw: any) => ({
        id: anw[0].id,
        content: anw[0].content,
        isCorrect: !!anw[0].isCorrect,
      })),
      topIds: item.content[0].topQuestionsId ? JSON.parse(item.content[0].topQuestionsId.replace(/'/g, '"')) : [],
      bottomIds: item.content[0].bottomQuestionsId
        ? JSON.parse(item.content[0].bottomQuestionsId.replace(/'/g, '"'))
        : [],
      topIndex: 0,
      bottomIndex: 0,
    }));

    return { isSuccess: true, data: { quizList: data, classId: response.data.data.main[0].classId } };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getQuestionForTest = async (examineeId: any) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getQuestionsForTestUrl + examineeId;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.data.question.map((item: any) => ({
      id: item.content[0].id,
      question: item.content[0].content,
      level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(item.content[0].level),
      answers: item.answer.map((anw: any) => ({
        id: anw[0].id,
        content: anw[0].content,
        isCorrect: !!anw[0].isCorrect,
      })),
    }));

    return {
      isSuccess: true,
      data: {
        quizList: data,
        timeDuration: response.data.data.general.main[0].timeDuration,
        testId: response.data.data.general.main[0].id,
        countLimit: response.data.data.general.main[0].countLimit,
      },
    };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
