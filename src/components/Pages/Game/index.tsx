import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../../../api/fetchQuizQuestions';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { Difficulty, QuestionState } from '../../../utils/types';
import Counter from '../../Counter';
import QuestionCard from '../../QuestionCard';
import { Container, Content, GameBanner } from './GameStyles';

const TOTAL_QUESTIONS = 10;
const TIME = 12 * 60;

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
  const [score, setScore] = useState(QUIZ_APP_CONSTANTS.GAME.initialScore);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const answer = e.currentTarget.value;
    const isCorrect = questions[number].correctAnswer === answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newQuestions = questions.map((question) => {
      if (question.id === id) {
        return { ...question, answerClicked: answer, isCorrect };
      }
      return question;
    });

    setQuestions(newQuestions);
  };

  const nextQuestion = () => {
    setNumber((prev) => prev + 1);
  };

  const getTotalCorrectAnswers = () => {
    return questions.filter((question) => question.isCorrect).length;
  };

  useEffect(() => {
    const startTrivia = async () => {
      const responseQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

      setQuestions(responseQuestions);
      setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
      setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
      setLoading(false);
    };

    startTrivia();
  }, []);

  if (loading) {
    return;
  }

  return (
    <Container>
      <Wrapper>
        <GameBanner>
          <img src={gameBannerImg} alt="" />
        </GameBanner>
        <Content>
          <Counter time={TIME} />
          <QuestionCard
            questionDetails={questions[number]}
            totalCorrectAnswers={getTotalCorrectAnswers()}
            questionNumber={number + 1}
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            nextQuestion={nextQuestion}
            checkAnswer={checkAnswer}
          />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Game;
