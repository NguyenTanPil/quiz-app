import styled from 'styled-components';

type ContentProps = {
  [key: string]: any;
};

export const SliderWrap = styled.div<ContentProps>`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const SliderContent = styled.ul<ContentProps>`
  display: flex;
  height: 100%;
  transform: translateX(-${(props) => props.translateWidth / props.totalSlide}%);
  ${(props) => props.translateWidth !== 100 && `transition: transform ease-out ${props.transition}s`};
  width: ${(props) => props.totalSlide * 100}%;
`;

export const SlideContainer = styled.li<ContentProps>`
  display: flex;
  justify-content: ${(props) => (props.slidesPerPage === 1 ? 'center' : 'space-between')};
  height: 100%;
  padding-left: 8rem;
  padding-right: 8rem;
  width: calc(${(props) => `100% / ${props.totalSlide} - 16rem`});
`;

export const Slide = styled.div<ContentProps>`
  display: flex;
  justify-content: center;
  height: 100%;
  width: ${(props) => (props.slidesPerPage <= 1 ? '100%' : `calc(100% / ${props.slidesPerPage} - 2rem)`)};
`;

export const Arrow = styled.div<ContentProps>`
  border-radius: 50%;
  color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  position: absolute;
  ${(props) => (props.direction === 'right' ? `right: 2rem` : `left: 2rem`)};
  top: calc(50% - 2.5rem);
  transition: transform ease-in 0.1s;
  width: 5rem;

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 5rem;
    transform: translateX(${(props) => (props.direction === 'left' ? '-2' : '2')}px);

    &:focus {
      outline: 0;
    }
  }
`;
