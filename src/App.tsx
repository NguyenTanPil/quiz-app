import React, { useEffect, useState } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// components
import Footer from './components/Footer';
import Header from './components/Header';
// type
// other
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateExam from './components/Pages/CreateExam';
import Game from './components/Pages/Game';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import { getTheme } from './styles/theme';
import { getCookie } from './utils/cookie';
import RouteGroup from './utils/RouteGroup';

const App: React.FC = () => {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [globalQuiz, setGlobalQuiz] = useState<any[]>([]);
  const [data, setData] = useState();

  useEffect(() => {
    const userCookie = getCookie('user');

    if (userCookie) {
      setUser(userCookie);
      setIsLogin(true);
    }
  }, []);

  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <Router>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="sign-up" element={<SignUp isLogin={isLogin} setUser={setUser} />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="exams" element={<RouteGroup />}>
            <Route path=":examId" element={<CreateExam isLogin={isLogin} user={user} />} />
            <Route path="create-exam" element={<CreateExam isLogin={isLogin} user={user} />} />
          </Route>
          <Route path="profile" element={<Profile isLogin={isLogin} user={user} setUser={setUser} />} />
          <Route path="*" element={<div>not found</div>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
