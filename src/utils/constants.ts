import { convertNumberFormat } from '../utils';

export const QUIZ_APP_CONSTANTS = {
  COMMON: {
    oneSecond: 1000,
    secondsPerMinute: 60,
    minutesPerHour: 60,
    hoursPerDay: 24,
    daysPerMonth: 30,
    numberStandard: 10,
    oneHundredPercent: 100,
    initialCurrentPage: 1,
    itemsPerPage: 4,
    startIndex: 0,
    emptyArrayLength: 0,
    debounceSeconds: 500,
    suggestNotFound: 'Not Found',
  },
  API: {
    baseUrl: 'http://127.0.0.1:8000/api/',
    signUpUrl: 'register',
    signInUrl: 'login',
    signInUrlFace: 'login/face',
    createCategoryUrl: 'creator/category/create',
    updateCategoryUrl: 'creator/category/update/',
    getCategoryByUserIdUrl: 'creator/category',
    getCategoryByIdUrl: 'creator/category/',
    createExamUrl: 'creator/questionbank/create',
    getExamByIdUrl: 'creator/questionbank/',
    updateExamByIdUrl: 'creator/questionbank/update/',
    getExamByUserIdUrl: 'creator/questionbank',
    updateUserUrl: 'update',
    submitExamUrl: 'examinees/submit',
    getResultUrl: 'examinees/result',
    getClassesByIdUrl: 'creator/class',
    createClassUrl: 'creator/class/create',
    updateClassUrl: 'creator/class/update/',
    updateQuestionsUrl: 'creator/questionbank/update/question',
    addQuestionsUrl: 'creator/questionbank/add/',
    createSubExamUrl: 'creator/exam/create',
    getSubExamDetailUrl: 'creator/exam/',
    joinClassUrl: 'examinees/register/',
    getAllClass: 'class',
    getClassDetailByStudent: 'examinees/detail-class',
    getQuestionsForReviewUrl: 'examinees/detail-questionbank/',
    getQuestionsForTestUrl: 'examinees/',
  },
  SLIDER: {
    transitionSecondsDefault: 0.45,
    transitionSecondsStart: 0,
    initialActiveIndex: 0,
    translateWidthDefault: 100,
    translateWidthStart: 0,
    firstSlideIndex: 0,
    secondSlideIndex: 1,
  },
  GAME: {
    initialNumberQuestion: 0,
    initialScore: 0,
    endTime: 0,
    firstNumberQuestion: 1,
  },
  CREATE_EXAM: {
    levels: [
      {
        name: 'easy',
        typeColor: 'successColor',
      },
      {
        name: 'medium',
        typeColor: 'warningColor',
      },
      {
        name: 'hard',
        typeColor: 'errorColor',
      },
    ],
    examModes: ['Review Mode', 'Test Mode'],
    initNameTitle: 'Mr.',
    titles: ['Mr.', 'Ms.', 'Mrs.', 'Dr.'],
    countLimitList: ['1', '3', '5', 'Limited'],
    initialTimeStart: 0,
    initialTimeDuration: 0,
    initialExamName: '',
    initialQuizList: [],
    initialHours: '00',
    initialMinutes: '00',
    initialCategory: {
      id: '',
      name: '',
    },
    initialQuizStructure: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    initialId: '',
    initialCountLimit: '1',
    initialTotalQuestions: 0,
    hoursPerDay: 24,
    minutesPerHour: 60,
    categoryPageSize: 4,
    getAllLevels() {
      return this.levels.map((level) => level.name);
    },
    getActiveLevelTypeColor(activeLevel: string) {
      return this.levels.find((level) => level.name === activeLevel)?.typeColor;
    },
    getHourList() {
      return Array.from(Array(this.hoursPerDay).keys()).map((hourNumber) => convertNumberFormat(hourNumber));
    },
    getMinuteList() {
      return Array.from(Array(this.minutesPerHour).keys()).map((minuteNumber) => convertNumberFormat(minuteNumber));
    },
    getLevelNumberByString(level: string) {
      if (level === 'easy') {
        return 1;
      } else if (level === 'medium') {
        return 2;
      }
      return 3;
    },
    getLevelStringByNumber(num: number) {
      if (num === 1) {
        return 'easy';
      } else if (num === 2) {
        return 'medium';
      }
      return 'hard';
    },
    getCountLimitNumber(str: string) {
      const countLimitIndex = this.countLimitList.findIndex((count) => count === str);

      if (countLimitIndex === this.countLimitList.length - 1) {
        return 1000;
      }

      return parseInt(this.countLimitList[countLimitIndex]);
    },
    getModeStatus(mode: string) {
      if (mode === 'Review Mode') {
        return false;
      }

      return true;
    },
    getModeString(isTestMode: boolean) {
      if (isTestMode) {
        return 'Test Mode';
      }

      return 'Review Mode';
    },
  },
  AUTHEN_FORM: {
    roles: ['Teacher', 'Student'],
    teacherRoleNumber: '1',
    studentRoleNumber: '2',
    widthPopup: 760,
    heightPopup: 600,
    toolbarFull: [
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [
        {
          color: ['#f55d7a', '#536471', '#9852f9', '#0fb56d', '#0f1c2a', '#ed8a0a'],
        },
        { background: ['#f55d7a', '#536471', '#9852f9', '#0fb56d', '#0f1c2a', '#ed8a0a'] },
      ],
      ['clean'],
    ],
    answerLabels: ['A', 'B', 'C', 'D'],
    toolbarShort: [
      ['bold', 'italic', 'underline', 'blockquote'],
      [
        {
          color: ['#f55d7a', '#536471', '#9852f9', '#0fb56d', '#0f1c2a', '#ed8a0a'],
        },
        { background: ['#f55d7a', '#536471', '#9852f9', '#0fb56d', '#0f1c2a', '#ed8a0a'] },
      ],
      ['clean'],
    ],
    formatsFull: [
      'bold',
      'italic',
      'underline',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'image',
      'color',
      'background',
    ],
    formatsShort: ['bold', 'italic', 'underline', 'blockquote', 'image', 'color', 'background'],
  },
  PROFILE: {
    reportTypes: ['Hide', 'Overview', 'Detail'],
    tabs: ['All Classes', 'All Category', 'Report', 'Student'],
    answerColors: [
      {
        name: 'clicked',
        typeColor: 'mainColor',
      },
      {
        name: 'correct',
        typeColor: 'successColor',
      },
      {
        name: 'wrong',
        typeColor: 'errorColor',
      },
    ],
    getTabs(currentTab: string) {
      if (currentTab === 'Student') {
        return this.tabs;
      }

      return this.tabs.filter((tab) => tab !== 'Student');
    },
  },
  CLASS: {
    tabs: ['Exam', 'All Sub Exam', 'All Student'],
  },
};
