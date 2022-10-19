import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.main`
  margin-bottom: 6rem;
  width: 100%;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 4.8rem;
  max-width: 88rem;
`;

export const GameBanner = styled.div`
  img {
    object-fit: cover;
    width: 100%;
  }
`;

export const QuestionDashboard = styled.ul`
  background: ${(props) => props.theme.background};
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.8rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  max-width: 88rem;
  margin-bottom: 10rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.4rem;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '0.4rem 1.2rem 2rem' }, { [devices.smallDevices]: '0.4rem 3.2rem 2rem' }],
  })};
`;

const getBackgroundQuestionDashboardItem = ({
  isFlag,
  isSubmit,
  isCorrect,
  isSelected,
  flagColor,
  correctColor,
  errorColor,
  normalColor,
  selectedColor,
}: Props) => {
  if (isSubmit) {
    if (isCorrect) {
      return correctColor;
    }

    return errorColor;
  }

  if (isFlag) {
    return flagColor;
  }

  if (isSelected) {
    return selectedColor;
  }

  return normalColor;
};

export const QuestionDashboardItem = styled.li<Props>`
  background-color: ${(props) =>
    getBackgroundQuestionDashboardItem({
      isFlag: props.isFlag,
      isSubmit: props.isSubmit,
      isCorrect: props.isCorrect,
      isSelected: props.isSelected,
      flagColor: props.theme.mainColor,
      correctColor: props.theme.successColor,
      errorColor: props.theme.errorColor,
      normalColor: props.theme.backgroundColor,
      selectedColor: props.theme.borderColor,
    })};
  border: 0.2rem solid ${(props) => (props.active ? props.theme.mainColor : props.theme.borderColor)};
  border-radius: 0.4rem;
  color: ${(props) => (props.isFlag || props.isSubmit ? props.theme.backgroundColor : props.theme.fontColor)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  height: 4.8rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  margin-top: 1.6rem;
  width: 4.8rem;
`;

export const ExamResult = styled.div`
  max-width: 88rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.4rem;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '0.4rem 1.2rem 2rem' }, { [devices.smallDevices]: '0.4rem 3.2rem 2rem' }],
  })};
`;
