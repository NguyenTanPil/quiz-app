import styled from 'styled-components';
import { breakpoints, devices } from '../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const ActionsCategory = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.2rem;
  min-height: 100%;
`;

export const CategoryColor = styled.div<Props>`
  background-color: ${(props) => props.color};
  border-radius: 0.4rem;
  height: 4rem;
  min-width: 4rem;
  width: 4rem;
`;

export const CategoryContent = styled.div`
  flex-grow: 1;
  margin-left: 1.2rem;
  text-align: left;

  h4 {
    color: ${(props) => props.theme.titleColor};
    display: -webkit-box;
    font-size: 1.6rem;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  p {
    color: ${(props) => props.theme.fontColor};
    display: -webkit-box;
    font-size: 1.4rem;
    margin: 0;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export const CategoryItem = styled.li`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  margin-top: 2.4rem;
  min-height: 9.8rem;
  padding: 1.2rem;
  position: relative;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.mediumDevices]: 'calc(50% - 1rem)' }],
  })};
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -2.4rem;
  padding: 1.6rem;
`;
