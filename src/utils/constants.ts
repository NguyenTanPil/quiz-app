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
  },
  API: {
    baseUrl: 'http://127.0.0.1:8000/api/',
    signUpUrl: 'register',
    signInUrl: 'login',
    createCategoryUrl: 'creator/category/create',
    updateCategoryUrl: 'creator/category/update/',
    getCategoryByUserIdUrl: 'creator/category',
    getCategoryByIdUrl: 'creator/category/',
    createExamUrl: 'creator/questionbank/create',
    getExamByIdUrl: 'creator/questionbank/',
    getExamByUserIdUrl: 'creator/questionbank',
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
        return 0;
      } else if (level === 'medium') {
        return 1;
      }
      return 2;
    },
    getLevelStringByNumber(num: number) {
      if (num === 0) {
        return 'easy';
      } else if (num === 1) {
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
  },
  AUTHEN_FORM: {
    roles: ['Teacher', 'Student'],
    teacherRoleNumber: '1',
    studentRoleNumber: '2',
  },
};
