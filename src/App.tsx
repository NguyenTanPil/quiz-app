import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateExam from './components/Pages/CreateExam';
import Game from './components/Pages/Game';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import { getTheme } from './styles/theme';
import RouteGroup from './utils/RouteGroup';
import ToTopButton from './components/ToTopButton';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <ToTopButton />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game/:examId" element={<Game />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="exams" element={<RouteGroup />}>
            <Route path=":examId" element={<CreateExam />} />
            <Route path="create-exam" element={<CreateExam />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
