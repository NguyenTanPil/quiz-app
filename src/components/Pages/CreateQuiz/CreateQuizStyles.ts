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
  background-color: #fbfbfd;
  border-radius: 0.8rem;
  display: flex;
  padding: 4rem 3.2rem;

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
  background-color: #fbfbfd;
  border-radius: 0.8rem;
  display: flex;
  margin-top: 4rem;
  padding: 2.4rem 3.2rem;

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
`;

export const QuizList = styled.ul`
  margin-top: 4rem;
`;

export const QuizItem = styled.li`
  background-color: #fbfbfd;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
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

  button {
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

export const NoQuiz = styled(TotalQuiz)`
  align-items: center;
  flex-direction: column;

  span {
    color: ${(props) => props.theme.titleColor};
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1.2rem;
  }

  button {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
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

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(40% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
  }
`;

export const QuizOptions = styled(TotalQuiz)`
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    margin-bottom: 1.2rem;
  }
`;

export const LevelQuiz = styled.div`
  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(60% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
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