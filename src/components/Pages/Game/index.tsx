import React, { useEffect, useState } from 'react';
import { fakeFetchQuizList, fetchQuizQuestions } from '../../../api/fetchQuizQuestions';
import { ConfirmDialog } from '../../../common/Dialog';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { Difficulty, QuestionState } from '../../../utils/types';
import Counter from '../../Counter';
import QuestionCard from '../../QuestionCard';
import { Container, Content, GameBanner } from './GameStyles';

let TIME = 10 * 60;

type Props = {
  [key: string]: any;
};

const quizList = [
  {
    id: '1',
    question: 'Hôm nay là thứ mấy?',
    correctAnswer: { id: '1', content: 'Chủ nhật' },
    inCorrectAnswers: [
      {
        id: '2',
        content: 'Thứ 2',
      },
      {
        id: '3',
        content: 'Thứ 3',
      },
      {
        id: '4',
        content: 'Thứ tư',
      },
    ],
    answerClicked: undefined,
    isCorrect: undefined,
    answers: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ tư'],
  },
  {
    id: '2',
    question: 'Hôm nay là tháng mấy?',
    correctAnswer: { id: '1', content: 'Tháng 10' },
    inCorrectAnswers: [
      {
        id: '2',
        content: 'Tháng 9',
      },
      {
        id: '3',
        content: 'Tháng 12',
      },
      {
        id: '4',
        content: 'Tháng 11',
      },
    ],
    answerClicked: undefined,
    isCorrect: undefined,
    answers: ['Tháng 10', 'Tháng 9', 'Tháng 12', 'Tháng 11'],
  },
];

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [isShowCloseDialog, setIsShowCloseDialog] = useState(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
  const [score, setScore] = useState(QUIZ_APP_CONSTANTS.GAME.initialScore);

  const checkAnswer = (answerId: string, questionId: string) => {
    const isCorrect = questions[number].correctAnswer.id === answerId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const newQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, answerClicked: answerId, isCorrect };
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
    const getQuestions = async () => {
      // const responseQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      const responseQuestions = fakeFetchQuizList(quizList);

      setQuestions(responseQuestions);
      setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
      setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
      setLoading(false);
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (questions.length !== QUIZ_APP_CONSTANTS.GAME.initialScore && score === questions.length) {
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
          <ConfirmDialog
            content="Do you want to exit this exam?"
            title="Confirm to complete"
            applyButtonContent="Okay"
            handleCancelDialog={handleCancelCloseDialog}
            handleApplyDialog={handleApplyCloseDialog}
            handleCloseDialog={() => setIsShowCloseDialog(false)}
          />
        )}

        {isShowCompleteDialog && (
          <ConfirmDialog
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
          <Counter
            time={TIME}
            isPause={isShowCloseDialog || isShowCompleteDialog}
            handleCompletedTest={handleCompletedTest}
          />
          <QuestionCard
            questionDetails={questions[number]}
            questionNumber={number + 1}
            score={score}
            totalQuestions={questions.length}
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
