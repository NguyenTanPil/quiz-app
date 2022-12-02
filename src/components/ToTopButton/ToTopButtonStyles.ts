import styled from 'styled-components';
import { SignUpButton } from '../../common/Button';
import { pulse } from '../../common/Styles';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 3.7rem;
  z-index: 1008;
`;

export const ToTopBtn = styled(SignUpButton)<Props>`
  animation: ${pulse} 1s ease infinite 0s;
  background-color: ${(props) => props.theme.mainColor};
  border: none;
  display: none;
  outline: none;
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${(props) => `${props.theme.mainColor}CC`};
    color: ${(props) => props.theme.backgroundColor};
    font-weight: 600;
  }
`;
