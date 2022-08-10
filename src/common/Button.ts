import styled from 'styled-components';
import { AnswerButtonProps } from '../utils/types';

const ButtonPattern = styled.button`
  border: 0.1rem solid #00bbf0;
  border-radius: 0.4rem;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  padding: 1.2rem 1.6rem;
  transition: all 0.25s ease-in-out;
`;

const getBackgroundAnswerButton = ({
  correct,
  userClicked,
}: {
  correct: boolean;
  userClicked: boolean;
}) => {
  if (correct) {
    return '#45EBA5';
  } else if (userClicked) {
    return '#E33E5A';
  } else {
    return '#00bbf0';
  }
};

export const Button = styled(ButtonPattern)`
  background-color: #ffffff;
  color: #00bbf0;

  &:hover {
    background-color: #00bbf0;
    color: #ffffff;
  }
`;

export const AnswerButton = styled(ButtonPattern)<AnswerButtonProps>`
  background: ${({ correct, userClicked }) =>
    getBackgroundAnswerButton({ correct, userClicked })};
  border-color: ${({ correct, userClicked }) =>
    getBackgroundAnswerButton({ correct, userClicked })};
  color: #ffffff;
  display: block;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;
