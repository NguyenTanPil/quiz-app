import styled from 'styled-components';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const FieldGroup = styled.div<Props>`
  position: relative;

  & > span {
    background-color: #fbfbfd;
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
    appearance: auto;
    background-color: transparent;
    border: 0.1rem solid ${(props) => (props.isError ? props.theme.errorColor : props.theme.borderColor)};
    border-radius: 0.4rem;
    box-sizing: border-box;
    color: ${(props) => props.theme.fontColor};
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    outline: none;
    padding: 1.2rem 3.2rem 1.2rem 1.6rem;
    position: relative;
    width: 100%;
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
