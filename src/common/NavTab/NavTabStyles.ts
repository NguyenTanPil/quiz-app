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
  border-radius: 0.8rem;
  color: ${(props) => props.theme.mainColor};
  display: flex;
`;

export const TabItem = styled.li<Props>`
  border-bottom: 0.2rem solid ${(props) => (props.tabName === props.activeTab ? props.theme.mainColor : 'transparent')};
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;

  &:first-child {
    border-bottom-left-radius: 0.8rem;
  }

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '2rem 3.2rem' }],
  })};
`;

export const NavContainer = styled.ul``;

export const NavItem = styled.li<Props>`
  display: ${(props) => (props.tabName === props.activeTab ? 'block' : 'none')};
`;
