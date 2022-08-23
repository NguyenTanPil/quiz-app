import React, { useState } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// components
import Footer from './components/Footer';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
// type
import { AnswerObject, Difficulty, QuestionState } from './utils/types';
// other
import { fetchQuizQuestions } from './api/fetchQuizQuestions';
import { getTheme } from './styles/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const isCorrect = questions[number].correct_answer === answer;

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answerClicked: answer,
        correct: isCorrect,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextNumberQuestion = number + 1;

    if (nextNumberQuestion === 10) {
      setGameOver(true);
    } else {
      setNumber(nextNumberQuestion);
    }
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(10, Difficulty.EASY);

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  return (
    <ThemeProvider theme={getTheme('light')}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Container>
            {!loading && !gameOver && (
              <QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            )}
            {!gameOver &&
              userAnswers.length === number + 1 &&
              number !== TOTAL_QUESTIONS - 1 && (
                <Footer nextQuestion={nextQuestion} />
              )}
          </Container> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
