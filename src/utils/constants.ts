export const QUIZ_APP_CONSTANTS = {
  COMMON: {
    oneSecond: 1000,
    secondsPerMinute: 60,
    numberStandard: 10,
    oneHundredPercent: 100,
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
  QUIZ_QUESTION: {
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
    categories: ['Category 1', 'Category 2', 'Category 3'],
    getAllLevels() {
      return this.levels.map((level) => level.name);
    },
    getActiveLevelTypeColor(activeLevel: string) {
      return this.levels.find((level) => level.name === activeLevel)?.typeColor;
    },
  },
  NAME_TITLE: {
    initNameTitle: 'Mr.',
    titles: ['Mr.', 'Ms.', 'Mrs.', 'Dr.'],
  },
};
