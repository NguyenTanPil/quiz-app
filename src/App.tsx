import React, { useState } from 'react';
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
  const [user, setUser] = useState({ name: 'tanpil', email: 'tanpil@gmail.com' });
  const [isLogin, setIsLogin] = useState(true);
  const [globalQuiz, setGlobalQuiz] = useState<any[]>([]);

  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <Router>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game quizList={globalQuiz[0]?.quizList} />} />
          <Route path="/sign-up" element={<SignUp isLogin={isLogin} setUser={setUser} />} />
          <Route path="/sign-in" element={<SignIn isLogin={isLogin} user={user} setIsLogin={setIsLogin} />} />
          <Route
            path="/create-quiz"
            element={<CreateQuiz isLogin={isLogin} user={user} setGlobalQuiz={setGlobalQuiz} />}
          />
          <Route path="/profile" element={<Profile isLogin={isLogin} user={user} setUser={setUser} />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
