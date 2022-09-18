import React, { useState } from 'react';
import { BiCopy, BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { FiPlusSquare } from 'react-icons/fi';
import { SiOpslevel } from 'react-icons/si';
import { MdOutlineMenuOpen } from 'react-icons/md';
import uuid from 'react-uuid';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { CreateQuizDialog } from '../../../common/Dialog';
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

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('Test');
  const [quizCategory, setQuizCategory] = useState(QUIZ_APP_CONSTANTS.QUIZ_QUESTION.categories[0]);
  const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [quizList, setQuizList] = useState<QuizProps[]>([
    {
      id: '1',
      question: 'This is question 1',
      level: 'Easy',
      answers: [
        { id: '1', content: 'this is answer 1', isCorrect: true },
        { id: '2', content: 'this is answer 2', isCorrect: false },
        { id: '3', content: 'this is answer 3', isCorrect: false },
        { id: '4', content: 'this is answer 4', isCorrect: false },
      ],
    },
  ]);

  const handleCreateNewQuiz = (values: QuizProps) => {
    const { id, question, level, answers } = values;
    setQuizList((prev) => [...prev, { id, question, level, answers }]);
  };

  const handleUpdateQuiz = (values: QuizProps) => {
    const { id, question, level, answers } = values;
    setQuizList((prev) => prev.map((quiz) => (quiz.id === editId ? { id, question, level, answers } : quiz)));
  };

  const handleDeleteQuiz = (id: string) => {
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

      const correctAnswer = answers.find((answer) => answer.isCorrect)?.content;
      const inCorrectAnswers = answers.filter((answer) => !answer.isCorrect).map((answer) => answer.content);

      return { id, question, level, correctAnswer, inCorrectAnswers };
    });

    console.log({ name: quizName, category: quizCategory, newQuizList });
  };

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
      {/* end dialogs */}
      <WrapperSection>
        <Content>
          <CreateQuizHeader>
            <QuizName>
              <LabelGroup>Quiz Name</LabelGroup>
              <OriginInput
                value={quizName}
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
                    Easy
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
                    <LevelButton
                      disable={true}
                      typeColor={QUIZ_APP_CONSTANTS.QUIZ_QUESTION.getActiveLevelTypeColor(quiz.level)}
                    >
                      <SiOpslevel />
                    </LevelButton>
                    <ActionButton onClick={() => setEditId(quiz.id)}>
                      <BiEditAlt />
                    </ActionButton>
                    <ActionButton typeColor="successColor" onClick={() => handleDuplicateQuiz(quiz.id)}>
                      <BiCopy />
                    </ActionButton>
                    <ActionButton typeColor="errorColor" onClick={() => handleDeleteQuiz(quiz.id)}>
                      <CgTrash />
                    </ActionButton>
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
