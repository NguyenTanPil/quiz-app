import styled from 'styled-components';

export const Container = styled.section`
  background-color: rgb(255 250 242 / 1);
  display: flex;
  justify-content: space-between;
`;

export const SideBlock = styled.div`
  display: block;

  img {
    height: 100%;
    max-width: 100%;
    width: 32rem;
  }
`;

export const CenterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 46.4rem;

  button {
    padding: 2rem 4rem;
    width: fit-content;
  }
`;
