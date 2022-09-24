import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
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

  .MuiCalendarPicker-root button.Mui-selected {
    background-color: #9852f9 !important;
  }

  .MuiCalendarOrClockPicker-root {
    .MuiClock-pin, 
    .MuiClockPointer-root, 
    .MuiClockPointer-thumb, 
    .MuiIconButton-root {
      background-color: #9852f9;
    }

    .MuiIconButton-root {
      background-color: #ffffff;
      border: 0.1rem solid #9852f9;
      color: #9852f9;

      &:hover {
        background-color: #9852f9;
        border-color: transparent;
        color: #ffffff;
      }
    }

    .MuiClockPointer-thumb {
      border-color: #9852f9;
    }

    .MuiClock-root {
      .MuiIconButton-root {
        background-color: #ffffff;
        border-color: #9852f9;
        color: #9852f9;

        &:hover {
          background-color: #9852f9;
          border-color: #9852f9;
          color: #ffffff;
        }
      }
    }

    .MuiPickersCalendarHeader-labelContainer {
      font-size: 1.6rem;
    }

    .MuiTypography-root, 
    .MuiButtonBase-root, 
    .MuiClockNumber-root {
      font-size: 1.2rem;
    }
  }
`;

export default GlobalStyles;
