import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { devices } from '../../styles/breakpoints';
import { getLastIndex, SliderUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Arrow, Slide, SlideContainer, SliderContent, SliderWrap } from './SliderStyles';

export type breakpointsProps = {
  [key: string]: number;
};

type SliderProps = {
  children: any[];
  autoPlaySeconds: number;
  breakpoints: breakpointsProps[];
};

const Slider = ({ children, autoPlaySeconds, breakpoints }: SliderProps) => {
  const autoPlayRef = useRef<() => void>();
  const transitionRef = useRef<() => void>();
  const resizeRef = useRef<() => void>();
  const sliderRef = useRef<HTMLDivElement>();
  const throttleRef = useRef<() => void>();

  const [slidesGroup, setSlidesGroup] = useState(() => {
    const slidesPerPage = SliderUtils.createSlidesPerPage(breakpoints);
    return SliderUtils.createSlides(children, slidesPerPage);
  });
  const firstSlide = useMemo(() => slidesGroup[QUIZ_APP_CONSTANTS.SLIDER.firstSlideIndex], [slidesGroup]);
  const secondSlide = useMemo(() => slidesGroup[QUIZ_APP_CONSTANTS.SLIDER.secondSlideIndex], [slidesGroup]);
  const lastSlide = useMemo(() => slidesGroup[getLastIndex(slidesGroup)], [slidesGroup]);

  const [translateWidth, setTranslateWidth] = useState(QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault);
  const [transition, setTransition] = useState(QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsDefault);
  const [activeIndex, setActiveIndex] = useState(QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex);
  const [transitioning, setTransitioning] = useState(false);
  const [slides, setSlides] = useState([lastSlide, firstSlide, secondSlide]);

  const nextSlide = () => {
    if (transitioning) return;

    setTranslateWidth((prev) => prev + QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault);
    setActiveIndex((prev) =>
      prev === getLastIndex(slidesGroup) ? QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex : prev + 1,
    );
  };

  const prevSlide = () => {
    if (transitioning) return;

    setTranslateWidth(QUIZ_APP_CONSTANTS.SLIDER.translateWidthStart);
    setActiveIndex((prev) =>
      prev === QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex ? getLastIndex(slidesGroup) : prev - 1,
    );
  };

  const smoothTransition = () => {
    let _slides = [];

    if (activeIndex === getLastIndex(slidesGroup)) {
      _slides = [SliderUtils.getNextToLastElement(slidesGroup), lastSlide, firstSlide];
    } else if (activeIndex === QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = SliderUtils.getSubSlides(slidesGroup, activeIndex);
    }

    setSlides(_slides);
    setTransition(QUIZ_APP_CONSTANTS.SLIDER.translateWidthStart);
    setTranslateWidth(QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault);
  };

  const throttleArrows = () => {
    setTransitioning(true);
  };

  const handleResize = () => {
    setSlidesGroup(() => {
      const slidesPerPage = SliderUtils.createSlidesPerPage(breakpoints);
      return SliderUtils.createSlides(children, slidesPerPage);
    });
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
    throttleRef.current = throttleArrows;
  });

  useEffect(() => {
    let slider: HTMLDivElement;
    let transitionStart: any, transitionEnd: any, onResize: any;

    const smooth = () => {
      transitionRef.current?.();
    };

    const throttle = () => {
      throttleRef.current?.();
    };

    const resize = () => {
      resizeRef.current?.();
    };

    if (sliderRef?.current) {
      slider = sliderRef.current;

      transitionStart = slider.addEventListener('transitionstart', throttle);
      transitionEnd = slider.addEventListener('transitionend', smooth);
    }

    onResize = window.addEventListener('resize', resize);

    return () => {
      if (sliderRef?.current) {
        slider.removeEventListener('transitionend', transitionStart);
        slider.removeEventListener('transitionend', transitionEnd);
      }

      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current?.();
    };

    let interval: number;

    if (autoPlaySeconds) {
      interval = window.setInterval(play, autoPlaySeconds * QUIZ_APP_CONSTANTS.SLIDER.oneSecond);
    }

    return () => {
      if (autoPlaySeconds) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (transition === QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsStart) {
      setTransition(QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsDefault);
      setTransitioning(false);
    }
  }, [transition]);

  useEffect(() => {
    setSlides([lastSlide, firstSlide, secondSlide]);
    setActiveIndex(QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex);
  }, [firstSlide, secondSlide, lastSlide]);

  return (
    <SliderWrap ref={sliderRef}>
      <SliderContent translateWidth={translateWidth} transition={transition} totalSlide={slides.length}>
        {slides.map((slideContainer, idxContainer) => (
          <SlideContainer
            key={`slider-${idxContainer}`}
            slidesPerPage={SliderUtils.createSlidesPerPage(breakpoints)}
            totalSlide={slides.length}
          >
            {slideContainer.map((item, idx) => (
              <Slide key={`slider-${idxContainer}-${idx}`} slidesPerPage={SliderUtils.createSlidesPerPage(breakpoints)}>
                {item}
              </Slide>
            ))}
          </SlideContainer>
        ))}
      </SliderContent>
      <Arrow direction="left" onClick={prevSlide}>
        <IoIosArrowDropleft />
      </Arrow>
      <Arrow direction="right" onClick={nextSlide}>
        <IoIosArrowDropright />
      </Arrow>
    </SliderWrap>
  );
};

Slider.defaultProps = {
  autoPlaySeconds: null,
  breakpoints: [
    {
      minWidth: devices.default,
      items: 1,
    },
  ],
};

export default Slider;
