import styled from 'styled-components';

type Props = {
  [key: string]: any;
};

export const Content = styled.div<Props>`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-shadow: ${(props) =>
    props.position === 'top' ? '0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.2)' : '0 -0.2rem 0.2rem 0 rgba(0, 0, 0, 0.2)'};
  opacity: 0;
  padding: 0.8rem;
  position: absolute;
  ${(props) => props.position === 'top' && 'bottom: calc(100% + 1.4rem)'};
  ${(props) => props.position === 'bottom' && 'top: calc(100% + 1.4rem)'};
  left: 50%;
  text-transform: capitalize;
  transform: translateX(-50%);
  transition: opacity 0.2s ease-out 0.4s;
  visibility: hidden;
  z-index: 1000;

  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
  }
`;

export const Container = styled.div`
  display: inline-block;
  position: relative;

  &:hover {
    ${Content} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const Arrow = styled.span<Props>`
  border: 0.8rem solid black;
  border-color: ${(props) => `transparent transparent ${props.theme.backgroundColor} ${props.theme.backgroundColor}`};
  box-shadow: -0.2rem 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 0;
  position: absolute;
  bottom: ${(props) => (props.position === 'top' ? '-0.8rem' : 'calc(100% - 0.8rem)')};
  left: 50%;
  transform: translateX(-50%) rotate(${(props) => (props.position === 'top' ? '-45deg' : '135deg')});
  width: 0;
  z-index: 1100;
`;
