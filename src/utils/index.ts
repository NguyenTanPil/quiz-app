import { breakpointsProps } from '../common/Slider';
import { QUIZ_APP_CONSTANTS } from './constants';

export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const SliderUtils = {
  createSlides(children: any[], slidesPerPage: number) {
    const slides = [];

    for (let i = 0; i < children.length; i += slidesPerPage) {
      slides.push(children.slice(i, i + slidesPerPage));
    }

    return slides;
  },
  createSlidesPerPage(breakpoints: breakpointsProps[]) {
    const _breakpoints = [...breakpoints];
    _breakpoints.sort((a, b) => a.minWidth - b.minWidth);
    const windowWidth = window.innerWidth;
    let itemsDisplay = 0;

    _breakpoints?.forEach((breakpoint) => {
      if (breakpoint.minWidth < windowWidth) {
        itemsDisplay = breakpoint.items;
      }
    });

    return itemsDisplay;
  },
  getSubSlides(slides: any, activeIndex: number) {
    return slides.slice(activeIndex - 1, activeIndex + 2);
  },
  getNextToLastElement(array: any[]) {
    return array[array.length - 2];
  },
};

export const GameUtils = {
  getFormattedTime(time: number) {
    const minutes = Math.floor(time / QUIZ_APP_CONSTANTS.COMMON.secondsPerMinute);
    const seconds = time % QUIZ_APP_CONSTANTS.COMMON.secondsPerMinute;

    const minutesFormatted = minutes < QUIZ_APP_CONSTANTS.COMMON.numberStandard ? `0${minutes}` : `${minutes}`;
    const secondsFormatted = seconds < QUIZ_APP_CONSTANTS.COMMON.numberStandard ? `0${seconds}` : `${seconds}`;
    return `${minutesFormatted}:${secondsFormatted}`;
  },
};

type ValidUtilsProps = {
  [key: string]: (...args: any[]) => any;
};

export const ValidUtils: ValidUtilsProps = {
  // check user name
  name(value: string) {
    let error;
    const maxLength = 15;

    if (!value) {
      error = 'Please enter your user name';
    } else if (['admin', 'null', 'god'].includes(value)) {
      error = 'Nice try!';
    } else if (value.length > maxLength) {
      error = 'Must be 15 characters or less';
    }

    return error;
  },
  // check email
  email(value: string) {
    let error;

    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }

    return error;
  },
  // check password
  password(value: string) {
    let error;

    if (!value) {
      error = 'Please enter your password';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      error = 'Minimum 8 characters, at least one letter and one number';
    }

    return error;
  },
  // check repeat password
  repeatPass(value: string, pass: string) {
    let error;

    if (!value) {
      error = 'Please enter confirm password';
    } else if (value !== pass) {
      error = 'Password is not matched';
    }

    return error;
  },
};

export const DialogUtils = {
  resetScrollbar() {
    document.body.style.height = '';
    document.body.style.overflowY = '';
  },

  disableScrollbar() {
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
  },
};

export const getLastIndex = (array: any[]) => {
  return array.length - 1;
};

export const deepCloneObject = (object: any) => {
  return JSON.parse(JSON.stringify(object));
};

export const convertNumberFormat = (num: number) => {
  return num < 10 ? '0' + num : num;
};
