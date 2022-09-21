import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { AnswerButton, SignUpButton } from '../../common/Button';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { QuestionState } from '../../utils/types';
import {
  Actions,
  AnswerItem,
  AnswerList,
  Container,
  ProgressBar,
  ProgressBarFill,
  ProgressBarStatus,
  QuestionContent,
  TotalQuestionCount,
} from './QuestionCardStyles';

type Props = {
  totalQuestions: number;
  questionNumber: number;
  score: number;
  questionDetails: QuestionState;
  isCompleted: boolean;
  checkAnswer: (answerId: string, questionId: string) => void;
  nextQuestion: () => void;
  setIsShowDialog: (value: boolean) => void;
};

const QuestionCard = ({
  questionDetails,
  score,
  totalQuestions,
  isCompleted,
  questionNumber,
  checkAnswer,
  nextQuestion,
  setIsShowDialog,
}: Props) => {
  const { id, question, correctAnswer, answerClicked, isCorrect, answers } = questionDetails;

  return (
    <Container>
      <ProgressBar>
        <TotalQuestionCount>
          <span>Score {score}</span>
          <span>
            Question {questionNumber} to {totalQuestions}
          </span>
        </TotalQuestionCount>
        <ProgressBarFill>
          <ProgressBarStatus status={(score / totalQuestions) * QUIZ_APP_CONSTANTS.COMMON.oneHundredPercent} />
        </ProgressBarFill>
      </ProgressBar>
      <QuestionContent>
        <h3>{question}</h3>
      </QuestionContent>
      <AnswerList>
        {answers.map((answer: any) => (
          <AnswerItem key={answer.id}>
            <AnswerButton
              disabled={isCompleted || isCorrect !== undefined}
              value={answer.content}
              isCorrect={correctAnswer.content === answer.content && answerClicked !== undefined}
              userClicked={answerClicked === answer.id}
              onClick={() => checkAnswer(answer.id, id)}
            >
              <span dangerouslySetInnerHTML={{ __html: answer.content }}></span>
            </AnswerButton>
          </AnswerItem>
        ))}
      </AnswerList>
      <Actions>
        <SignUpButton typeColor="errorColor" onClick={() => setIsShowDialog(true)}>
          <span>Close</span>
        </SignUpButton>
        <SignUpButton disabled={questionNumber === totalQuestions || isCorrect === undefined} onClick={nextQuestion}>
          <span>Next Question</span>
          <BsArrowRightShort />
        </SignUpButton>
      </Actions>
    </Container>
  );
};

export default QuestionCard;
