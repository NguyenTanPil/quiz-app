import styled from 'styled-components';

type Props = {
  [key: string]: any;
};

export const Container = styled.div<Props>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1.6rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
`;

export const CenterBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 5.2rem 0;

  h2 {
    color: ${(props) => props.theme.titleColor};
    max-width: 46.4rem;
  }

  button {
    padding: 2rem 4rem;
    width: fit-content;
  }
`;
