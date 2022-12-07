import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';
import { ExamBlock } from '../Profile/ProfileStyles';

export const QuestionBankBlock = styled(ExamBlock)`
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const QuestionBankImg = styled.div`
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  margin-right: 2rem;
  width: 6rem;

  svg {
    color: ${(props) => props.theme.backgroundColor};
    font-size: 2.8rem;
  }
`;

export const QuestionBankBody = styled.div`
  margin-right: 2rem;

  a,
  p {
    color: ${(props) => props.theme.titleColor};
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
    margin-bottom: 0.8rem;
    transition: all 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  }

  h5 {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.8rem;
  }

  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.4rem;
  }
`;

export const QuestionBankBlockBtn = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;

  button:first-child {
    margin-right: 1.2rem;
  }
`;
