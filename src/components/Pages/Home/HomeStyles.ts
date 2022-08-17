import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${breakpoints({
    cssProp: 'margin-top',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: '3.2' }, { [devices.mediumDevices]: '4.8' }],
  })};
`;

export const LeftSide = styled.div`
  padding-right: 0.8rem;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: '100' }, { [devices.largeDevices]: '50' }],
  })};

  ${breakpoints({
    cssProp: 'text-align',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'center' },
      { [devices.largeDevices]: 'left' },
    ],
  })};

  h1 {
    color: ${(props) => props.theme.titleColor};
    font-weight: 600;
    margin: 0 auto;
    max-width: 59rem;

    ${breakpoints({
      cssProp: 'font-size',
      cssPropUnits: 'rem',
      values: [
        { [devices.default]: '3.6' },
        { [devices.smallDevices]: '4.8' },
        { [devices.veryLargeDevices]: '5.6' },
      ],
    })};
  }

  p {
    color: ${(props) => props.theme.fontColor};
    font-weight: 600;
    line-height: 1.6;
    margin: 3.2rem auto;
    max-width: 59rem;

    ${breakpoints({
      cssProp: 'font-size',
      cssPropUnits: 'rem',
      values: [
        { [devices.default]: '2' },
        { [devices.veryLargeDevices]: '2.4' },
      ],
    })};
  }

  button {
    padding: 2rem 4rem;
  }
`;

export const RightSide = styled.div`
  padding-left: 0.8rem;

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'none' },
      { [devices.largeDevices]: 'block' },
    ],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: '0' }, { [devices.largeDevices]: '50' }],
  })};

  img {
    width: 100%;
  }
`;
