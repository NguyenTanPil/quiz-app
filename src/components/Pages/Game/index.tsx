import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetail } from '../../../api/class';
import { getGeneraExamById, getQuestionForReview, getQuestionForTest, submitExam } from '../../../api/exam';
import { ConfirmDialog, JoinDialog } from '../../../common/Dialog';
import gameBannerImg from '../../../images/gameBanner.jpg';
import { QuestionDashboard, QuestionDashboardItem, Wrapper } from '../../../styles/Utils';
import { shuffleArray } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import Counter from '../../Counter';
import GameResult from '../../GameResult';
import { LoadingFullPage } from '../../Loading';
import QuestionCard from '../../QuestionCard';
import { Container, Content, ExamResult, GameBanner } from './GameStyles';

const Game = () => {
  const { examId, mode } = useParams();
  const isTestMode = mode === 'test' ? true : false;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isShowCloseDialog, setIsShowCloseDialog] = useState(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [spendTime, setSpendTime] = useState(0);

  const [questions, setQuestions] = useState<any[]>([]);
  const [number, setNumber] = useState(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
  const [score, setScore] = useState(QUIZ_APP_CONSTANTS.GAME.initialScore);
  const [timeDuration, setTimeDuration] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [questionsSelected, setQuestionsSelected] = useState(0);
  const [classId, setClassId] = useState('');
  const [isShowJoinDialog, setIsShowJoinDialog] = useState(false);
  const [examineeId, setExamineeId] = useState('');
  const [testId, setTestId] = useState('');

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
    navigate(`/class/${classId}`);
  };

  const handleTryAgain = () => {
    setIsShowCompleteDialog(false);
    setQuestions((prev) => prev.map((question) => ({ ...question, answerClicked: undefined, isCorrect: undefined })));
    setNumber(QUIZ_APP_CONSTANTS.GAME.initialNumberQuestion);
    setScore(QUIZ_APP_CONSTANTS.GAME.initialScore);
  };

  const handleCompletedTest = () => {
    if (!isSubmit) {
      setIsShowCompleteDialog(true);
    }

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

  const handleSubmitExam = async () => {
    const restTime = spendTime;
    const answerIds = questions.map((item: any) => item.answerClicked).filter((item: any) => item);
    await submitExam(testId, answerIds, restTime);
    setNumber(0);
    setIsSubmit(true);
    setIsShowCloseDialog(false);
    setIsShowCompleteDialog(false);
  };

  const handleCloseExam = () => {
    if (isTestMode) {
      setIsShowCloseDialog(false);
      setExamineeId('');
      setTestId('');
    }
  };
  const handleJoinExam = (code: string) => {
    setIsShowJoinDialog(false);
    setExamineeId(code);
    setLoading(true);
  };

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    if (!examId && examineeId === '') return;

    const getQuestions = async () => {
      let response;

      if (isTestMode) {
        if (examineeId === '') {
          setLoading(false);
          return;
        }
        response = await getQuestionForTest(examineeId);
        setTestId(response.data.testId);
      } else {
        response = await getQuestionForReview(examId || '');
        setClassId(response.data.classId);
      }

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
        setTimeDuration(response.data.timeDuration * 60);
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
  }, [examineeId]);

  // useEffect(() => {
  //   if (isSubmit && spendTime && isTestMode && examId) {
  //     const handleSubmitExam = async () => {
  //       const answerIds = questions.map((question) => question.answerClicked || ' ');

  //       const response = await submitExam(examId, answerIds);

  //       if (response.isSuccess) {
  //         return response.data;
  //       }
  //     };

  //     handleSubmitExam();
  //   }
  // }, [isSubmit, spendTime, isTestMode]);

  useEffect(() => {
    if (!isTestMode && questions.length > 0 && score === 2) {
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

            {isShowJoinDialog && (
              <JoinDialog
                title="Join Exam"
                applyButtonContent="Join"
                handleCancelDialog={() => setIsShowJoinDialog(false)}
                handleApplyDialog={handleJoinExam}
                handleCloseDialog={() => setIsShowJoinDialog(false)}
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
            {isTestMode && examineeId === '' ? (
              <ExamResult>
                <GameResult setIsShowJoinDialog={setIsShowJoinDialog} />
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
                      setSpendTime={setSpendTime}
                    />
                  )}
                  <QuestionCard
                    questionDetails={questions[number]}
                    questionNumber={number + 1}
                    score={score}
                    goldNumber={2}
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
