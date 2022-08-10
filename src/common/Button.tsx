import styled from 'styled-components';

export const Button = styled.button`
  background-color: #ffffff;
  border: 0.1rem solid #00bbf0;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: #00bbf0;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  padding: 0.8rem 1.6rem;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #00bbf0;
    color: #ffffff;
  }
`;
