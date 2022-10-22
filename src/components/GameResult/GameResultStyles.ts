import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const ResultTitle = styled.div`
  margin-bottom: 2.4rem;
  padding-bottom: 0.8rem;
  padding-top: 0.8rem;

  h3 {
    font-size: 2.8rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const TryAgain = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => (props.isEmpty ? 'center' : 'flex-end')};
  padding-top: ${(props) => (props.isEmpty ? '0' : '3.2rem')};

  button {
    ${breakpoints({
      cssProp: 'width',
      cssPropUnits: '',
      values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: '16rem' }],
    })};
  }
`;
