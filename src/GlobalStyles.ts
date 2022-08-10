import styled, { createGlobalStyle } from 'styled-components';
import BgImage from './images/background.jpg';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const Container = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-repeat: no-repeat;
  color: #aaa398;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
`;

export default GlobalStyles;
