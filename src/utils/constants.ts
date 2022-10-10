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
        name: 'Easy',
        typeColor: 'successColor',
      },
      {
        name: 'Medium',
        typeColor: 'warningColor',
      },
      {
        name: 'Hard',
        typeColor: 'errorColor',
      },
    ],
    initNameTitle: 'Mr.',
    titles: ['Mr.', 'Ms.', 'Mrs.', 'Dr.'],
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
    initialId: '',
    initialTotalQuestions: 0,
    initialCountLimit: 1,
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
      if (level === 'Easy') {
        return 0;
      } else if (level === 'Medium') {
        return 1;
      }
      return 2;
    },
    getLevelStringByNumber(num: number) {
      if (num === 0) {
        return 'Easy';
      } else if (num === 1) {
        return 'Medium';
      }
      return 'Hard';
    },
  },
  AUTHEN_FORM: {
    roles: ['Teacher', 'Student'],
    teacherRoleNumber: 1,
    studentRoleNumber: 2,
  },
};
