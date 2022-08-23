import styled from 'styled-components';

type ContentProps = {
  [key: string]: any;
};

export const SliderWrap = styled.div<ContentProps>`
  margin: 0 auto;
  height: 100%;
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
  // padding-left: 8rem;
  // padding-right: 8rem;
  // width: calc(${(props) => `100% / ${props.totalSlide} - 16rem`});
  width: calc(${(props) => `100% / ${props.totalSlide}`});
`;

export const Slide = styled.div<ContentProps>`
  display: flex;
  justify-content: center;
  width: ${(props) => (props.slidesPerPage <= 1 ? '100%' : `calc(100% / ${props.slidesPerPage} - 2rem)`)};
`;

export const Arrow = styled.div<ContentProps>`
  border-radius: 50%;
  color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.8rem;
  position: absolute;
  ${(props) => (props.direction === 'right' ? `right: 2rem` : `left: 2rem`)};
  top: calc(50% - 2.3rem);
  transition: transform ease-in 0.1s;
  width: 4.8rem;

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 5rem;
    transform: translateX(${(props) => (props.direction === 'left' ? '-2' : '2')}px);

    &:focus {
      outline: 0;
    }
  }
`;

export const Dots = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const DotItem = styled.li<ContentProps>`
  background-color: ${(props) => (props.active ? props.theme.mainColor : 'transparent')};
  border: 0.2rem solid ${(props) => props.theme.mainColor};
  border-radius: 50%;
  cursor: pointer;
  height: 1.2rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  width: 1.2rem;
`;
