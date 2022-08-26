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
  questionNumber: number;
  totalQuestions: number;
  score: number;
  questionDetails: QuestionState;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
};

const QuestionCard = ({
  questionDetails,
  questionNumber,
  score,
  totalQuestions,
  checkAnswer,
  nextQuestion,
  prevQuestion,
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
          <ProgressBarStatus status={(questionNumber / totalQuestions) * QUIZ_APP_CONSTANTS.COMMON.oneHundredPercent} />
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
        <SignUpButton disabled={questionNumber === QUIZ_APP_CONSTANTS.GAME.firstNumberQuestion} onClick={prevQuestion}>
          <BsArrowLeftShort />
          <span>Last Question</span>
        </SignUpButton>
        <SignUpButton disabled={questionNumber === totalQuestions} onClick={nextQuestion}>
          <span>Next Question</span>
          <BsArrowRightShort />
        </SignUpButton>
      </Actions>
    </Container>
  );
};

export default QuestionCard;
