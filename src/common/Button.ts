import styled from 'styled-components';
import { AnswerButtonProps } from '../utils/types';

const ButtonPattern = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  padding: 1.2rem 1.6rem;
  transition: all 0.25s ease-in-out;
  text-transform: capitalize;
`;

const getBackgroundAnswerButton = ({ correct, userClicked }: { correct: boolean; userClicked: boolean }) => {
  if (correct) {
    return '#45EBA5';
  } else if (userClicked) {
    return '#E33E5A';
  } else {
    return '#00bbf0';
  }
};

export const Button = styled(ButtonPattern)`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 0.2rem solid ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.mainColor};

  &:hover {
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.backgroundColor};
  }
`;

export const SignUpButton = styled(ButtonPattern)`
  background-color: ${(props) => props.theme.mainColor};
  border: 0.2rem solid ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.backgroundColor};

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.mainColor};
  }
`;

export const NoBorderButton = styled(ButtonPattern)`
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;

export const DropdownSelectedButton = styled(ButtonPattern)``;

export const AnswerButton = styled(ButtonPattern)<AnswerButtonProps>`
  color: ${(props) => props.theme.fontColor};
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  border-radius: 1.2rem;
  display: block;
  min-height: 14.4rem;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

// background: ${({ correct, userClicked }) =>
// getBackgroundAnswerButton({ correct, userClicked })};
// border: 0.2rem solid
// ${({ correct, userClicked }) =>
//   getBackgroundAnswerButton({ correct, userClicked })};
