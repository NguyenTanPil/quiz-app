import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../../../api/fetchQuizQuestions';
import { Wrapper } from '../../../styles/Utils';
import { AnswerObject, Difficulty, QuestionState } from '../../../utils/types';
import Counter from '../../Counter';
import QuestionCard from '../../QuestionCard';
import { Container } from './GameStyles';

const Game = () => {
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
    <Container>
      <Wrapper>
        <button onClick={startTrivia}>Play</button>
        <Counter />
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={10}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default Game;
