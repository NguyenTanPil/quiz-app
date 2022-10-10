import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0;
`;

export const PageSize = styled.span`
  color: ${(props) => props.theme.fontColor};
  font-size: 1.6rem;
  font-weight: 400;
`;

export const CurrentPage = styled.div`
  border: 0.2rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  color: ${(props) => props.theme.fontColor};
  font-size: 1.6rem;
  height: 3.2rem;
  line-height: 3.2rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;

  svg {
    font-size: 2rem;
  }
`;

export const PaginationActions = styled.div`
  display: flex;
  align-items: center;
`;

export const RowCount = styled(PageSize)``;
