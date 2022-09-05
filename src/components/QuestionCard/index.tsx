import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
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
  totalCorrectAnswers: number;
  totalQuestions: number;
  questionNumber: number;
  score: number;
  questionDetails: QuestionState;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  nextQuestion: () => void;
  setIsShowDialog: (value: boolean) => void;
};

const QuestionCard = ({
  questionDetails,
  totalCorrectAnswers,
  score,
  totalQuestions,
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
            Question {totalCorrectAnswers} to {totalQuestions}
          </span>
        </TotalQuestionCount>
        <ProgressBarFill>
          <ProgressBarStatus
            status={(totalCorrectAnswers / totalQuestions) * QUIZ_APP_CONSTANTS.COMMON.oneHundredPercent}
          />
        </ProgressBarFill>
      </ProgressBar>
      <QuestionContent>
        <h3>{question}</h3>
      </QuestionContent>
      <AnswerList>
        {answers.map((answer) => (
          <AnswerItem key={answer}>
            <AnswerButton
              disabled={isCorrect !== undefined}
              value={answer}
              isCorrect={correctAnswer === answer && answerClicked !== undefined}
              userClicked={answerClicked === answer}
              onClick={(e) => checkAnswer(e, id)}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </AnswerButton>
          </AnswerItem>
        ))}
      </AnswerList>
      <Actions>
        <SignUpButton typeColor="mainColor" onClick={() => setIsShowDialog(true)}>
          <span>Close</span>
        </SignUpButton>
        <SignUpButton
          disabled={questionNumber === totalQuestions || isCorrect === undefined}
          typeColor="mainColor"
          onClick={nextQuestion}
        >
          <span>Next Question</span>
          <BsArrowRightShort />
        </SignUpButton>
      </Actions>
    </Container>
  );
};

export default QuestionCard;
