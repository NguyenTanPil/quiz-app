import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { createSlides } from '../../utils';
import { Arrow, Slide, SliderContent, SliderWrap } from './SliderStyles';

type SliderProps = {
  children: any[];
  autoPlaySeconds: number | null;
  slidesPerPage: number;
};

// children >= 3
const Slider = ({ children, autoPlaySeconds, slidesPerPage }: SliderProps) => {
  const autoPlayRef = useRef<() => void>();
  const transitionRef = useRef<() => void>();
  const resizeRef = useRef<() => void>();
  const sliderRef = useRef<HTMLDivElement>();
  const throttleRef = useRef<() => void>();

  const firstSlide = useMemo(
    () => createSlides(children, slidesPerPage)[0],
    [],
  );
  const secondSlide = useMemo(
    () => createSlides(children, slidesPerPage)[1],
    [],
  );
  const lastSlide = useMemo(
    () =>
      createSlides(children, slidesPerPage)[
        createSlides(children, slidesPerPage).length - 1
      ],
    [],
  );

  const [translateWidth, setTranslateWidth] = useState(100);
  const [transition, setTransition] = useState(0.45);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slides, setSlides] = useState([lastSlide, firstSlide, secondSlide]);

  const nextSlide = () => {
    if (transitioning) return;

    setTranslateWidth((prev) => prev + 100);
    setActiveIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (transitioning) return;

    setTranslateWidth(0);
    setActiveIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  const smoothTransition = () => {
    let _slides = [];

    if (activeIndex === createSlides(children, slidesPerPage).length - 1) {
      _slides = [
        createSlides(children, slidesPerPage)[
          createSlides(children, slidesPerPage).length - 2
        ],
        lastSlide,
        firstSlide,
      ];
    } else if (activeIndex === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = createSlides(children, slidesPerPage).slice(
        activeIndex - 1,
        activeIndex + 2,
      );
    }

    setSlides(_slides);
    setTransition(0);
    setTranslateWidth(100);
  };

  const throttleArrows = () => {
    setTransitioning(true);
  };

  const handleResize = () => {
    setTransition(0);
    setTranslateWidth(100);
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

    if (sliderRef?.current) {
      slider = sliderRef.current;

      const smooth = () => {
        transitionRef.current?.();
      };

      const throttle = () => {
        throttleRef.current?.();
      };

      const resize = () => {
        resizeRef.current?.();
      };

      transitionStart = slider.addEventListener('transitionstart', throttle);
      transitionEnd = slider.addEventListener('transitionend', smooth);
      onResize = window.addEventListener('resize', resize);
    }

    return () => {
      if (sliderRef.current) {
        slider.removeEventListener('transitionend', transitionStart);
        slider.removeEventListener('transitionend', transitionEnd);
      }
      window.removeEventListener('resize', onResize);
    };
  }, [sliderRef.current]);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current?.();
    };

    let interval: number;

    if (autoPlaySeconds) {
      interval = window.setInterval(play, autoPlaySeconds * 1000);
    }

    return () => {
      if (autoPlaySeconds) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (transition === 0) {
      setTransition(0.45);
      setTransitioning(false);
    }
  }, [transition]);

  return (
    <SliderWrap ref={sliderRef}>
      <SliderContent
        translateWidth={translateWidth}
        transition={transition}
        totalSlide={slides.length}
      >
        {slides.map((slideContainer, idxContainer) =>
          slideContainer.map((item, idx) => (
            <Slide
              key={`slider-${idxContainer}-${idx}`}
              slidesPerPage={slidesPerPage}
            >
              {item}
            </Slide>
          )),
        )}
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
};

export default Slider;
