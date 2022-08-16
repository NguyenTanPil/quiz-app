import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    values: [{ [devices.default]: 1 }, { [devices.mediumDevices]: 1.2 }],
  })};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  align-items: center;

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'none' },
      { [devices.mediumDevices]: 'flex' },
    ],
  })};
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

export const ShowSidebarBox = styled.div`
  cursor: pointer;
  transform: rotate(90deg);

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 2.85rem;
    transition: color 0.2s ease-out;

    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  }

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [
      { [devices.default]: 'block' },
      { [devices.mediumDevices]: 'none' },
    ],
  })}
`;
