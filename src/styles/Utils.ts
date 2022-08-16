import styled from 'styled-components';
import { breakpoints, devices } from './breakpoints';

export const Wrapper = styled.div`
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
