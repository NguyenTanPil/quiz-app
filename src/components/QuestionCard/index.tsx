import React, { useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { AnswerButton, SignUpButton } from '../../common/Button';
import { AnswerObject } from '../../utils/types';
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
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }: Props) => {
  return (
    <Container>
      <ProgressBar>
        <TotalQuestionCount>Question {questionNumber} to 10</TotalQuestionCount>
        <ProgressBarFill>
          <ProgressBarStatus status={(questionNumber / 10) * 100} />
        </ProgressBarFill>
      </ProgressBar>
      <QuestionContent>
        <h3>What is not one Principle Taught in yoga?</h3>
      </QuestionContent>
      <AnswerList>
        {answers.map((answer) => (
          <AnswerItem key={answer}>
            <AnswerButton
              // disabled={!!userAnswer}
              // value={answer}
              // correct={userAnswer?.correctAnswer === answer}
              // userClicked={userAnswer?.answerClicked === answer}
              // onClick={callback}
              correct={false}
              userClicked={true}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </AnswerButton>
          </AnswerItem>
        ))}
      </AnswerList>
      <Actions>
        <SignUpButton>
          <BsArrowLeftShort />
          <span>Last Question</span>
        </SignUpButton>
        <SignUpButton onClick={callback}>
          <span>Next Question</span>
          <BsArrowRightShort />
        </SignUpButton>
      </Actions>
    </Container>
  );
};

export default QuestionCard;
