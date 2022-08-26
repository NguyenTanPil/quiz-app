import styled, { css } from 'styled-components';

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
  flex-direction: row;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

export const TCell = styled.div`
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 400;
  min-height: 4.6rem;
  text-align: center;
  text-transform: capitalize;
  padding: 2rem 3.2rem;
  position: relative;
  width: 100%;
`;

export const THead = styled(TRow)`
  border-bottom-color: #eceffa;

  & > div {
    color: ${(props) => props.theme.titleColor};
    font-weight: 600;
  }
`;

export const Container = styled.div<Props>`
  background-color: #fbfbfd;
  min-width: 78rem;
  width: 100%;

  ${TCell} {
    ${(props) => renderWidthTRowCell(props)};
  }
`;
