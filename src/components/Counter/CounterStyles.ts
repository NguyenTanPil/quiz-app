import styled, { css, keyframes } from 'styled-components';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  background: linear-gradient(90deg, rgba(84, 76, 249, 1) 50%, rgba(152, 82, 249, 1) 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 8rem;
  padding: 2rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -6rem);
  width: 8rem;
  z-index: 100;
`;

const clockAnimationKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const clockAnimationCss = css`
  animation: ${clockAnimationKeyframe} 1s infinite linear;
`;

export const TimeIcon = styled.div<Props>`
  background: radial-gradient(circle 0.3rem, ${(props) => props.theme.backgroundColor} 95%, #0000),
    linear-gradient(${(props) => props.theme.backgroundColor} 50%, #0000 0) center/2px 60% no-repeat;
  border: 0.3rem solid ${(props) => props.theme.backgroundColor};
  border-radius: 50%;
  display: grid;
  height: 4rem;
  width: 4rem;

  &:before,
  &:after {
    content: '';
    grid-area: 1/1;
  }

  &:before {
    background: repeating-conic-gradient(from -2deg, ${(props) => props.theme.backgroundColor} 0 4deg, #0000 0 90deg);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 0.6rem), #000 0);
  }

  &:after {
    ${(props) => props.seconds !== 0 && clockAnimationCss};
    background: linear-gradient(${(props) => props.theme.backgroundColor} 50%, #0000 0) center/0.2rem 80% no-repeat;
  }
`;

export const RemainingTime = styled.div<Props>`
  color: ${(props) => (props.seconds > 5 ? props.theme.backgroundColor : props.theme.errorColor)};
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 0.8rem;
`;
