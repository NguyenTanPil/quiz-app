import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../../../api/fetchQuizQuestions';
import Dialog from '../../../common/Dialog';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { Difficulty, QuestionState } from '../../../utils/types';
import Counter from '../../Counter';
import QuestionCard from '../../QuestionCard';
import { Container, Content, GameBanner } from './GameStyles';

const TOTAL_QUESTIONS = 10;
let TIME = 0.1 * 60;

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [isShowCloseDialog, setIsShowCloseDialog] = useState(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleCancelCloseDialog = () => {
    setIsShowCloseDialog(false);
  };

  const handleApplyCloseDialog = () => {
    setIsShowCloseDialog(false);
  };

  const handleTryAgainCompleteDialog = () => {
    setIsShowCompleteDialog(false);
    TIME = 12 * 60;
    setQuestions((prev) => prev.map((question) => ({ ...question, answerClicked: undefined, isCorrect: undefined })));
    setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
    setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
  };

  const handleApplyCompleteDialog = () => {
    setIsShowCompleteDialog(false);
  };

  const handleCompletedTest = () => {
    setIsShowCompleteDialog(true);
    setIsCompleted(true);
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

  useEffect(() => {
    if (score === TOTAL_QUESTIONS) {
      handleCompletedTest();
    }
  }, [score]);

  if (loading) {
    return <div></div>;
  }

  return (
    <Container>
      <Wrapper>
        {/* start dialogs */}
        {isShowCloseDialog && (
          <Dialog
            content="Do you want to exit this exam?"
            title="Confirm to complete"
            applyButtonContent="Okay"
            handleCancelDialog={handleCancelCloseDialog}
            handleApplyDialog={handleApplyCloseDialog}
            handleCloseDialog={() => setIsShowCloseDialog(false)}
          />
        )}

        {isShowCompleteDialog && (
          <Dialog
            content="This exam has completed!"
            title="Confirm to try"
            applyButtonContent="Continue"
            cancelButtonContent="Try Again"
            handleCancelDialog={handleTryAgainCompleteDialog}
            handleApplyDialog={handleApplyCompleteDialog}
            handleCloseDialog={() => setIsShowCompleteDialog(false)}
          />
        )}
        {/* end dialogs */}
        <GameBanner>
          <img src={gameBannerImg} alt="" />
        </GameBanner>
        <Content>
          <Counter time={TIME} isPause={isShowCloseDialog} handleCompletedTest={handleCompletedTest} />
          <QuestionCard
            questionDetails={questions[number]}
            questionNumber={number + 1}
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            isCompleted={isCompleted}
            nextQuestion={nextQuestion}
            checkAnswer={checkAnswer}
            setIsShowDialog={setIsShowCloseDialog}
          />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Game;
