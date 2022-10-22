import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.main`
  margin-bottom: 6rem;
  width: 100%;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 4.8rem;
  max-width: 88rem;
`;

export const GameBanner = styled.div`
  img {
    object-fit: cover;
    width: 100%;
  }
`;

export const ExamResult = styled.div`
  max-width: 88rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.4rem;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '0.4rem 1.2rem 2rem' }, { [devices.smallDevices]: '0.4rem 3.2rem 2rem' }],
  })};
`;
