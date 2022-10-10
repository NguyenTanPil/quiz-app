import styled from 'styled-components';

export const Container = styled.div`
  color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 2rem;
  padding-top: 2rem;

  svg {
    font-size: 6rem;
  }

  p {
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
  }
`;
