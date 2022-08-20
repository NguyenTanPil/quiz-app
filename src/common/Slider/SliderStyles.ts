import styled from 'styled-components';

type ContentProps = {
  [key: string]: any;
};

export const SliderWrap = styled.div<ContentProps>`
  height: 40rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const SliderContent = styled.div<ContentProps>`
  display: flex;
  height: 100%;
  transform: translateX(
    -${(props) => props.translateWidth / props.totalSlide}%
  );
  transition: transform ease-out ${(props) => props.transition}s;
  width: ${(props) => props.totalSlide * 100}%;
`;

export const Slide = styled.div<ContentProps>`
  height: 100%;
  width: 100%;
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
  ${(props) =>
    props.direction === 'right' ? `right: 2.5rem` : `left: 2.5rem`};
  top: calc(50% - 2.5rem);
  transition: transform ease-in 0.1s;
  width: 5rem;

  svg {
    font-size: 5rem;
    transform: translateX(
      ${(props) => (props.direction === 'left' ? '-2' : '2')}px
    );

    &:focus {
      outline: 0;
    }
  }
`;
