import { breakpointsProps } from '../common/Slider';

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

export const getLastIndex = (array: any[]) => {
  return array.length - 1;
};
