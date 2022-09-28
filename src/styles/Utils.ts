import styled, { css } from 'styled-components';
import { breakpoints, devices } from './breakpoints';

const WrapperPattern = css`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 124rem;
  position: relative;

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

export const EmptyListAction = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '4rem 3.2rem' }],
  })};

  span {
    color: ${(props) => props.theme.titleColor};
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1.2rem;
  }

  button {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
`;
