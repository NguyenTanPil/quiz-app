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
import CreateQuiz from './components/Pages/CreateQuiz';
import Game from './components/Pages/Game';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import { getTheme } from './styles/theme';

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
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
