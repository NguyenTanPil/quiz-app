import styled, { keyframes } from 'styled-components';
import { breakpoints, devices } from '../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const ActionsCategory = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.2rem;
  min-height: 100%;
`;

export const CategoryColor = styled.div<Props>`
  background-color: ${(props) => props.color};
  border-radius: 0.4rem;
  height: 4rem;
  min-width: 4rem;
  width: 4rem;
`;

export const CategoryContent = styled.div`
  flex-grow: 1;
  margin-left: 1.2rem;
  text-align: left;

  h4 {
    color: ${(props) => props.theme.titleColor};
    display: -webkit-box;
    font-size: 1.6rem;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  p {
    color: ${(props) => props.theme.fontColor};
    display: -webkit-box;
    font-size: 1.4rem;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const CategoryItem = styled.li`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 2.4rem;
  min-height: 9.8rem;
  padding: 1.2rem;
  position: relative;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.mediumDevices]: 'calc(50% - 1rem)' }],
  })};
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -2.4rem;
  padding: 1.6rem;
`;

export const DropdownList = styled.ul`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: calc(4.4rem * 5);
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  top: calc(100% + 0.4rem);
  z-index: 300;
`;

export const DropdownItem = styled.li<Props>`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};

  &:first-child {
    button {
      border-top-left-radius: 0.4rem;
      border-top-right-radius: 0.4rem;
    }
  }

  &:last-child {
    border-bottom: none;

    button {
      border-bottom-left-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }

  button {
    background-color: ${(props) => (props.selected ? props.theme.borderColor : props.theme.backgroundColor)};
    border-radius: 0;
    color: ${(props) => (props.selected ? props.theme.mainColor : props.theme.fontColor)};

    &:hover {
      background-color: ${(props) => props.theme.dropdownButtonHover};
    }
  }
`;

export const RadioBoxList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &&& {
    margin-bottom: 0;
  }

  & > div {
    button {
      animation: ${pulse} 1s ease infinite 0s;
      border-color: ${(props) => props.theme.mainColor};
      margin-right: 0;
      padding: 0;
      width: 4.8rem;

      svg {
        font-size: 2.4rem;
      }
    }
  }

  button {
    background-color: transparent;
    box-sizing: border-box;
    color: ${(props) => props.theme.mainColor};
    height: 4.8rem;
    margin-bottom: 2.4rem;
    margin-right: 2.4rem;
    padding-left: 3.6rem;
    padding-right: 3.6rem;
    position: relative;
    z-index: 200;

    &:last-child {
      margin-right: 0;
    }

    & > div {
      height: 1.6rem;
      position: absolute;
      right: 0.6rem;
      top: 0.6rem;
      width: 1.6rem;
      z-index: 100;
    }
  }
`;

export const QuizList = styled.ul`
  margin-top: 4rem;
`;

export const QuizItem = styled.li`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const QuizItemHeader = styled.div`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 1.2rem;
`;

export const QuizItemNumber = styled.h4`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
  padding-bottom: 1.2rem;
`;

export const QuizItemActions = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1.2rem;

  & > div {
    margin-left: 0.8rem;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const QuizItemContent = styled.p`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.1rem;
  margin: 0;
  padding-bottom: 2.4rem;
  padding-top: 2.4rem;
`;

export const QuizItemAnswers = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -3.2rem;
  margin-right: -3.2rem;
  padding: 1.2rem 0.8rem;
`;

export const QuizItemAnswer = styled.li`
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  padding: 1.2rem 2.4rem;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: 100 }, { [devices.mediumDevices]: 50 }],
  })};

  span {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: 0.1rem;
  }
`;

export const QuizItemAnswerStatus = styled.div<Props>`
  background-color: ${(props) => (props.isCorrect ? props.theme.successColor : props.theme.errorColor)};
  border-radius: 50%;
  height: 1.6rem;
  margin-right: 0.8rem;
  margin-top: 0.4rem;
  min-width: 1.6rem;
  width: 1.6rem;
`;

export const LabelGroup = styled.h3`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 0;
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;