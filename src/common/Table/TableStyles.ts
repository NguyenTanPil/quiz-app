import styled, { css } from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

const renderWidthTRowCell = (props: any) => {
  const { widthArr } = props;
  let style = '';

  for (let i = 0; i < widthArr.length; i++) {
    style += `
      &:nth-child(${i + 1}) {
        width: ${widthArr[i]}%;
      }
    `;
  }

  return css`
    ${style}
  `;
};

export const TBody = styled.div``;

export const TRow = styled.div`
  border-bottom: 0.4rem solid #f8f9fd;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};

  ${breakpoints({
    cssProp: ['padding-bottom', 'padding-top'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.6 }, { [devices.smallDevices]: 0 }],
  })};
`;

export const TCell = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  text-transform: capitalize;
  padding: 2rem 3.2rem;
  position: relative;
  width: 100%;

  &:before {
    font-weight: 600;

    ${breakpoints({
      cssProp: 'content',
      cssPropUnits: '',
      values: [{ [devices.default]: 'attr(data-label)' }, { [devices.smallDevices]: '""' }],
    })};
  }

  ${breakpoints({
    cssProp: 'justify-content',
    cssPropUnits: '',
    values: [{ [devices.default]: 'space-between' }, { [devices.smallDevices]: 'flex-start' }],
  })};

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '0.8rem 2rem' }, { [devices.smallDevices]: '2rem 3.2rem' }],
  })};
`;

export const THead = styled(TRow)`
  border-bottom-color: #eceffa;

  & > div {
    color: ${(props) => props.theme.titleColor};
    font-weight: 600;
  }

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [{ [devices.default]: 'none' }, { [devices.smallDevices]: 'flex' }],
  })};
`;

export const Container = styled.div<Props>`
  /* background-color: #fbfbfd; */
  /* min-width: 78rem; */
  width: 100%;

  @media only screen and (min-width: 576px) {
    ${TCell} {
      ${(props) => renderWidthTRowCell(props)};
    }
  }
`;
