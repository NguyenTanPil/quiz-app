import React, { useEffect, useState } from 'react';
import { BiCopy, BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FiPlusSquare } from 'react-icons/fi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { SiOpslevel } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { addQuestion, createExam, getExamById, updateExam, updateQuestions } from '../../../api/exam';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { ConfirmDialog, CreateCategoryDialog, CreateQuizDialog } from '../../../common/Dialog';
import Dropdown from '../../../common/Dropdown';
import { DateTimePickerInput, OriginInput } from '../../../common/Input';
import {
  LabelGroup,
  QuizItem,
  QuizItemActions,
  QuizItemAnswer,
  QuizItemAnswers,
  QuizItemAnswerStatus,
  QuizItemContent,
  QuizItemHeader,
  QuizItemNumber,
  QuizList,
} from '../../../common/Styles';
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
import { LoadingFullPage } from '../../Loading';
import {
  CategoryQuiz,
  Container,
  Content,
  CreateNewQuiz,
  CreateQuizFooter,
  CreateQuizHeader,
  InputQuizStructure,
  LevelButton,
  LevelItem,
  LevelList,
  NoQuiz,
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
  mode: 'Review Mode',
  answers: [
    { id: '1', content: '', isCorrect: undefined },
    { id: '2', content: '', isCorrect: undefined },
    { id: '3', content: '', isCorrect: undefined },
    { id: '4', content: '', isCorrect: undefined },
  ],
};

export interface QuizStructureTemplateState {
  easy: number;
  medium: number;
  hard: number;
}

type ExamProps = {
  id: string;
  name: string;
  quizList: QuizProps[];
  category: { id: string; name: string };
  countLimit: string;
  totalQuestions: number;
};

const initialExam: ExamProps = {
  id: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialId,
  name: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialExamName,
  quizList: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizList,
  category: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCategory,
  countLimit: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCountLimit,
  totalQuestions: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTotalQuestions,
};

const CreateExam = () => {
  const navigate = useNavigate();
  const { classId, examId } = useParams();

  const [isLoading, setIsLoading] = useState(examId ? true : false);
  const [originExam, setOriginExam] = useState<ExamProps>(initialExam);
  const [exam, setExam] = useState<ExamProps>(initialExam);

  const [isShowCreateQuestionDialog, setIsShowCreateQuestionDialog] = useState(false);
  const [isShowCreateCategoryDialog, setIsShowCreateCategoryDialog] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [updateToAddQuestions, setUpdateToAddQuestions] = useState<any[]>([]);

  const getFormatQuestion = (quiz: any) => {
    const { question, level, answers } = quiz;

    const correctAnswer = answers.find((answer: any) => answer.isCorrect)?.content;
    const inCorrectAnswers = answers.filter((answer: any) => !answer.isCorrect).map((answer: any) => answer.content);

    return {
      content: question,
      level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelNumberByString(level),
      correctAnswer,
      inCorrectAnswer: inCorrectAnswers,
      topQuestionsId: [],
      bottomQuestionsId: [],
    };
  };

  const handleCreateNewQuiz = (values: QuizProps) => {
    setExam((prev) => ({ ...prev, quizList: [...prev.quizList, values] }));

    if (examId) {
      updateToAddQuestions.push(getFormatQuestion(values));
    }
  };

  const handleUpdateQuiz = async (values: QuizProps) => {
    const newQuizList = exam.quizList.map((quiz) => (quiz.id === editId ? values : quiz));
    setExam((prev) => ({ ...prev, quizList: newQuizList }));

    if (!examId) return;

    const questionUpdated: any = {
      questionList: [
        {
          question: [
            {
              id: values.id,
              content: values.question,
              level: QUIZ_APP_CONSTANTS.CREATE_EXAM.getLevelNumberByString(values.level),
            },
          ],
          answer: values.answers,
        },
      ],
    };

    try {
      await updateQuestions(questionUpdated);
    } catch (error) {
      console.log({ error });
    }
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
    setIsLoading(true);
    const newQuizList = exam.quizList.map(getFormatQuestion);

    const formValues = {
      categoryId: exam.category.id,
      name: exam.name,
      countLimit: parseInt(exam.countLimit),
      isPublished: 1,
      note: '',
      questionList: newQuizList,
      classId,
    };

    const response = await createExam(formValues);

    if (response.isSuccess) {
      setExam(initialExam);
      setIsLoading(false);
    }
  };

  const handleUpdateExam = async () => {
    const examBefore = { name: originExam.name, categoryId: originExam.category.id, countLimit: originExam.countLimit };
    const examUpdate = { name: exam.name, categoryId: exam.category.id, countLimit: exam.countLimit };
    const examDiffs = getObjectKeysChanged(examBefore, examUpdate);

    try {
      if (examDiffs?.data) {
        await updateExam(examDiffs.data, examId);
      }
      if (updateToAddQuestions.length > 0) {
        const quizList = { questionList: updateToAddQuestions };
        await addQuestion(quizList, examId);
      }

      if (examDiffs?.data || updateToAddQuestions.length > 0) {
        setOriginExam(exam);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    if (examId) {
      const fetchExistExam = async () => {
        const response = await getExamById(examId);

        if (response.isSuccess && isSubscribed) {
          setOriginExam(response.data);
          setExam(response.data);
          setIsLoading(false);
        }

        if (response.isSuccess === false) {
          // navigate('/exams/create-exam');
        }
      };

      fetchExistExam();
    } else {
      if (isSubscribed) {
        setExam(initialExam);
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [examId]);

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
      {isLoading && <LoadingFullPage />}
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
                <QuizItemContent dangerouslySetInnerHTML={{ __html: quiz.question }} />
                <QuizItemAnswers>
                  {quiz.answers.map((answer: AnswerProps) => (
                    <QuizItemAnswer key={answer.id}>
                      <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                      <div dangerouslySetInnerHTML={{ __html: answer.content }} />
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
                    exam.category === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCategory
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
