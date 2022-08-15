import styled from 'styled-components';
import { breakpoints, devices } from './breakpoints';

export const Wrapper = styled.div`
  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.smallDevices]: 1.6 }, { [devices.mediumDevices]: 2.4 }],
  })};
`;
