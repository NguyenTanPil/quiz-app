import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'column-reverse' },
      { [devices.largeDevices]: 'row' },
    ],
  })};

  ${breakpoints({
    cssProp: 'margin-top',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: '3.2' }, { [devices.mediumDevices]: '4.8' }],
  })};
`;

export const LeftSide = styled.div`
  ${breakpoints({
    cssProp: 'padding-right',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: '0' }, { [devices.largeDevices]: '0.8' }],
  })};

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
  ${breakpoints({
    cssProp: 'padding-left',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: '0' }, { [devices.largeDevices]: '0.8' }],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: '100' }, { [devices.largeDevices]: '50' }],
  })};

  img {
    width: 100%;
  }
`;
