import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

export const Container = styled.main`
  padding-bottom: 6rem;
  padding-top: 4rem;
  width: 100%;
`;

export const Content = styled.div`
  background-color: #fbfbfd;
  border-radius: 0.8rem;
  display: flex;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.largeDevices]: 4 }],
  })};
`;

export const FormContainer = styled.div`
  box-sizing: border-box;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 2 }, { [devices.smallDevices]: 4 }],
  })};

  ${breakpoints({
    cssProp: 'padding-right',
    cssPropUnits: 'rem',
    values: [
      { [devices.default]: 2 },
      { [devices.smallDevices]: 4 },
      { [devices.mediumDevices]: 0 },
      { [devices.largeDevices]: 4 },
    ],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: 100 }, { [devices.mediumDevices]: 40 }, { [devices.largeDevices]: 50 }],
  })};

  form > div {
    margin-bottom: 2.4rem;
  }

  button {
    margin-top: 2.4rem;
  }
`;

export const FormTitle = styled.div`
  padding-bottom: 3.6rem;

  & > h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 3.2rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const SignUpBanner = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [{ [devices.default]: 'none' }, { [devices.mediumDevices]: 'flex' }],
  })};

  ${breakpoints({
    cssProp: 'padding-left',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.largeDevices]: 4 }],
  })};

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: 60 }, { [devices.largeDevices]: 50 }],
  })};

  img {
    width: 100%;
  }

  a {
    color: ${(props) => props.theme.fontColor};
    display: block;
    font-size: 1.6rem;
    font-weight: 600;
    margin-left: auto;
    margin-top: 1.6rem;
    text-decoration: underline;
    width: fit-content;
  }
`;
