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
import ClassDetail from './components/Pages/ClassDetail';
import DetailExam from './components/Pages/DetailExam';
import Search from './components/Pages/Search';
import NotFound from './components/Pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <ToTopButton />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game/:examId/:mode" element={<Game />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="exams" element={<RouteGroup />}>
            <Route path=":examId" element={<CreateExam />} />
            <Route path=":examId/detail" element={<DetailExam />} />
            <Route path="create-exam/:classId" element={<CreateExam />} />
          </Route>
          <Route path="class" element={<RouteGroup />}>
            <Route path=":classId" element={<ClassDetail />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:optional" element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
