import styled, { css } from 'styled-components';
import { breakpoints, devices } from './breakpoints';

const WrapperPattern = css`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 124rem;
  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.6 }, { [devices.mediumDevices]: 2.4 }],
  })};
`;

export const Wrapper = styled.div`
  ${WrapperPattern}
`;

export const WrapperSection = styled.section`
  ${WrapperPattern}
`;

export const SectionTitle = styled.h2`
  font-weight: 600;
  margin-bottom: 4rem;
  margin-top: 0;
  text-align: center;

  ${breakpoints({
    cssProp: 'font-size',
    cssPropUnits: 'rem',
    values: [
      {
        [devices.default]: 2.8,
      },
      { [devices.mediumDevices]: 3.6 },
    ],
  })};
`;
