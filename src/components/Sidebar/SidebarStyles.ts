import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.div<Props>`
  display: flex;
  justify-content: flex-end;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transform: ${(props) =>
    props.isShow ? 'translateX(0)' : 'translateX(100%)'};
  width: 100vw;
  transition: all 0.2s ease-out;
  z-index: 1000;

  ${breakpoints({
    cssProp: 'transform',
    cssPropUnits: '',
    values: [{ [devices.mediumDevices]: 'translateX(100%)' }],
  })}
`;

export const Content = styled.div<Props>`
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgb(0 0 0 / 16%) 0px 0.2rem 2.5rem 0,
    rgb(0 0 0 / 12%) 0 0.2rem 3rem 0;
  height: 100%;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [
      {
        [devices.default]: 60,
      },
      {
        [devices.smallDevices]: 45,
      },
      {
        [devices.mediumDevices]: 40,
      },
      {
        [devices.largeDevices]: 35,
      },
      {
        [devices.veryLargeDevices]: 25,
      },
    ],
  })};
`;

export const Header = styled.div`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};

  &:hover {
    svg {
      color: ${(props) => props.theme.mainColor};
    }
  }

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 3rem;
    font-weight: 700;
    transition: color 0.2s ease-out;
  }
`;

export const ListLink = styled.ul`
  display: flex;
  flex-direction: column;

  & > li {
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;

    &.active {
      span {
        background-color: ${(props) => props.theme.dropdownButtonHover};
        border-left-color: ${(props) => props.theme.mainColor};
        color: ${(props) => props.theme.mainColor};
        padding-left: 4.5rem;
      }
    }
  }

  span {
    background-color: ${(props) => props.theme.backgroundColor};
    border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
    border-left: 0.3rem solid transparent;
    color: ${(props) => props.theme.fontColor};
    display: block;
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: capitalize;
    padding: 1.5rem 3rem 1.5rem 4rem;
    transition: all 0.3s ease 0s;

    &:hover {
      background-color: ${(props) => props.theme.dropdownButtonHover};
      border-left-color: ${(props) => props.theme.mainColor};
      color: ${(props) => props.theme.mainColor};
      padding-left: 4.5rem;
    }
  }
`;
