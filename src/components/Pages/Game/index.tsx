import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../../common/Dialog';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import Counter from '../../Counter';
import GameResult from '../../GameResult';
import QuestionCard from '../../QuestionCard';
import { Container, Content, ExamResult, GameBanner, QuestionDashboard, QuestionDashboardItem } from './GameStyles';

const isTestMode = true;
let time = 0;

const result = [{ id: '1', name: 'Nguyen Tan Pil', score: 0.7 * 10, time: 30 }];

const Game = () => {
  const { examId } = useParams();

  const [loading, setLoading] = useState(true);
  const [isShowCloseDialog, setIsShowCloseDialog] = useState(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [restTime, setResetTime] = useState(0);

  const [questions, setQuestions] = useState<any[]>([]);
  const [number, setNumber] = useState(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
  const [score, setScore] = useState(QUIZ_APP_CONSTANTS.GAME.initialScore);
  const [timeDuration, setTimeDuration] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [questionsSelected, setQuestionsSelected] = useState(0);

  const checkAnswer = (answerId: string, questionId: string) => {
    const isCorrect = questions[number].correctAnswer.id === answerId;
    const answerClicked = questions[number].answerClicked;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (!answerClicked) {
      setQuestionsSelected((prev) => prev + 1);
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

  const handleTryAgainCompleteDialog = () => {
    setIsShowCompleteDialog(false);
    setQuestions((prev) => prev.map((question) => ({ ...question, answerClicked: undefined, isCorrect: undefined })));
    setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
    setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
  };

  const handleApplyCompleteDialog = () => {
    setIsShowCompleteDialog(false);
  };

  const handleCompletedTest = (seconds: number) => {
    setResetTime(seconds);
    setIsShowCompleteDialog(true);
    setIsCompleted(true);
  };

  const toggleFlag = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          return { ...question, isFlag: !question.isFlag };
        }

        return question;
      }),
    );
  };

  const handleSubmitExam = () => {
    setIsSubmit(true);
    setIsShowCloseDialog(false);
    setNumber(0);
  };

  const handleCloseExam = () => {
    setIsShowCloseDialog(false);
    setIsStart(false);
  };

  useEffect(() => {
    let isSubscribed = true;
    if (!examId) return;

    const getQuestions = async () => {
      // const response = await getGeneraExamById(examId);
      const response = {
        isSuccess: true,
        data: {
          timeDuration: 3600,
          questions: [
            {
              id: '1',
              answerClicked: undefined,
              isFlag: false,
              answers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              correctAnswer: { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
              inCorrectAnswers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              isCorrect: undefined,
              question: 'This is question 1',
            },
            {
              id: '2',
              answerClicked: undefined,
              isFlag: false,
              answers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              correctAnswer: { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
              inCorrectAnswers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              isCorrect: undefined,
              question: 'This is question 2',
            },
            {
              id: '3',
              answerClicked: undefined,
              isFlag: false,
              answers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              correctAnswer: { content: 'ffdsf', id: 'a828d475-c6eb-4b45-8e55-9d83cf405585' },
              inCorrectAnswers: [
                { content: 'dsfsdfs', id: 'f730f62a-db54-4726-a198-d6a50c67cf5e' },
                { content: 'fdsffasd', id: '33db3ecf-d4fc-4a95-8b00-3f22d2776388' },
                { content: 'fdsffdsa srwe', id: '0bf8beaf-56ab-4626-82c4-8e1d630f3652' },
              ],
              isCorrect: undefined,
              question: 'This is question 3',
            },
          ],
        },
      };
      console.log({ response });

      if (isSubscribed && response.isSuccess) {
        setIsSubmit(false);
        setScore(0);
        setQuestions(response.data.questions);
        setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
        setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
        setTimeDuration(response.data.timeDuration);
        setLoading(false);
      }
    };

    getQuestions();

    return () => {
      isSubscribed = false;
    };
  }, [isStart]);

  useEffect(() => {
    if (questions.length !== QUIZ_APP_CONSTANTS.GAME.initialScore && score === questions.length && !isTestMode) {
      handleCompletedTest(0);
    }
  }, [score]);

  useEffect(() => {
    if (isSubmit && restTime) {
      result.push({ id: '2', name: 'Nguyen Tan Pil', score: score, time: restTime });
    }
  }, [isSubmit, restTime]);

  if (loading) {
    return <div></div>;
  }

  return (
    <Container>
      <Wrapper>
        {/* start dialogs */}
        {isShowCloseDialog && (
          <ConfirmDialog
            content={isTestMode && !isSubmit ? 'Do you want to complete this exam?' : 'Do you want to exit this exam?'}
            title="Confirm to complete"
            applyButtonContent="Okay"
            handleCancelDialog={() => setIsShowCloseDialog(false)}
            handleApplyDialog={isTestMode && !isSubmit ? handleSubmitExam : handleCloseExam}
            handleCloseDialog={() => setIsShowCloseDialog(false)}
          />
        )}

        {isShowCompleteDialog && !isTestMode && (
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
        {isStart ? (
          <>
            <GameBanner>
              {isTestMode ? (
                <QuestionDashboard>
                  {questions.map((question, idx) => (
                    <QuestionDashboardItem
                      isFlag={question.isFlag}
                      isSubmit={isSubmit}
                      isCorrect={!!question.isCorrect}
                      active={idx === number}
                      isSelected={question.answerClicked !== undefined}
                      key={question.id}
                      onClick={() => setNumber(idx)}
                    >
                      {idx + 1}
                    </QuestionDashboardItem>
                  ))}
                </QuestionDashboard>
              ) : (
                <img src={gameBannerImg} alt="" />
              )}
            </GameBanner>
            <Content>
              <Counter
                time={timeDuration}
                isPause={isShowCloseDialog || isShowCompleteDialog}
                isStop={isSubmit}
                handleCompletedTest={handleCompletedTest}
              />
              <QuestionCard
                questionDetails={questions[number]}
                questionNumber={number + 1}
                score={score}
                questionsSelected={questionsSelected}
                isTestMode={isTestMode}
                isSubmit={isSubmit}
                totalQuestions={questions.length}
                isCompleted={isCompleted}
                nextQuestion={nextQuestion}
                checkAnswer={checkAnswer}
                setIsShowDialog={setIsShowCloseDialog}
                toggleFlag={toggleFlag}
              />
            </Content>
          </>
        ) : (
          <ExamResult>
            <GameResult result={result} setIsStart={setIsStart} />
          </ExamResult>
        )}
      </Wrapper>
    </Container>
  );
};

export default Game;
