import axios from 'axios';
import { convertSecondsToMinutes } from '../utils';
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

export const getAllClassByJoined = async () => {
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + QUIZ_APP_CONSTANTS.API.getAllClass;
  const student = getCookie('user');

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

    const result = listClass.filter((item: any) => item.studentIds.includes(student.id));

    return { isSuccess: true, data: result };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getResultByTeacher = async (resultId: string) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + 'creator/result/detail' + `/${resultId}`;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.data.user[0];
    const main = response.data.data.main[0];
    const sub = response.data.data.sub;
    const temp = sub.map((item: any) => {
      const answers = item.detailQuestion.map((a: any) => ({ ...a[0], isCorrect: !!a[0].isCorrect }));

      const chooseAnswer = item.chooseAnswer[0];

      return {
        id: item.question[0].id,
        question: item.question[0].content,
        answers: answers,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(item.question[0].level),
        chooseAnswer,
      };
    });

    const data = {
      questions: temp,
      ...user,
      resultId: main.id,
      numCorrect: main.numCorrect,
      restTime: convertSecondsToMinutes(main.restTime),
      dateSubmit: main.dateSubmit,
      examId: main['examId '],
    };

    return {
      isSuccess: true,
      data: data,
    };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};

export const getResultStudent = async (classId: string) => {
  const token = getCookie('token');
  const url = QUIZ_APP_CONSTANTS.API.baseUrl + 'creator/result' + `/${classId}`;

  try {
    const response = await axios({
      method: 'get',
      url,
      headers: { Authorization: `Bearer ${token}` },
    });

    const students = response.data.data.map((item: any, idx: number) => ({
      index: idx + 1,
      ...item.user[0],
      resultId: item.result[0].id,
      numCorrect: item.result[0].numCorrect,
      restTime: convertSecondsToMinutes(item.result[0].restTime),
      dateSubmit: item.result[0].dateSubmit,
    }));

    let reports: any[] = [];

    await Promise.all(
      students.map(async (item: any) => {
        const res = await getResultByTeacher(item.resultId);
        reports.push(res.data);
      }),
    );

    const resultRes: any[] = [];

    reports.forEach((userTemp: any) => {
      userTemp.questions.forEach((item: any) => {
        let correctAnswerCount = 0;
        let wrongAnswerCount = 0;
        let aAnswerCount = 0;
        let bAnswerCount = 0;
        let cAnswerCount = 0;
        let dAnswerCount = 0;
        let correctAnswer = 'a';

        if (!!item.chooseAnswer.isCorrect) {
          correctAnswerCount++;
        } else {
          wrongAnswerCount++;
        }

        const tempIndexChoose = item.answers.findIndex((a: any) => a.id === item.chooseAnswer.id);
        const tempIndexCorrect = item.answers.findIndex((a: any) => a.isCorrect);

        if (tempIndexCorrect === 0) {
          correctAnswer = 'a';
        }
        if (tempIndexCorrect === 1) {
          correctAnswer = 'b';
        }
        if (tempIndexCorrect === 2) {
          correctAnswer = 'c';
        }
        if (tempIndexCorrect === 3) {
          correctAnswer = 'd';
        }

        if (tempIndexChoose === 0) {
          aAnswerCount++;
        }
        if (tempIndexChoose === 1) {
          bAnswerCount++;
        }
        if (tempIndexChoose === 2) {
          cAnswerCount++;
        }
        if (tempIndexChoose === 3) {
          dAnswerCount++;
        }

        const resultResIndex = resultRes.findIndex((abc: any) => abc.id === item.id);
        if (resultResIndex === -1) {
          resultRes.push({
            id: item.id,
            question: item.question,
            answers: item.answers,
            correctAnswerCount,
            wrongAnswerCount,
            aAnswerCount,
            bAnswerCount,
            cAnswerCount,
            dAnswerCount,
            correctAnswer,
            level: item.level,
          });
        } else {
          resultRes[resultResIndex].correctAnswerCount += correctAnswerCount;
          resultRes[resultResIndex].wrongAnswerCount += wrongAnswerCount;
          resultRes[resultResIndex].aAnswerCount += aAnswerCount;
          resultRes[resultResIndex].bAnswerCount += bAnswerCount;
          resultRes[resultResIndex].cAnswerCount += cAnswerCount;
          resultRes[resultResIndex].dAnswerCount += dAnswerCount;
        }
      });
    });

    console.log({ resultRes });

    return { isSuccess: true, data: { students, overview: resultRes } };
  } catch (error: any) {
    return { isSuccess: false, message: error.message };
  }
};
