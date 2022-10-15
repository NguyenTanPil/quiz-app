import styled from 'styled-components';
import { ActionButton } from '../../../common/Button';
import { breakpoints, devices } from '../../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.main`
  margin-bottom: 6rem;
  margin-top: 4rem;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 80rem;
`;

export const CreateQuizHeader = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '4rem 3.2rem' }],
  })};

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};
`;

export const LabelGroup = styled.h3`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 0;
`;

export const QuizName = styled.div`
  flex-grow: 1;

  ${breakpoints({
    cssProp: 'margin-bottom',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 2.4 }, { [devices.smallDevices]: 0 }],
  })};

  ${breakpoints({
    cssProp: 'margin-right',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.smallDevices]: 4 }],
  })};
`;

export const CreateNewQuiz = styled.div`
  min-width: 16rem;

  button {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
    width: 100%;
  }

  svg {
    font-size: 1.6rem;
    font-weight: 600;
    margin-right: 0.4rem;
  }
`;

export const TotalQuiz = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4rem;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '3.2rem 3.2rem' }],
  })};

  h3 {
    display: flex;
    align-items: center;
    margin-bottom: 0;
    margin-top: 0;

    span {
      color: ${(props) => props.theme.titleColor};
      font-size: 1.6rem;
      font-weight: 600;
    }

    svg {
      font-size: 2rem;
      font-weight: 600;
      margin-right: 0.4rem;
    }
  }

  & > ul {
    ${breakpoints({
      cssProp: 'margin-top',
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 2 }, { [devices.smallDevices]: 0 }],
    })};
  }
`;

export const InputQuizStructure = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};

  && {
    margin-top: 1.6rem;
  }
`;

export const StructureItem = styled.li<Props>`
  display: flex;
  align-items: flex-start;

  ${breakpoints({
    cssProp: 'margin-bottom',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem' }, { [devices.smallDevices]: '0' }],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc((100% / 3) - 0.8rem)' }],
  })};

  &:last-child {
    margin-bottom: 0;
  }

  & > div:first-child > div:first-child {
    border-right: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.8rem;
    margin-right: 0;
    min-width: 4.8rem;
  }

  & > div:last-child {
    flex-grow: 1;
  }

  input {
    border-left: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    padding-right: 1.6rem;

    &:focus {
      border-color: ${(props) => props.theme[props.borderColorHover]};
    }
  }

  input + div > div {
    padding-left: 0;
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
  color: ${(props) => props.theme.fontColor};
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

export const NoQuiz = styled.div`
  margin-top: 4rem;
`;

export const CreateQuizFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.2rem;

  button {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
`;

export const CategoryQuiz = styled.div`
  flex-direction: column;
  position: relative;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
  }

  input[name='category'] {
    cursor: pointer;
  }
`;

export const QuizOptions = styled(TotalQuiz)`
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  & > div {
    margin-bottom: 1.2rem;
  }
`;

export const LevelList = styled.ul`
  display: flex;
  align-items: center;
`;

export const LevelItem = styled.li<Props>`
  background-color: ${(props) => props.theme[props.typeColor]};
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.backgroundColor};
  font-size: 1.6rem;
  margin-right: 0.8rem;
  min-height: 4.6rem;
  padding: 1.2rem 1.6rem;
  text-transform: capitalize;
  width: fit-content;
`;

export const LevelButton = styled(ActionButton)<Props>`
  cursor: default;
  background-color: ${(props) => props.theme[props.typeColor]};
  border: 0.2rem solid ${(props) => props.theme[props.typeColor]};
  color: ${(props) => props.theme.backgroundColor};

  &:hover {
    background-color: ${(props) => props.theme[props.typeColor]};
    border: 0.2rem solid ${(props) => props.theme[props.typeColor]};
    color: ${(props) => props.theme.backgroundColor};
  }
`;

export const TimeDuration = styled.div`
  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
  }
`;

export const TimeDurationGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeDurationItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }

  & > span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 600;
    margin-left: 0.8rem;
  }

  button {
    min-width: 8rem;
  }
`;

export const TimeStart = styled.div`
  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
  }
`;
