import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  margin-top: 3.2rem;
`;

export const TabContainer = styled.ul`
  background-color: #f2f2f2;
  border-radius: 0.4rem;
  color: ${(props) => props.theme.mainColor};
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '1.2rem' }, { [devices.smallDevices]: '1.2rem 2.4rem' }],
  })};
`;

export const TabItem = styled.li<Props>`
  background: ${(props) => (props.tabName === props.activeTab ? props.theme.backgroundColor : 'transparent')};
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '1.2rem 1.2rem' }, { [devices.smallDevices]: '1.2rem 2rem' }],
  })};
`;

export const NavContainer = styled.ul``;

export const NavItem = styled.li<Props>`
  display: ${(props) => (props.tabName === props.activeTab ? 'block' : 'none')};
`;
