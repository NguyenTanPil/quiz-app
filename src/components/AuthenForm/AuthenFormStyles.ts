import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Content = styled.div<Props>`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: ${(props) => (props.isReverse ? 'row-reverse' : 'row')};

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

  form > button {
    margin-top: 2rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
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

export const AuthenFormBanner = styled.div<Props>`
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
    margin-left: ${(props) => (props.isReverse ? '0' : 'auto')};
    margin-top: 2.4rem;
    text-decoration: underline;
    width: fit-content;
  }
`;

export const OtherAuthen = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3.2rem;

  & > span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 400;
    margin-right: 0.4rem;
  }
`;

export const ListAuthen = styled.ul`
  display: flex;
  align-items: center;

  button {
    margin-left: 1.2rem;
  }
`;
