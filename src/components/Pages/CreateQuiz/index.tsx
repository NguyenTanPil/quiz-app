import React, { useState, useEffect } from 'react';
import { BiCopy, BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FiPlusSquare } from 'react-icons/fi';
import { SiOpslevel } from 'react-icons/si';
import { MdOutlineMenuOpen } from 'react-icons/md';
import uuid from 'react-uuid';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { ConfirmDialog, CreateQuizDialog } from '../../../common/Dialog';
import Dropdown from '../../../common/Dropdown';
import { OriginInput } from '../../../common/Input';
import { WrapperSection } from '../../../styles/Utils';
import { convertNumberFormat, deepCloneObject } from '../../../utils';
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
  TotalQuiz,
} from './CreateQuizStyles';
import ToolTip from '../../../common/ToolTip';
import { useNavigate } from 'react-router-dom';

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

const CreateQuiz = ({ isLogin, user, setGlobalQuiz }: Props) => {
  const [quizName, setQuizName] = useState('');
  const [quizCategory, setQuizCategory] = useState(QUIZ_APP_CONSTANTS.QUIZ_QUESTION.categories[0]);
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [quizList, setQuizList] = useState<QuizProps[]>([]);

  const navigate = useNavigate();

  const handleCreateNewQuiz = (values: QuizProps) => {
    const { id, question, level, answers } = values;
    setQuizList((prev) => [...prev, { id, question, level, answers }]);
  };

  const handleUpdateQuiz = (values: QuizProps) => {
    const { id, question, level, answers } = values;
    setQuizList((prev) => prev.map((quiz) => (quiz.id === editId ? { id, question, level, answers } : quiz)));
  };

  const handleDeleteQuiz = (id: string) => {
    setDeleteId(undefined);
    setQuizList((prev) => prev.filter((quiz) => quiz.id !== id));
  };

  const handleDuplicateQuiz = (id: string) => {
    const findIndex = quizList.findIndex((quiz) => quiz.id === id);

    if (findIndex !== -1) {
      const quizCopy = deepCloneObject(quizList[findIndex]);
      quizCopy.id = Math.random() + '';

      const newQuizList = [...quizList];
      newQuizList.splice(findIndex + 1, 0, quizCopy);
      setQuizList(newQuizList);
    }
  };

  const handleSaveQuiz = () => {
    const newQuizList = quizList.map((quiz) => {
      const { id, question, level, answers } = quiz;

      const correctAnswer = answers
        .filter((answer) => answer.isCorrect)
        .map((answer) => ({ id: answer.id, content: answer.content }))[0];
      const inCorrectAnswers = answers
        .filter((answer) => !answer.isCorrect)
        .map((answer) => ({ id: answer.id, content: answer.content }));

      return { id, question, level, correctAnswer, inCorrectAnswers };
    });

    setGlobalQuiz((prev: any[]) => [
      ...prev,
      { userId: user.name, name: quizName, category: quizCategory, quizList: newQuizList },
    ]);
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/sign-in');
    }
  });

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
          initialQuiz={quizList.find((quiz) => quiz.id === editId) || initialQuiz}
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
                value={quizName}
                name="quiz-name"
                setValue={setQuizName}
                errorMessage={quizName === '' && 'Quiz Name is not empty!'}
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
                activeValue={quizCategory}
                values={QUIZ_APP_CONSTANTS.QUIZ_QUESTION.categories}
                handleSelected={(value) => setQuizCategory(value)}
              />
            </CategoryQuiz>
            <LevelQuiz>
              <LabelGroup>Quiz Level</LabelGroup>
              <LevelList>
                {QUIZ_APP_CONSTANTS.QUIZ_QUESTION.levels.map((level) => (
                  <LevelItem key={level.name} typeColor={level.typeColor}>
                    {level.name}
                  </LevelItem>
                ))}
              </LevelList>
            </LevelQuiz>
          </QuizOptions>

          {quizList.length > 0 ? (
            <TotalQuiz>
              <h3>
                <MdOutlineMenuOpen />
                <span>{convertNumberFormat(quizList.length)} Quizzes</span>
              </h3>
            </TotalQuiz>
          ) : (
            <NoQuiz>
              <SignUpButton onClick={() => setIsShowCreateDialog(true)}>Create Now</SignUpButton>
              <span>Don't have any quizzes!</span>
            </NoQuiz>
          )}
          <QuizList>
            {quizList.map((quiz, idx) => (
              <QuizItem key={`quiz-item-${quiz.id}`}>
                <QuizItemHeader>
                  <QuizItemNumber>Quiz {convertNumberFormat(idx + 1)}</QuizItemNumber>
                  <QuizItemActions>
                    <ToolTip content={`${quiz.level} Level`}>
                      <LevelButton
                        disable={true}
                        typeColor={QUIZ_APP_CONSTANTS.QUIZ_QUESTION.getActiveLevelTypeColor(quiz.level)}
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
            <SignUpButton disabled={quizName === ''} onClick={handleSaveQuiz}>
              Save
            </SignUpButton>
          </CreateQuizFooter>
        </Content>
      </WrapperSection>
    </Container>
  );
};

export default CreateQuiz;
