import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.div`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
`;

export const Content = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${breakpoints({
    cssProp: ['padding-bottom', 'padding-top'],
    cssPropUnits: 'rem',
    values: [{ [devices.smallDevices]: 1 }, { [devices.mediumDevices]: 1.2 }],
  })};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  margin-right: 1.2rem;

  &:last-child {
    margin-right: 0;
  }
`;

export const RightSide = styled.div``;

export const Logo = styled(Link)`
  padding: 0 0.8rem;

  span {
    color: ${(props) => props.theme.mainColor};
    font-size: 3.2rem;
    font-weight: 600;
  }
`;
