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

export const getLastIndex = (array: any[]) => {
  return array.length - 1;
};
