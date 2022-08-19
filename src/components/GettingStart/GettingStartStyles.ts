import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.div`
  margin-bottom: 8rem;

  ${breakpoints({
    cssProp: 'margin-top',
    cssPropUnits: 'rem',
    values: [
      {
        [devices.default]: 6,
      },
      { [devices.mediumDevices]: 7.2 },
    ],
  })};
`;

export const ListStep = styled.ul`
  display: flex;
  justify-content: space-between;

  ${breakpoints({
    cssProp: 'align-items',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'center' },
      { [devices.largeDevices]: 'unset' },
    ],
  })};

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'column' },
      { [devices.largeDevices]: 'row' },
    ],
  })};
`;

export const StepItem = styled.li`
  box-sizing: border-box;
  box-shadow: rgba(171, 226, 113, 0.2) 0.5rem 0.5rem,
    rgba(171, 226, 113, 0.15) 1rem 1rem, rgba(171, 226, 113, 0.1) 1.5rem 1.5rem;
  background-color: #f7f7f7;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2.4rem;
  max-width: 32rem;
  padding: 4rem;

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

  img {
    display: block;
    margin-bottom: 2.4rem;
    width: 100%;
  }

  h4 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    text-align: center;
  }
`;
