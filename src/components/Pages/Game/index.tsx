import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGeneraExamById, submitExam } from '../../../api/exam';
import { ConfirmDialog } from '../../../common/Dialog';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { QuestionDashboard, QuestionDashboardItem, Wrapper } from '../../../styles/Utils';
import { shuffleArray } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import Counter from '../../Counter';
import GameResult from '../../GameResult';
import { LoadingFullPage } from '../../Loading';
import QuestionCard from '../../QuestionCard';
import { Container, Content, ExamResult, GameBanner } from './GameStyles';

const isTestMode = false;

const Game = () => {
  const { examId } = useParams();

  const [loading, setLoading] = useState(true);
  const [isShowCloseDialog, setIsShowCloseDialog] = useState(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [spendTime, setSpendTime] = useState(0);

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
    console.log({ number, question: questions[number] });

    if (isTestMode) {
      setNumber((prev) => prev + 1);
    } else {
      let targetNumber = number;

      if (questions[number].isCorrect) {
        const targetQuestionId = questions[number].bottomIds[questions[number].bottomIndex];
        targetNumber = questions.findIndex((item) => item.id === targetQuestionId);

        setQuestions((prev: any) =>
          prev.map((question: any) => {
            if (question.id === prev[number].id || question.id === prev[targetNumber].id) {
              const bottomIndex =
                question.bottomIndex === prev[number].bottomIds.length - 1 ? 0 : question.bottomIndex + 1;

              return {
                ...question,
                bottomIndex,
                answerClicked: undefined,
                isCorrect: undefined,
              };
            }

            return question;
          }),
        );
      } else {
        const targetQuestionId = questions[number].topIds[questions[number].topIndex];
        targetNumber = questions.findIndex((item) => item.id === targetQuestionId);

        setQuestions((prev: any) =>
          prev.map((question: any) => {
            if (question.id === prev[number].id || question.id === prev[targetNumber].id) {
              const topIndex = question.topIndex === prev[number].topIds.length - 1 ? 0 : question.topIndex + 1;

              return {
                ...question,
                topIndex,
                answerClicked: undefined,
                isCorrect: undefined,
              };
            }

            return question;
          }),
        );
      }

      setNumber(targetNumber);
    }
  };

  const handleApplyCompleteDialog = () => {
    setIsShowCompleteDialog(false);
  };

  const handleTryAgain = () => {
    setIsShowCompleteDialog(false);
    setQuestions((prev) => prev.map((question) => ({ ...question, answerClicked: undefined, isCorrect: undefined })));
    setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
    setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
  };

  const handleCompletedTest = (seconds: number) => {
    if (!isSubmit) {
      setIsShowCompleteDialog(true);
    }

    setSpendTime(timeDuration - seconds);
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
    setNumber(0);
    setIsSubmit(true);
    setIsShowCloseDialog(false);
    setIsShowCompleteDialog(false);
  };

  const handleCloseExam = () => {
    if (isTestMode) {
      setIsShowCloseDialog(false);
      setIsStart(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (!examId && !isStart) return;

    const getQuestions = async () => {
      const response = await getGeneraExamById(examId || '');
      console.log({ response });
      const questionList = response.data.quizList.map((item: any) => {
        return {
          id: item.id,
          question: item.question,
          answers: item.answers,
          correctAnswer: item.answers.filter((i: any) => i.isCorrect)[0],
          inCorrectAnswers: item.answers.filter((i: any) => !i.isCorrect),
          answerClicked: undefined,
          isFlag: false,
          isCorrect: undefined,
          topIds: item.topIds,
          bottomIds: item.bottomIds,
          topIndex: item.topIndex,
          bottomIndex: item.bottomIndex,
        };
      });

      if (isSubscribed && response.isSuccess) {
        setIsSubmit(false);
        setScore(0);
        setSpendTime(0);
        setQuestionsSelected(0);
        setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
        setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
        setTimeDuration(response.data.timeDuration);
        setLoading(false);

        if (isTestMode) {
          setQuestions(questionList.slice(0, 5));
        } else {
          setQuestions(shuffleArray(questionList));
        }
      }
    };

    getQuestions();

    return () => {
      isSubscribed = false;
    };
  }, [isStart]);

  useEffect(() => {
    if (isSubmit && spendTime && isTestMode && examId) {
      const handleSubmitExam = async () => {
        const answerIds = questions.map((question) => question.answerClicked || ' ');

        const response = await submitExam(examId, answerIds);

        if (response.isSuccess) {
          return response.data;
        }
      };

      handleSubmitExam();
    }
  }, [isSubmit, spendTime, isTestMode]);

  useEffect(() => {
    if (!isTestMode && questions.length > 0 && score === 3) {
      setIsShowCompleteDialog(true);
    }
  }, [score]);

  return (
    <>
      {loading ? (
        <LoadingFullPage />
      ) : (
        <Container>
          <Wrapper>
            {/* start dialogs */}
            {isShowCloseDialog && (
              <ConfirmDialog
                content={
                  isTestMode && !isSubmit ? 'Do you want to complete this exam?' : 'Do you want to exit this exam?'
                }
                title="Confirm to complete"
                applyButtonContent="Okay"
                handleCancelDialog={() => setIsShowCloseDialog(false)}
                handleApplyDialog={isTestMode && !isSubmit ? handleSubmitExam : handleCloseExam}
                handleCloseDialog={() => setIsShowCloseDialog(false)}
              />
            )}

            {isShowCompleteDialog && (
              <ConfirmDialog
                content="This exam has completed!"
                title="Confirm to try"
                applyButtonContent="Continue"
                cancelButtonContent={isTestMode ? '' : 'Try Again'}
                handleCancelDialog={handleTryAgain}
                handleApplyDialog={isTestMode && !isSubmit ? handleSubmitExam : handleApplyCompleteDialog}
                handleCloseDialog={() => setIsShowCompleteDialog(false)}
              />
            )}

            {/* end dialogs */}
            {isTestMode && !isStart ? (
              <ExamResult>
                <GameResult setIsStart={setIsStart} />
              </ExamResult>
            ) : (
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
                  {isTestMode && (
                    <Counter
                      time={timeDuration}
                      isPause={isShowCloseDialog || isShowCompleteDialog}
                      isStop={isSubmit}
                      handleCompletedTest={handleCompletedTest}
                    />
                  )}
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
            )}
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default Game;
