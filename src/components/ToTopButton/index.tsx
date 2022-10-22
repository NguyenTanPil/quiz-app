import React, { useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { scrollToTop } from '../../utils';
import { Container, ToTopBtn } from './ToTopButtonStyles';

const ToTopButton = () => {
  const buttonEl = useRef<HTMLButtonElement>();

  // when scroll add handleVisibleButton function
  useEffect(() => {
    const handleVisibleButton = () => {
      const position = window.pageYOffset;

      if (!buttonEl.current) return;

      if (position > 100) {
        buttonEl.current.style.display = 'block';
      } else {
        buttonEl.current.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleVisibleButton);

    return () => {
      window.removeEventListener('scroll', handleVisibleButton);
    };
  }, []);

  return (
    <Container>
      <ToTopBtn ref={buttonEl} onClick={scrollToTop}>
        <FaArrowUp />
      </ToTopBtn>
    </Container>
  );
};

export default ToTopButton;
