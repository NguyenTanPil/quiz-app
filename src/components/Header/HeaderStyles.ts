import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    background-clip: text;
    background-image: linear-gradient(180deg, #fff, #00bbf0);
    background-color: 100%;
    filter: drop-shadow(0.2rem 0.2rem #005792);
    font-size: 6rem;
    font-weight: 600;
    text-align: center;
    margin: 2rem;

    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Score = styled.p`
  color: #000000;
  font-size: 2.4rem;
  font-weight: 600;
  margin: 0;
`;

export const LoadingContainer = styled.p``;
