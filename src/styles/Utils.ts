import styled, { css } from 'styled-components';
import { breakpoints, devices } from './breakpoints';

type Props = {
  [key: string]: any;
};

const WrapperPattern = css`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 124rem;
  position: relative;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.6 }, { [devices.mediumDevices]: 2.4 }],
  })};
`;

export const Wrapper = styled.div`
  ${WrapperPattern}
`;

export const WrapperSection = styled.section`
  ${WrapperPattern}
`;

export const SectionTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 4rem;
  margin-top: 0;
  text-align: center;

  ${breakpoints({
    cssProp: 'font-size',
    cssPropUnits: 'rem',
    values: [
      {
        [devices.default]: 2.8,
      },
      { [devices.mediumDevices]: 3.6 },
    ],
  })};
`;

export const EmptyListAction = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '4rem 3.2rem' }],
  })};

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
