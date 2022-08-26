import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  background: ${(props) => props.theme.background};
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.8rem;
  box-shadow: 0 -3em 3em rgb(73 73 73 / 10%), 0.3em 0.3em 1em rgb(73 73 73 / 10%);
  max-width: 1100px;
  overflow-x: auto;
  padding: 2rem 4rem;
  text-align: center;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem' }, { [devices.smallDevices]: '2rem 4rem' }],
  })};
`;

export const ProgressBar = styled.div`
  margin-top: 5.2rem;
  width: 100%;
`;

export const ProgressBarFill = styled.div`
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 80rem;
  height: 1.2rem;
`;

export const ProgressBarStatus = styled.div<Props>`
  background-color: ${(props) => props.theme.mainColor};
  border-radius: ${(props) => (props.status === 100 ? '80rem' : '80rem 0 0 80rem')};
  height: 100%;
  transition: width 0.2s ease-out;
  width: calc(${(props) => props.status}%);
`;

export const TotalQuestionCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;

  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

export const QuestionContent = styled.div`
  margin-bottom: 1.6rem;

  h3 {
    color: ${(props) => props.theme.mainColor};
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin: 0;
    padding-bottom: 3.2rem;
    padding-top: 3.2rem;

    ${breakpoints({
      cssProp: 'font-size',
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 2.4 }, { [devices.smallDevices]: 3.2 }],
    })};
  }
`;

export const AnswerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const AnswerItem = styled.div`
  width: calc(50% - 2rem);

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 2rem)' }],
  })};

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '1rem 0' }, { [devices.smallDevices]: '2rem 0' }],
  })};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 3.2rem 0 6.4rem;
  width: 100%;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column-reverse' }, { [devices.smallDevices]: 'row' }],
  })};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2.8rem;

    &:last-child {
      padding-right: 0.8rem;
    }

    ${breakpoints({
      cssProp: 'margin-bottom',
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 2 }, { [devices.smallDevices]: 0 }],
    })};

    ${breakpoints({
      cssProp: 'width',
      cssPropUnits: '',
      values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'fit-content' }],
    })};

    svg {
      color: inherit;
      font-size: 2.8rem;
    }
  }
`;
