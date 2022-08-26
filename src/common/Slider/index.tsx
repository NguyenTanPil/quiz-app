import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { devices } from '../../styles/breakpoints';
import { getLastIndex, SliderUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Arrow, DotItem, Dots, Slide, SlideContainer, SliderContent, SliderWrap } from './SliderStyles';

export type breakpointsProps = {
  [key: string]: number;
};

type SliderProps = {
  children: any[];
  autoPlaySeconds: number;
  breakpoints: breakpointsProps[];
  options: { [key: string]: boolean };
};

const Slider = ({ children, autoPlaySeconds, breakpoints, options }: SliderProps) => {
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

  const [sliderState, setSliderState] = useState({
    activeIndex: QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex,
    translateWidth: QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault,
    transition: QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsDefault,
    transitioning: false,
    slides: [lastSlide, firstSlide, secondSlide],
  });

  const nextSlide = () => {
    if (sliderState.transitioning) return;

    const newTranslateWidth = sliderState.translateWidth + QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault;
    const newActiveIndex =
      sliderState.activeIndex === getLastIndex(slidesGroup)
        ? QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex
        : sliderState.activeIndex + 1;
    setSliderState((prev) => ({ ...prev, translateWidth: newTranslateWidth, activeIndex: newActiveIndex }));
  };

  const prevSlide = () => {
    if (sliderState.transitioning) return;

    const newTranslateWidth = QUIZ_APP_CONSTANTS.SLIDER.translateWidthStart;
    const newActiveIndex =
      sliderState.activeIndex === QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex
        ? getLastIndex(slidesGroup)
        : sliderState.activeIndex - 1;
    setSliderState((prev) => ({ ...prev, translateWidth: newTranslateWidth, activeIndex: newActiveIndex }));
  };

  const smoothTransition = () => {
    let _slides: any[] = [];

    if (sliderState.activeIndex === getLastIndex(slidesGroup)) {
      _slides = [SliderUtils.getNextToLastElement(slidesGroup), lastSlide, firstSlide];
    } else if (sliderState.activeIndex === QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = SliderUtils.getSubSlides(slidesGroup, sliderState.activeIndex);
    }

    setSliderState((prev) => ({
      ...prev,
      slides: _slides,
      transition: QUIZ_APP_CONSTANTS.SLIDER.translateWidthStart,
      translateWidth: QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault,
    }));
  };

  const throttleArrows = () => {
    setSliderState((prev) => ({ ...prev, transitioning: true }));
  };

  const handleResize = () => {
    setSlidesGroup(() => {
      const slidesPerPage = SliderUtils.createSlidesPerPage(breakpoints);
      return SliderUtils.createSlides(children, slidesPerPage);
    });
  };

  const handleDotsChange = (activeIndex: number) => {
    if (sliderState.activeIndex === activeIndex) {
      return;
    }

    setSliderState((prev) => {
      let translateWidth = prev.translateWidth;
      const currentActiveIdx = prev.activeIndex;

      if (activeIndex > currentActiveIdx) {
        translateWidth += QUIZ_APP_CONSTANTS.SLIDER.translateWidthDefault;
      } else {
        translateWidth = QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsStart;
      }

      return { ...prev, activeIndex, translateWidth };
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
        slider.removeEventListener('transitionstart', transitionStart);
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
      interval = window.setInterval(play, autoPlaySeconds * QUIZ_APP_CONSTANTS.COMMON.oneSecond);
    }

    return () => {
      if (autoPlaySeconds) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (sliderState.transition === QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsStart) {
      setSliderState((prev) => ({
        ...prev,
        transition: QUIZ_APP_CONSTANTS.SLIDER.transitionSecondsDefault,
        transitioning: false,
      }));
    }
  }, [sliderState.transition]);

  useEffect(() => {
    setSliderState((prev) => ({
      ...prev,
      slides: [lastSlide, firstSlide, secondSlide],
      activeIndex: QUIZ_APP_CONSTANTS.SLIDER.initialActiveIndex,
    }));
  }, [firstSlide, secondSlide, lastSlide]);

  return (
    <SliderWrap ref={sliderRef}>
      <SliderContent
        translateWidth={sliderState.translateWidth}
        transition={sliderState.transition}
        totalSlide={sliderState.slides.length}
      >
        {sliderState.slides.map((slideContainer, idxContainer) => (
          <SlideContainer
            key={`slider-${idxContainer}`}
            slidesPerPage={SliderUtils.createSlidesPerPage(breakpoints)}
            totalSlide={sliderState.slides.length}
          >
            {slideContainer.map((item, idx) => (
              <Slide key={`slider-${idxContainer}-${idx}`} slidesPerPage={SliderUtils.createSlidesPerPage(breakpoints)}>
                {item}
              </Slide>
            ))}
          </SlideContainer>
        ))}
      </SliderContent>
      {options.arrow && (
        <>
          <Arrow direction="left" onClick={prevSlide}>
            <IoIosArrowDropleft />
          </Arrow>
          <Arrow direction="right" onClick={nextSlide}>
            <IoIosArrowDropright />
          </Arrow>
        </>
      )}
      {options.dots && (
        <Dots>
          {slidesGroup.map((_, idx) => (
            <DotItem
              key={`dots-${idx}`}
              active={sliderState.activeIndex === idx}
              onClick={() => handleDotsChange(idx)}
            />
          ))}
        </Dots>
      )}
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
  options: {
    arrow: true,
    dots: false,
  },
};

export default Slider;
