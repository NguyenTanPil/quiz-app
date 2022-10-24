import styled, { css } from 'styled-components';
import { jelly } from './animations';

type Props = {
  [key: string]: any;
};

const InputPattern = css`
  appearance: auto;
  background-color: transparent;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  min-height: 4.8rem;
  outline: none;
  padding: 1.2rem 3.2rem 1.2rem 1.6rem;
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FieldGroup = styled.div<Props>`
  position: relative;

  & > span {
    background-color: #f2f2f2;
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 1.2;
    padding: calc(0.5rem * 0.75) calc(0.5rem * 0.5);
    margin: calc(0.5rem * 0.75 + 0.5rem) calc(0.5rem * 0.5);
    position: absolute;
    left: 1.5rem;
    top: 0.2rem;
    text-transform: capitalize;
    transform: translateX(0, 0);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    white-space: nowrap;
    z-index: 10;
  }

  & > input {
    ${InputPattern};
    border: 0.1rem solid ${(props) => (props.isError ? props.theme.errorColor : props.theme.borderColor)};
    z-index: 20;

    &:focus,
    :not(:placeholder-shown) {
      & + span {
        transform: translate(-0.1rem, -78%) scale(0.8);
        color: ${(props) => props.theme.mainColor};
        z-index: 30;
      }
    }
  }
`;

export const ErrorMessage = styled.div<Props>`
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease-out 0s;

  div {
    padding: 0.75rem 0.5rem 0.5rem 1.8rem;
    text-align: left;
  }

  span {
    color: ${(props) => props.theme.errorColor};
    font-size: 1.2rem;
  }
`;

export const WrapMessage = styled.div<Props>``;

export const IconStatus = styled.div<Props>`
  position: absolute;
  right: 1.2rem;
  top: 1.5rem;

  svg {
    color: ${(props) => (props.isError ? props.theme.errorColor : props.theme.successColor)};
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

export const InputField = styled.input<Props>`
  ${InputPattern};
  border: 0.1rem solid ${(props) => props.theme.borderColor};

  &:focus {
    border-color: ${(props) => props.theme.mainColor};
  }
`;

export const TextareaContainer = styled.textarea<Props>`
  ${InputPattern};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  display: block;
  line-height: 2.4rem;
  min-height: 16rem;
  overflow-y: hidden;
  padding: 3.2rem;
  resize: none;
  text-align: left;
  width: 100%;

  &:focus {
    border-color: ${(props) => props.theme.mainColor};
  }
`;

const jellyAnimation = () =>
  css`
    animation: ${jelly} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;

export const RadioBoxContainer = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 2rem;
  position: relative;
  width: 2rem;

  &:after,
  &:before {
    border: 0.1rem solid
      ${(props) =>
        props.isActive === undefined
          ? props.theme.pageButtonColor
          : props.isActive === false
          ? props.theme.errorColor
          : props.theme.successColor};
    border-radius: 50%;
    box-sizing: border-box;
    content: '';
    height: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
    width: 100%;
  }

  &:after {
    background-color: ${(props) =>
      props.isActive === undefined
        ? 'transparent'
        : props.isActive === false
        ? props.theme.errorColor
        : props.theme.successColor};
    top: 50%;
    transform: ${(props) =>
      props.isActive === undefined ? 'translateY(-50%) scale(0)' : 'translateY(-50%) scale(0.4)'};
  }

  &:before {
    ${(props) => props.active && jellyAnimation};
  }
`;

export const QuizAnswerInputContainer = styled.div`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  display: flex;
  position: relative;
`;

export const QuizAnswerInputContent = styled.label`
  padding: 4rem 0.8rem 0.8rem;
  width: 100%;

  ${TextareaContainer} {
    border-color: transparent;
    border-radius: 0.24rem;
    min-height: 100%;
    padding: 1.2rem;

    &:focus {
      border-color: ${(props) => props.theme.mainColor};
    }
  }
`;

export const QuizAnswerInputHeader = styled.div`
  margin-bottom: 1.2rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 10;
`;

export const QuizAnswerLabelHeader = styled(QuizAnswerInputHeader)`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
  right: auto;
  left: 1.4rem;
`;

export const DateTimePickerContainer = styled.div`
  position: relative;
`;

export const DisplayNoneDateTimePicker = styled.div<Props>`
  position: absolute;
  bottom: 0;
  right: 5.5rem;
  visibility: hidden;
  z-index: 10;
`;

export const OverrideDateTimePicker = styled.div`
  position: relative;
  z-index: 20;

  input {
    cursor: default;
    font-size: 1.6rem;
    padding-right: 5.2rem;
    position: relative;
    z-index: 100;
  }

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 200;

    &:hover {
      color: ${(props) => props.theme.mainColor};
    }

    svg {
      font-size: 2rem;
      font-weight: 600;
    }
  }
`;

export const SuggestInputContainer = styled.div<Props>`
  position: relative;

  &&& {
    min-width: auto;
  }

  input {
    padding-right: 1.6rem;
  }
`;

export const RichEditor = styled.div`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;

  .ql-toolbar {
    border: none;
    border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
    text-align: left;

    button {
      color: ${(props) => props.theme.fontColor};

      &:hover {
        color: ${(props) => props.theme.mainColor};
      }
    }
  }

  .ql-container {
    border: none;
  }

  .ql-editor p {
    font-size: 1.6rem;
    min-height: 12rem;
  }
`;
