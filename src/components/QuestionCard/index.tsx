import React from 'react';
import { Button } from '../../common/Button';
import { AnswerObject } from '../../utils/types';
import {
  AnswerItem,
  AnswerList,
  Container,
  QuestionContent,
  QuestionNumber,
} from './QuestionCardStyles';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Container>
      <QuestionNumber>
        Question: {questionNumber} / {totalQuestions}
      </QuestionNumber>
      <QuestionContent dangerouslySetInnerHTML={{ __html: question }} />
      <AnswerList>
        {answers.map((answer) => (
          <AnswerItem key={answer}>
            <Button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </Button>
          </AnswerItem>
        ))}
      </AnswerList>
    </Container>
  );
};

export default QuestionCard;
