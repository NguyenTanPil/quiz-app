import React, { useState } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { SiOpslevel } from 'react-icons/si';
import { SignUpButton } from '../../../common/Button';
import { OriginInput } from '../../../common/Input';
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
import { QuestionDashboard, QuestionDashboardItem, WrapperSection } from '../../../styles/Utils';
import { convertNumberFormat } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { QuizStructureTemplateState } from '../CreateExam';
import {
  Container,
  Content,
  CreateNewQuiz,
  CreateQuizHeader,
  InputQuizStructure,
  LevelButton,
  LevelItem,
  QuizName,
  QuizOptions,
  StructureItem,
} from '../CreateExam/CreateExamStyles';
import { studentReport } from '../Profile/dummyData';
import { AnswerContent } from '../Profile/ProfileStyles';
import { QuestionDashboardWrap } from './DetailExamStyles';

const listSubExam = [0, 1, 2];

const DetailExam = () => {
  const [structure, setStructure] = useState(QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizStructure);
  const [number, setNumber] = useState(0);

  const getTotalQuestionByLevel = (name: string) => {
    return 10;
  };

  return (
    <Container>
      <WrapperSection>
        <Content>
          <CreateQuizHeader>
            <QuizName>
              <LabelGroup>Quiz Name</LabelGroup>
              <OriginInput value="Game 4" name="quiz-name" readOnly={true} />
            </QuizName>
            <CreateNewQuiz>
              <LabelGroup>Create New Sub Exam</LabelGroup>
              <SignUpButton>
                <FiPlusSquare />
                <span>New Sub Exam</span>
              </SignUpButton>
            </CreateNewQuiz>
          </CreateQuizHeader>
          <QuizOptions>
            <LabelGroup>Structure of Sub Exam</LabelGroup>
            <InputQuizStructure>
              {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => {
                const { name, typeColor } = level;
                const inputValue = structure[name as keyof QuizStructureTemplateState];

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
                        setStructure((prev) => ({
                          ...prev,
                          [name]: parseInt(value),
                        }))
                      }
                    />
                  </StructureItem>
                );
              })}
            </InputQuizStructure>
          </QuizOptions>
          <QuizOptions>
            <QuestionDashboardWrap>
              <LabelGroup>Quiz Name</LabelGroup>
              <QuestionDashboard>
                {listSubExam.map((num, idx) => (
                  <QuestionDashboardItem
                    isFlag={false}
                    isSubmit={false}
                    isCorrect={false}
                    active={num === number}
                    isSelected={false}
                    key={num}
                    onClick={() => setNumber(idx)}
                  >
                    {idx + 1}
                  </QuestionDashboardItem>
                ))}
              </QuestionDashboard>
            </QuestionDashboardWrap>
          </QuizOptions>
          <QuizList>
            {studentReport.map((quiz: any, idx: number) => (
              <QuizItem key={quiz.id}>
                <QuizItemHeader>
                  <QuizItemNumber>Question {convertNumberFormat(idx + 1)}</QuizItemNumber>
                  <QuizItemActions>
                    <ToolTip content={`${quiz.level} Level`}>
                      <LevelButton
                        disable={true}
                        typeColor={QUIZ_APP_CONSTANTS.CREATE_EXAM.getActiveLevelTypeColor(quiz.level)}
                      >
                        <SiOpslevel />
                      </LevelButton>
                    </ToolTip>
                  </QuizItemActions>
                </QuizItemHeader>
                <QuizItemContent>{quiz.question}</QuizItemContent>
                <QuizItemAnswers>
                  {quiz.answers.map((answer: any) => (
                    <QuizItemAnswer key={answer.id}>
                      <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                      <AnswerContent isAnswerClicked={quiz.answerClicked === answer.id}>{answer.content}</AnswerContent>
                    </QuizItemAnswer>
                  ))}
                </QuizItemAnswers>
              </QuizItem>
            ))}
          </QuizList>
        </Content>
      </WrapperSection>
    </Container>
  );
};

export default DetailExam;
