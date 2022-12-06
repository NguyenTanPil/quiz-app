import moment from 'moment';
import { breakpointsProps } from '../common/Slider';
import { QUIZ_APP_CONSTANTS } from './constants';
import { getCookie } from './cookie';

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

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

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
  code(value: string) {
    if (value === '') {
      return 'Code is not empty!';
    }

    if (!isNumeric(value)) {
      return 'Code must be a number!';
    }

    return '';
  },
};

export const AuthenFormUtils = {
  openPopupResize(navigationUrl: string, popupName: string) {
    const screenLeft = window.screenLeft || window.screenX; // IE8
    const screenTop = window.screenTop || window.screenY;

    const width = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const left = Math.max(0, width / 2 - QUIZ_APP_CONSTANTS.AUTHEN_FORM.widthPopup / 2 + screenLeft);
    const top = Math.max(0, height / 2 - QUIZ_APP_CONSTANTS.AUTHEN_FORM.heightPopup / 2 + screenTop);

    const config = `width=${QUIZ_APP_CONSTANTS.AUTHEN_FORM.widthPopup}, height=${QUIZ_APP_CONSTANTS.AUTHEN_FORM.heightPopup}, top=${top}, left=${left}, scrollbars=yes`;

    return window.open(navigationUrl, popupName, config);
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
  return num < 10 ? `0${num}` : `${num}`;
};

export const convertTimeDurationToMinutes = (timeDuration: { hours: string; minutes: string }): number => {
  const hours = parseInt(timeDuration.hours, 10);
  const minutes = parseInt(timeDuration.minutes, 10);

  return hours * 60 + minutes;
};

export const convertMinutesToDuration = (minutes: number) => {
  if (minutes < QUIZ_APP_CONSTANTS.COMMON.minutesPerHour) {
    return { hours: '00', minutes: convertNumberFormat(minutes) };
  }

  const hours = Math.ceil(minutes / QUIZ_APP_CONSTANTS.COMMON.minutesPerHour);
  return {
    hours: convertNumberFormat(hours),
    minutes: convertNumberFormat(minutes % QUIZ_APP_CONSTANTS.COMMON.minutesPerHour),
  };
};

export const getObjectKeysChanged = (currentObj: any, changedObj: any) => {
  const targetObj: { [key: string]: any } = {};

  for (const key in changedObj) {
    if (currentObj[key] !== changedObj[key]) {
      targetObj[key] = changedObj[key];
    }
  }

  if (Object.keys(targetObj).length > 0) {
    return { isUpdated: true, data: targetObj };
  }

  return { isUpdated: false };
};

export const compareTwoObjects = (currentObj: any, changedObj: any) => {
  return JSON.stringify(currentObj) === JSON.stringify(changedObj);
};

export const formatCreatedAt = (time: number) => {
  const distance = moment().valueOf() - time;
  const oneMinute = QUIZ_APP_CONSTANTS.COMMON.oneSecond * QUIZ_APP_CONSTANTS.COMMON.secondsPerMinute;
  const oneHour = oneMinute * QUIZ_APP_CONSTANTS.COMMON.minutesPerHour;
  const oneDay = oneHour * QUIZ_APP_CONSTANTS.COMMON.hoursPerDay;
  const oneMonth = oneDay * QUIZ_APP_CONSTANTS.COMMON.daysPerMonth;

  const minutes = Math.ceil(distance / oneMinute);

  if (minutes < QUIZ_APP_CONSTANTS.COMMON.minutesPerHour) {
    return `${convertNumberFormat(minutes)} minutes ago`;
  }

  const hours = Math.ceil(distance / oneHour);

  if (hours < QUIZ_APP_CONSTANTS.COMMON.hoursPerDay) {
    return `${convertNumberFormat(hours)} hours ago`;
  }

  const days = Math.ceil(distance / oneDay);

  if (days < QUIZ_APP_CONSTANTS.COMMON.daysPerMonth) {
    return `${convertNumberFormat(days)} days ago`;
  }

  const months = Math.ceil(distance / oneMonth);

  return `${convertNumberFormat(months)} days ago`;
};

export const getLoginStatus = (): boolean => {
  const user = getCookie('user');

  if (user) {
    return true;
  }

  return false;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // for smoothly scrolling
  });
};

export const getOriginTextInHtmlString = (htmlString: string) => {
  return htmlString.replace(/(<([^>]+)>)/gi, '');
};

export const convertExam = (exam: any) => {
  const { main, sub } = exam;

  const result = { ...main[0], ...sub };
  result.arrayQuestion = JSON.parse(exam.main[0].arrayQuestion);
  return result;
};
