import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { BiCopy, BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FiPlusSquare } from 'react-icons/fi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { SiOpslevel } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { createExam, getExamById, updateExam } from '../../../api/exam';
import { getQuizzes } from '../../../api/quiz';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { ConfirmDialog, CreateQuizDialog } from '../../../common/Dialog';
import Dropdown from '../../../common/Dropdown';
import { DateTimePickerInput, OriginInput } from '../../../common/Input';
import ToolTip from '../../../common/ToolTip';
import { EmptyListAction, WrapperSection } from '../../../styles/Utils';
import {
  compareTwoObjects,
  convertMinutesToDuration,
  convertNumberFormat,
  convertTimeDurationToMinutes,
  deepCloneObject,
  getObjectKeysChanged,
  shuffleArray,
} from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { AnswerProps, QuizProps } from '../../../utils/types';
import {
  CategoryQuiz,
  Container,
  Content,
  CreateNewQuiz,
  CreateQuizFooter,
  CreateQuizHeader,
  LabelGroup,
  LevelButton,
  LevelItem,
  LevelList,
  LevelQuiz,
  NoQuiz,
  QuizItem,
  QuizItemActions,
  QuizItemAnswer,
  QuizItemAnswers,
  QuizItemAnswerStatus,
  QuizItemContent,
  QuizItemHeader,
  QuizItemNumber,
  QuizList,
  QuizName,
  QuizOptions,
  TimeDuration,
  TimeDurationGroup,
  TimeDurationItem,
  TimeStart,
  TotalQuiz,
} from './CreateExamStyles';

const initialQuiz: QuizProps = {
  id: uuid(),
  question: '',
  level: 'Easy',
  answers: [
    { id: '1', content: '', isCorrect: undefined },
    { id: '2', content: '', isCorrect: undefined },
    { id: '3', content: '', isCorrect: undefined },
    { id: '4', content: '', isCorrect: undefined },
  ],
};

type Props = {
  [key: string]: any;
};

type ExamProps = {
  id: string;
  name: string;
  timeStart: number;
  quizList: QuizProps[];
  category: string;
  countLimit: number;
  totalQuestions: number;
  timeDuration: {
    hours: string;
    minutes: string;
  };
};

const initialExam: ExamProps = {
  id: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialId,
  name: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialExamName,
  timeStart: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTimeStart,
  quizList: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizList,
  category: QUIZ_APP_CONSTANTS.CREATE_EXAM.categories[0],
  countLimit: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCountLimit,
  totalQuestions: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTotalQuestions,
  timeDuration: {
    hours: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialHours,
    minutes: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialMinutes,
  },
};

const CreateExam = ({ isLogin, user }: Props) => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [originExam, setOriginExam] = useState<ExamProps>(initialExam);

  const [exam, setExam] = useState<ExamProps>(initialExam);
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  const handleCreateNewQuiz = (values: QuizProps) => {
    setExam((prev) => ({ ...prev, quizList: [...prev.quizList, values] }));
  };

  const handleUpdateQuiz = (values: QuizProps) => {
    const newQuizList = exam.quizList.map((quiz) => (quiz.id === editId ? values : quiz));
    setExam((prev) => ({ ...prev, quizList: newQuizList }));
  };

  const handleDeleteQuiz = (id: string) => {
    setDeleteId(undefined);
    const newQuizList = exam.quizList.filter((quiz) => quiz.id !== id);
    setExam((prev) => ({ ...prev, quizList: newQuizList }));
  };

  const handleDuplicateQuiz = (id: string) => {
    const findIndex = exam.quizList.findIndex((quiz) => quiz.id === id);

    if (findIndex !== -1) {
      const quizCopy = deepCloneObject(exam.quizList[findIndex]);
      quizCopy.id = uuid();

      const newQuizList = [...exam.quizList];
      newQuizList.splice(findIndex + 1, 0, quizCopy);
      setExam((prev) => ({ ...prev, quizList: newQuizList }));
    }
  };

  const handleSaveExam = async () => {
    const examId = uuid();

    const newQuizList = exam.quizList.map((quiz) => {
      const { id, question, level, answers } = quiz;

      const correctAnswer = answers.find((answer) => answer.isCorrect)?.content;
      const inCorrectAnswers = answers.filter((answer) => !answer.isCorrect).map((answer) => answer.content);

      return {
        id,
        examId,
        content: question,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelNumberByString(level),
        correctAnswer,
        inCorrectAnswers,
      };
    });

    const timeDurationFormat = convertTimeDurationToMinutes(exam.timeDuration);

    const formValues = {
      categoryId: exam.category,
      countLimit: exam.countLimit,
      createdAt: moment().valueOf(),
      creatorId: user.id,
      id: examId,
      name: exam.name,
      timeDuration: timeDurationFormat,
      timeStart: exam.timeStart,
      totalQuestions: newQuizList.length,
    };

    try {
      await createExam(formValues, newQuizList);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateExam = async () => {
    const examDiffs = getObjectKeysChanged(originExam, exam);
    let quizListDiffs: any[] = [];

    if (examDiffs?.data) {
      if (examDiffs.data.hasOwnProperty('quizList')) {
        examDiffs.data.quizList.forEach((quiz: QuizProps, idx: number) => {
          const quizDiffs = getObjectKeysChanged(originExam.quizList[idx], quiz);
          quizListDiffs.push({ ...quizDiffs.data, id: quiz.id });
        });

        delete examDiffs.data.quizList;
      } else {
        examDiffs.data.categoryId = examDiffs.data.category;
        delete examDiffs.data.category;
      }

      quizListDiffs = quizListDiffs.map((quiz) => {
        if (quiz.hasOwnProperty('answers')) {
          const answers = quiz.answers;
          const correctAnswer = answers.find((answer: AnswerProps) => answer.isCorrect)?.content;
          const inCorrectAnswers = answers
            .filter((answer: AnswerProps) => !answer.isCorrect)
            .map((answer: AnswerProps) => answer.content);

          delete quiz.answers;
          return { ...quiz, correctAnswer, inCorrectAnswers };
        }
      });

      try {
        await updateExam({ ...examDiffs.data, id: exam.id }, quizListDiffs, exam.id);
        setOriginExam(exam);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  useEffect(() => {
    if (!examId) return;

    let isSubscribed = true;

    const fetchExistExam = async () => {
      const currentExam = await getExamById(examId);

      if (currentExam.data) {
        const { categoryId, countLimit, id, name, timeDuration, timeStart, totalQuestions } = currentExam.data;
        const quizListRes = await getQuizzes(id);

        const quizList = quizListRes.map((quiz) => ({
          id: quiz.id,
          question: quiz.content,
          level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelStringByNumber(quiz.level),
          answers: shuffleArray([
            { id: '1', content: quiz.correctAnswer, isCorrect: true },

            ...quiz.inCorrectAnswers.map((answer, idx) => ({
              id: `${idx + 2}`,
              content: answer,
              isCorrect: false,
            })),
          ]),
        }));

        if (isSubscribed) {
          const newExam = {
            id,
            name,
            timeStart,
            quizList,
            countLimit,
            totalQuestions,
            category: categoryId,
            timeDuration: convertMinutesToDuration(timeDuration),
          };

          setOriginExam(newExam);
          setExam(newExam);
        }
      } else {
        navigate('/exams/create-exam');
      }
    };

    fetchExistExam();

    return () => {
      isSubscribed = false;
    };
  }, [examId]);

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/sign-in');
  //   }
  // }, []);

  return (
    <Container>
      {/* start dialogs */}
      {isShowCreateDialog && (
        <CreateQuizDialog
          title="Create A New Quiz"
          applyButtonContent="Create"
          initialQuiz={initialQuiz}
          handleCancelDialog={() => setIsShowCreateDialog(false)}
          handleApplyDialog={(values) => handleCreateNewQuiz(values)}
          handleCloseDialog={() => setIsShowCreateDialog(false)}
        />
      )}
      {editId && (
        <CreateQuizDialog
          title="Update The Quiz"
          applyButtonContent="Update"
          initialQuiz={exam.quizList.find((quiz) => quiz.id === editId) || initialQuiz}
          handleCancelDialog={() => setEditId(undefined)}
          handleApplyDialog={(values) => handleUpdateQuiz(values)}
          handleCloseDialog={() => setEditId(undefined)}
        />
      )}
      {deleteId && (
        <ConfirmDialog
          content="Do you want to delete this quiz?"
          title="Confirm to delete"
          applyButtonContent="Delete"
          applyButtonTypeColor="errorColor"
          cancelButtonTypeColor="successColor"
          handleCancelDialog={() => setDeleteId(undefined)}
          handleApplyDialog={() => handleDeleteQuiz(deleteId)}
          handleCloseDialog={() => setDeleteId(undefined)}
        />
      )}
      {/* end dialogs */}
      <WrapperSection>
        <Content>
          <CreateQuizHeader>
            <QuizName>
              <LabelGroup>Quiz Name</LabelGroup>
              <OriginInput
                value={exam.name}
                name="quiz-name"
                setValue={(value) => setExam((prev) => ({ ...prev, name: value }))}
                errorMessage={exam.name === '' && 'Quiz Name is not empty!'}
              />
            </QuizName>
            <CreateNewQuiz>
              <LabelGroup>Create a quiz</LabelGroup>
              <SignUpButton onClick={() => setIsShowCreateDialog(true)}>
                <FiPlusSquare />
                <span>New Quiz</span>
              </SignUpButton>
            </CreateNewQuiz>
          </CreateQuizHeader>
          <QuizOptions>
            <CategoryQuiz>
              <LabelGroup>Quiz Category</LabelGroup>
              <Dropdown
                id="category"
                activeValue={exam.category}
                values={QUIZ_APP_CONSTANTS.CREATE_EXAM.categories}
                handleSelected={(value) => setExam((prev) => ({ ...prev, category: value }))}
              />
            </CategoryQuiz>
            <LevelQuiz>
              <LabelGroup>Quiz Level</LabelGroup>
              <LevelList>
                {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => (
                  <LevelItem key={level.name} typeColor={level.typeColor}>
                    {level.name}
                  </LevelItem>
                ))}
              </LevelList>
            </LevelQuiz>
          </QuizOptions>
          <QuizOptions>
            <TimeDuration>
              <LabelGroup>Time Duration</LabelGroup>
              <TimeDurationGroup>
                <TimeDurationItem>
                  <Dropdown
                    id="hours"
                    activeValue={exam.timeDuration.hours}
                    values={QUIZ_APP_CONSTANTS.CREATE_EXAM.getHourList()}
                    handleSelected={(value) =>
                      setExam((prev) => ({ ...prev, timeDuration: { ...prev.timeDuration, hours: value } }))
                    }
                  />
                  <span>h</span>
                </TimeDurationItem>
                <TimeDurationItem>
                  <Dropdown
                    id="minutes"
                    activeValue={exam.timeDuration.minutes}
                    values={QUIZ_APP_CONSTANTS.CREATE_EXAM.getMinuteList()}
                    handleSelected={(value) =>
                      setExam((prev) => ({ ...prev, timeDuration: { ...prev.timeDuration, minutes: value } }))
                    }
                  />
                  <span>m</span>
                </TimeDurationItem>
              </TimeDurationGroup>
            </TimeDuration>
            <TimeStart>
              <LabelGroup>Time Start</LabelGroup>
              <DateTimePickerInput
                id="start-time"
                initialTime={exam.timeStart}
                setDateTime={(value) => setExam((prev) => ({ ...prev, timeStart: value }))}
              />
            </TimeStart>
          </QuizOptions>

          {exam.quizList.length > 0 ? (
            <TotalQuiz>
              <h3>
                <MdOutlineMenuOpen />
                <span>{convertNumberFormat(exam.quizList.length)} Quizzes</span>
              </h3>
            </TotalQuiz>
          ) : (
            <NoQuiz>
              <EmptyListAction>
                <SignUpButton onClick={() => setIsShowCreateDialog(true)}>Create Now</SignUpButton>
                <span>Don't have any quizzes!</span>
              </EmptyListAction>
            </NoQuiz>
          )}
          <QuizList>
            {exam.quizList.map((quiz, idx) => (
              <QuizItem key={`quiz-item-${quiz.id}`}>
                <QuizItemHeader>
                  <QuizItemNumber>Quiz {convertNumberFormat(idx + 1)}</QuizItemNumber>
                  <QuizItemActions>
                    <ToolTip content={`${quiz.level} Level`}>
                      <LevelButton
                        disable={true}
                        typeColor={QUIZ_APP_CONSTANTS.CREATE_EXAM.getActiveLevelTypeColor(quiz.level)}
                      >
                        <SiOpslevel />
                      </LevelButton>
                    </ToolTip>
                    <ToolTip content="Edit Quiz">
                      <ActionButton onClick={() => setEditId(quiz.id)}>
                        <BiEditAlt />
                      </ActionButton>
                    </ToolTip>
                    <ToolTip content="Duplicate Quiz">
                      <ActionButton typeColor="successColor" onClick={() => handleDuplicateQuiz(quiz.id)}>
                        <BiCopy />
                      </ActionButton>
                    </ToolTip>
                    <ToolTip content="Delete Quiz">
                      <ActionButton typeColor="errorColor" onClick={() => setDeleteId(quiz.id)}>
                        <CgTrash />
                      </ActionButton>
                    </ToolTip>
                  </QuizItemActions>
                </QuizItemHeader>
                <QuizItemContent>{quiz.question}</QuizItemContent>
                <QuizItemAnswers>
                  {quiz.answers.map((answer: AnswerProps) => (
                    <QuizItemAnswer key={answer.id}>
                      <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                      <span>{answer.content}</span>
                    </QuizItemAnswer>
                  ))}
                </QuizItemAnswers>
              </QuizItem>
            ))}
          </QuizList>
          <CreateQuizFooter>
            <SignUpButton
              disabled={compareTwoObjects(originExam, exam)}
              onClick={examId ? handleUpdateExam : handleSaveExam}
            >
              Save
            </SignUpButton>
          </CreateQuizFooter>
        </Content>
      </WrapperSection>
    </Container>
  );
};

export default CreateExam;
