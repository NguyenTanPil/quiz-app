import styled, { keyframes } from 'styled-components';
import carImg from '../../images/car.gif';
import cycleImg from '../../images/cycle.gif';
import footerBg from '../../images/footerBg.png';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.footer`
  background-color: #f2f2f2;
  overflow-x: hidden;
  padding: 4rem 0 28rem;
  position: relative;
`;

export const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1.6rem;
  margin-right: -1.6rem;

  & > div:first-child {
    ${breakpoints({
      cssProp: 'width',
      cssPropUnits: '%',
      values: [{ [devices.default]: 100 }, { [devices.smallDevices]: 28 }],
    })};
  }
`;

export const FooterItem = styled.div`
  box-sizing: border-box;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '%',
    values: [{ [devices.default]: 100 }, { [devices.smallDevices]: 24 }],
  })};
`;

export const CompanyWidget = styled.div`
  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 2.4rem;
    font-weight: 600;
  }

  p {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

export const ListLink = styled.ul`
  ${breakpoints({
    cssProp: 'padding-left',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.smallDevices]: 2.4 }],
  })};

  ${breakpoints({
    cssProp: 'padding-top',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 7.8 }],
  })};

  li {
    margin-bottom: 1.2rem;

    a {
      color: ${(props) => props.theme.fontColor};
      font-size: 1.6rem;
      font-weight: 400;
      transition: color 0.2s ease-out;

      &:hover {
        color: ${(props) => props.theme.mainColor};
      }
    }
  }
`;

export const Language = styled.div`
  ${breakpoints({
    cssProp: 'padding-top',
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 7.8 }],
  })};
`;

export const FooterBottom = styled.div`
  background: url(${footerBg}) no-repeat scroll center 0;
  height: 26.6rem;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const drives = keyframes` 
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
`;

export const FooterBgOne = styled.div`
  background: url(${carImg}) no-repeat center center;
  width: 330px;
  height: 105px;
  background-size: 100%;
  position: absolute;
  bottom: 0;
  left: 30%;
  -webkit-animation: ${drives} 22s linear infinite;
  animation: ${drives} 22s linear infinite;
`;

export const FooterBgTwo = styled.div`
  background: url(${cycleImg}) no-repeat center center;
  width: 88px;
  height: 100px;
  background-size: 100%;
  bottom: 0;
  left: 38%;
  position: absolute;
  -webkit-animation: ${drives} 30s linear infinite;
  animation: ${drives} 30s linear infinite;
`;
