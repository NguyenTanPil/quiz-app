import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3000;
`;

export const Content = styled.div`
  max-width: 40rem;

  img {
    object-fit: cover;
    width: 100%;
  }
`;

export const InlineContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    max-width: 20rem;
    object-fit: cover;
  }
`;
