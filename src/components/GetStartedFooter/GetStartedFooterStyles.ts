import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.section`
  background-color: rgb(255 250 242 / 1);
  display: flex;
  justify-content: space-between;
`;

export const SideBlock = styled.div`
  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'none' },
      { [devices.largeDevices]: 'block' },
    ],
  })}

  img {
    height: 100%;
    max-width: 100%;
    width: 32rem;
  }
`;

export const CenterBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 5.2rem 0;

  h2 {
    max-width: 46.4rem;
  }

  button {
    padding: 2rem 4rem;
    width: fit-content;
  }
`;
