import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { ActionButton, AnswerButton, SignUpButton } from '../../common/Button';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { QuestionState } from '../../utils/types';
import {
  Actions,
  AnswerItem,
  AnswerList,
  Container,
  FlagButton,
  ProgressBar,
  ProgressBarFill,
  ProgressBarStatus,
  QuestionContent,
  TotalQuestionCount,
} from './QuestionCardStyles';
import { RiFlag2Fill } from 'react-icons/ri';
import ToolTip from '../../common/ToolTip';
import { getOriginTextInHtmlString } from '../../utils';

type Props = {
  totalQuestions: number;
  questionNumber: number;
  score: number;
  questionsSelected: number;
  goldNumber: number;
  questionDetails: any;
  isCompleted: boolean;
  isTestMode: boolean;
  isSubmit: boolean;
  checkAnswer: (answerId: string, questionId: string) => void;
  nextQuestion: () => void;
  setIsShowDialog: (value: boolean) => void;
  toggleFlag: (value: string) => void;
};

const QuestionCard = ({
  questionDetails,
  score,
  questionsSelected,
  totalQuestions,
  isCompleted,
  questionNumber,
  checkAnswer,
  isSubmit,
  nextQuestion,
  setIsShowDialog,
  toggleFlag,
  isTestMode,
  goldNumber,
}: Props) => {
  const { id, isFlag, question, correctAnswer, answerClicked, isCorrect, answers } = questionDetails;

  return (
    <Container>
      {isTestMode && !isSubmit && (
        <FlagButton isFlag={isFlag}>
          <ToolTip content={isFlag ? 'Un Flag' : 'Flag'}>
            <ActionButton onClick={() => toggleFlag(id)}>
              <RiFlag2Fill />
            </ActionButton>
          </ToolTip>
        </FlagButton>
      )}
      <ProgressBar>
        <TotalQuestionCount>
          <span>
            {isTestMode ? 'Selected' : 'Score'} {isTestMode ? questionsSelected : score}
          </span>
          <span>
            {/* Question {questionNumber} to {totalQuestions} */}
            Question {isTestMode ? questionNumber : score} to {isTestMode ? totalQuestions : goldNumber}
          </span>
        </TotalQuestionCount>
        <ProgressBarFill>
          <ProgressBarStatus
            status={
              ((isTestMode ? questionsSelected : score) / (isTestMode ? totalQuestions : 3)) *
              QUIZ_APP_CONSTANTS.COMMON.oneHundredPercent
            }
          />
        </ProgressBarFill>
      </ProgressBar>
      <QuestionContent>
        <h3>{getOriginTextInHtmlString(question)}</h3>
      </QuestionContent>
      <AnswerList>
        {answers.map((answer: any) => (
          <AnswerItem key={answer.id}>
            <AnswerButton
              disabled={isSubmit ? true : isTestMode ? false : isCompleted || isCorrect !== undefined}
              value={answer.content}
              isCorrect={
                isSubmit
                  ? correctAnswer.content === answer.content
                  : correctAnswer.content === answer.content && answerClicked !== undefined
              }
              userClicked={answerClicked === answer.id}
              isSubmit={isSubmit}
              isTestMode={isSubmit ? false : isTestMode}
              onClick={() => checkAnswer(answer.id, id)}
            >
              <span dangerouslySetInnerHTML={{ __html: answer.content }}></span>
            </AnswerButton>
          </AnswerItem>
        ))}
      </AnswerList>
      <Actions>
        <SignUpButton
          typeColor={isTestMode && !isSubmit ? 'successColor' : 'errorColor'}
          onClick={() => setIsShowDialog(true)}
        >
          <span>{isTestMode && !isSubmit ? 'Submit' : 'Close'}</span>
        </SignUpButton>
        <SignUpButton
          disabled={isTestMode ? questionNumber === totalQuestions : score === goldNumber || isCorrect === undefined}
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
