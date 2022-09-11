import React from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// components
import Footer from './components/Footer';
import Header from './components/Header';
// type
// other
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Pages/Game';
import Home from './components/Pages/Home';
import { getTheme } from './styles/theme';
import SignUp from './components/Pages/SignUp';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
