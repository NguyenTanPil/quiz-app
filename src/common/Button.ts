import styled from 'styled-components';
import { AnswerButtonProps } from '../utils/types';

type Props = {
  [key: string]: any;
};

const ButtonPattern = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  padding: 1.2rem 1.6rem;
  transition: all 0.25s ease-in-out;
  text-transform: capitalize;
`;

const getBackgroundAnswerButton = ({
  isCorrect,
  userClicked,
  isTestMode,
  isSubmit,
}: {
  isCorrect: boolean;
  userClicked: boolean;
  isTestMode: boolean;
  isSubmit: boolean;
}) => {
  if (isTestMode) {
    if (userClicked) {
      return '#9852f9';
    } else if (isCorrect && isSubmit) {
      return '#45EBA5';
    } else {
      return 'transparent';
    }
  } else {
    if (isCorrect) {
      return '#45EBA5';
    } else if (userClicked) {
      return '#E33E5A';
    } else {
      return 'transparent';
    }
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

export const SignUpButton = styled(ButtonPattern)<Props>`
  background-color: ${(props) =>
    props.disabled ? props.theme.borderColor : props.theme[`${props.typeColor || 'mainColor'}`]};
  border: 0.2rem solid
    ${(props) => (props.disabled ? props.theme.fontColor : props.theme[`${props.typeColor || 'mainColor'}`])};
  color: ${(props) => (props.disabled ? props.theme.fontColor : props.theme.backgroundColor)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? props.theme.borderColor : props.theme.backgroundColor)};
    color: ${(props) => (props.disabled ? props.theme.fontColor : props.theme[`${props.typeColor || 'mainColor'}`])};
  }
`;

export const NoBorderButton = styled(ButtonPattern)<Props>`
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;

export const DropdownSelectedButton = styled(ButtonPattern)`
  justify-content: flex-start;
  width: 100%;
`;

export const AnswerButton = styled(ButtonPattern)<AnswerButtonProps>`
  background: ${({ isCorrect, userClicked, isTestMode, isSubmit }) =>
    getBackgroundAnswerButton({ isCorrect, userClicked, isTestMode, isSubmit })};
  border-color: ${({ isCorrect, userClicked, isTestMode, isSubmit }) =>
    getBackgroundAnswerButton({ isCorrect, userClicked, isTestMode, isSubmit })};
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  border-radius: 1.2rem;
  color: ${(props) =>
    !props.isTestMode && (props.userClicked || props.isCorrect)
      ? props.theme.backgroundColor
      : props.isTestMode && props.userClicked
      ? props.theme.backgroundColor
      : props.theme.fontColor};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  display: block;
  min-height: 14.4rem;
  width: 100%;
`;

export const DialogCloseButton = styled(ButtonPattern)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease-out;

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 2.4rem;

    &:hover {
      color: ${(props) => props.theme.errorColor};
    }
  }
`;

export const OtherAuthenButton = styled(ButtonPattern)<Props>`
  background-color: ${(props) => props.logoColor};
  border: 0.2rem solid ${(props) => props.logoColor};
  box-sizing: border-box;
  color: ${(props) => props.theme.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 4.4rem;
  padding: 0;
  width: 4.4rem;

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.logoColor};
  }
`;

export const ActionButton = styled(OtherAuthenButton)<Props>`
  background-color: ${(props) => (props.disabled ? props.theme.borderColor : props.theme.backgroundColor)};
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-size: 1.6rem;
  height: 3.6rem;
  width: 3.6rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? props.theme.borderColor : props.theme.backgroundColor)};
    border-color: ${(props) =>
      props.disabled ? props.theme.borderColor : props.theme[`${props.typeColor || 'mainColor'}`]};
    color: ${(props) => (props.disabled ? props.theme.fontColor : props.theme[`${props.typeColor || 'mainColor'}`])};
  }
`;
