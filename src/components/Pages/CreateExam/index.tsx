import React, { useEffect, useState } from 'react';
import { BiCopy, BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FiPlusSquare } from 'react-icons/fi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { SiOpslevel } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { createExam, getExamById } from '../../../api/exam';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { ConfirmDialog, CreateQuizDialog, CreateCategoryDialog } from '../../../common/Dialog';
import Dropdown from '../../../common/Dropdown';
import { DateTimePickerInput, OriginInput } from '../../../common/Input';
import ToolTip from '../../../common/ToolTip';
import { EmptyListAction, WrapperSection } from '../../../styles/Utils';
import {
  compareTwoObjects,
  convertNumberFormat,
  convertTimeDurationToMinutes,
  deepCloneObject,
  getObjectKeysChanged,
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
  InputQuizStructure,
  LabelGroup,
  LevelButton,
  LevelItem,
  LevelList,
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
  StructureItem,
  TimeDuration,
  TimeDurationGroup,
  TimeDurationItem,
  TimeStart,
  TotalQuiz,
} from './CreateExamStyles';

const initialQuiz: QuizProps = {
  id: uuid(),
  question: '',
  level: 'easy',
  answers: [
    { id: '1', content: '', isCorrect: undefined },
    { id: '2', content: '', isCorrect: undefined },
    { id: '3', content: '', isCorrect: undefined },
    { id: '4', content: '', isCorrect: undefined },
  ],
};

interface QuizStructureTemplateState {
  easy: number;
  medium: number;
  hard: number;
}

type ExamProps = {
  id: string;
  name: string;
  timeStart: number;
  quizList: QuizProps[];
  category: { id: string; name: string };
  quizStructure: QuizStructureTemplateState;
  countLimit: string;
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
  category: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCategory,
  countLimit: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCountLimit,
  totalQuestions: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTotalQuestions,
  quizStructure: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizStructure,
  timeDuration: {
    hours: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialHours,
    minutes: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialMinutes,
  },
};

const CreateExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [originExam, setOriginExam] = useState<ExamProps>(initialExam);

  const [exam, setExam] = useState<ExamProps>(initialExam);
  const [isShowCreateQuestionDialog, setIsShowCreateQuestionDialog] = useState(false);
  const [isShowCreateCategoryDialog, setIsShowCreateCategoryDialog] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  const handleCreateNewQuiz = (values: QuizProps) => {
    console.log({ values });
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
    const newQuizList = exam.quizList.map((quiz) => {
      const { question, level, answers } = quiz;

      const correctAnswer = answers.find((answer) => answer.isCorrect)?.content;
      const inCorrectAnswers = answers.filter((answer) => !answer.isCorrect).map((answer) => answer.content);

      return {
        content: question,
        level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelNumberByString(level),
        correctAnswer,
        inCorrectAnswer: inCorrectAnswers,
        bottom_question_ids: [],
        top_question_ids: [],
      };
    });

    const timeDurationFormat = convertTimeDurationToMinutes(exam.timeDuration);

    const formValues = {
      categoryId: exam.category.id,
      name: exam.name,
      countLimit: parseInt(exam.countLimit),
      timeDuration: timeDurationFormat,
      timeStart: exam.timeStart,
      isPublished: 1,
      structureExam: {
        esay: exam.quizStructure.easy,
        normal: exam.quizStructure.medium,
        difficult: exam.quizStructure.hard,
      },
      note: '',
      questionList: newQuizList,
    };

    const response = await createExam(formValues);

    if (response.isSuccess) {
      console.log({ exam: response.data });
    }
  };

  const handleUpdateExam = async () => {
    const examDiffs = getObjectKeysChanged(originExam, exam);
    let quizListDiffs: any[] = [];

    if (examDiffs?.data) {
      if (examDiffs.data.hasOwnProperty('quizList')) {
        examDiffs.data.quizList.forEach((quiz: QuizProps, idx: number) => {
          if (originExam.quizList[idx]) {
            const quizDiffs = getObjectKeysChanged(originExam.quizList[idx], quiz);
            quizDiffs?.data && quizListDiffs.push({ ...quizDiffs.data, id: quiz.id });
          } else {
            quizListDiffs.push(quiz);
          }
        });
      }

      if (examDiffs.data.hasOwnProperty('category')) {
        examDiffs.data.categoryId = examDiffs.data.category.id;
        delete examDiffs.data.category;
      }

      console.log({ quizListDiffs });
      quizListDiffs = quizListDiffs.map((quiz) => {
        if (quiz.hasOwnProperty('answers')) {
          const answers = quiz.answers;
          const correctAnswer = answers.find((answer: AnswerProps) => answer.isCorrect)?.content;
          const inCorrectAnswers = answers
            .filter((answer: AnswerProps) => !answer.isCorrect)
            .map((answer: AnswerProps) => answer.content);

          // delete quiz.answers;
          return { ...quiz, correctAnswer, inCorrectAnswers };
        }
      });

      try {
        // await updateExam({ ...examDiffs.data, id: exam.id }, quizListDiffs, exam.id);
        console.log({ examDiffs, quizListDiffs });
        setOriginExam(exam);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const getTotalQuestionByLevel = (levelName: string) => {
    return exam.quizList.filter((question) => question.level === levelName).length;
  };

  useEffect(() => {
    if (!examId) return;

    let isSubscribed = true;

    const fetchExistExam = async () => {
      const response = await getExamById(examId);

      if (response.isSuccess) {
        if (isSubscribed) {
          setOriginExam(response.data);
          setExam(response.data);
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
      {isShowCreateQuestionDialog && (
        <CreateQuizDialog
          title="Create A New Quiz"
          applyButtonContent="Create"
          initialQuiz={initialQuiz}
          handleCancelDialog={() => setIsShowCreateQuestionDialog(false)}
          handleApplyDialog={(values) => handleCreateNewQuiz(values)}
          handleCloseDialog={() => setIsShowCreateQuestionDialog(false)}
        />
      )}
      {isShowCreateCategoryDialog && (
        <CreateCategoryDialog
          title="Quiz Category"
          applyButtonContent="Apply"
          initialCategory={exam.category.id}
          handleCancelDialog={() => setIsShowCreateCategoryDialog(false)}
          handleApplyDialog={(values) =>
            setExam((prev) => ({ ...prev, category: { id: values.id, name: values.name } }))
          }
          handleCloseDialog={() => setIsShowCreateCategoryDialog(false)}
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
              <SignUpButton onClick={() => setIsShowCreateQuestionDialog(true)}>
                <FiPlusSquare />
                <span>New Quiz</span>
              </SignUpButton>
            </CreateNewQuiz>
          </CreateQuizHeader>
          <QuizOptions>
            <CategoryQuiz>
              <LabelGroup>Quiz Category</LabelGroup>
              <OriginInput
                name="category"
                readOnly={true}
                value={exam.category.name ? exam.category.name : 'Click to choose'}
                onClick={() => setIsShowCreateCategoryDialog(true)}
              />
            </CategoryQuiz>
            <CategoryQuiz>
              <LabelGroup>Count Limit</LabelGroup>
              <Dropdown
                id="countLimit"
                activeValue={exam.countLimit}
                values={QUIZ_APP_CONSTANTS.CREATE_EXAM.countLimitList}
                handleSelected={(value) => setExam((prev) => ({ ...prev, countLimit: value }))}
              />
            </CategoryQuiz>
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
          <QuizOptions>
            <LabelGroup>Structure of Quiz</LabelGroup>
            <InputQuizStructure>
              {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => {
                const { name, typeColor } = level;
                const inputValue = exam.quizStructure[name as keyof QuizStructureTemplateState];

                return (
                  <StructureItem key={`quiz-structure-${name}`} borderColorHover={typeColor}>
                    <ToolTip content={`${name} Level`}>
                      <LevelItem typeColor={typeColor} as="div">
                        {name[0]}
                      </LevelItem>
                    </ToolTip>
                    <OriginInput
                      name={name}
                      type="number"
                      min={0}
                      max={getTotalQuestionByLevel(name)}
                      value={isNaN(inputValue) ? 0 : inputValue}
                      errorMessage={
                        inputValue > getTotalQuestionByLevel(name)
                          ? `Value must be less than or equal to ${getTotalQuestionByLevel(name)}`
                          : ''
                      }
                      setValue={(value) =>
                        setExam((prev) => ({
                          ...prev,
                          quizStructure: {
                            ...prev.quizStructure,
                            [name]: parseInt(value),
                          },
                        }))
                      }
                    />
                  </StructureItem>
                );
              })}
            </InputQuizStructure>
          </QuizOptions>
          {exam.quizList.length > 0 ? (
            <TotalQuiz>
              <h3>
                <MdOutlineMenuOpen />
                <span>{convertNumberFormat(exam.quizList.length)} Quizzes</span>
              </h3>
              <LevelList>
                {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => (
                  <LevelItem key={level.name} typeColor={level.typeColor}>
                    {level.name}
                  </LevelItem>
                ))}
              </LevelList>
            </TotalQuiz>
          ) : (
            <NoQuiz>
              <EmptyListAction>
                <SignUpButton onClick={() => setIsShowCreateQuestionDialog(true)}>Create Now</SignUpButton>
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
              disabled={
                examId
                  ? compareTwoObjects(originExam, exam)
                  : exam.name === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialExamName ||
                    exam.timeStart === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTimeStart ||
                    exam.category === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCategory ||
                    exam.timeDuration.hours === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialHours ||
                    exam.timeDuration.minutes === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialMinutes ||
                    compareTwoObjects(exam.quizStructure, QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizStructure)
              }
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
