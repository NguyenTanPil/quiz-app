import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

export const StepItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4rem;
  max-width: 32rem;
  padding: 0 4rem 4rem;

  ${breakpoints({
    cssProp: 'max-width',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 40 }, { [devices.largeDevices]: 32 }],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [
      { [devices.default]: '100%' },
      { [devices.largeDevices]: 'calc((100% - 8rem) / 3)' },
    ],
  })};

  svg {
    color: ${(props) => props.theme.mainColor};
    font-size: 5.2rem;
  }

  h4 {
    font-size: 2.4rem;
    font-weight: 600;
    margin: 1.6rem 0;
    text-align: center;
  }

  p {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    margin: 0;
    text-align: center;
  }
`;
