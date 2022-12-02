import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.main`
  margin-bottom: 6rem;
  margin-top: 4rem;
`;

export const ClassList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -2.4rem;
  width: 100%;
`;

export const ClassItem = styled.div`
  box-sizing: border-box;
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  padding: 2rem;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [
      { [devices.default]: '100%' },
      { [devices.smallDevices]: 'calc(50% - 1.2rem)' },
      { [devices.mediumDevices]: 'calc((100% / 3) - 1.2rem)' },
      { [devices.largeDevices]: 'calc(25% - 1.2rem)' },
    ],
  })};

  ${breakpoints({
    cssProp: ['margin-right'],
    cssPropUnits: '',
    values: [
      { [devices.default]: '0' },
      { [devices.smallDevices]: '2.4rem' },
      { [devices.mediumDevices]: '1.2rem' },
      { [devices.largeDevices]: '0.6rem' },
    ],
  })};

  &:nth-child(2n) {
    ${breakpoints({
      cssProp: ['margin-right'],
      cssPropUnits: '',
      values: [{ [devices.smallDevices]: '0' }, { [devices.mediumDevices]: '1.2rem' }],
    })};
  }
`;

export const ClassHeader = styled.div<Props>`
  background-color: ${(props) => props.color};
  border-radius: 0.4rem;
  height: 20rem;
  width: 100%;
`;

export const ClassBody = styled.div`
  margin-top: 1.6rem;

  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  p {
    color: ${(props) => props.theme.fontColor};
    display: -webkit-box;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    letter-spacing: 0.1rem;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  span {
    color: ${(props) => props.theme.titleColor};
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
`;

export const ClassFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-grow: 1;
  height: fit-content;
  margin-top: 1.2rem;

  button {
    width: 100%;
  }
`;
