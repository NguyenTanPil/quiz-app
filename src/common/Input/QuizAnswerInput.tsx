import React from 'react';
import { QuizAnswerInputContainer, QuizAnswerInputContent, QuizAnswerInputHeader } from './InputStyles';
import RadioBox from './RadioBox';
import Textarea from './Textarea';

type QuizAnswerInputProps = {
  id: string;
  isCorrect: boolean | undefined;
  value: string;
  handleChecked: (id: string) => void;
  handleChangeAnswer: (id: string, value: string) => void;
};

const QuizAnswerInput = ({ id, isCorrect, value, handleChecked, handleChangeAnswer }: QuizAnswerInputProps) => {
  return (
    <QuizAnswerInputContainer>
      <QuizAnswerInputHeader>
        <RadioBox isActive={isCorrect} handleChecked={() => handleChecked(id)} />
      </QuizAnswerInputHeader>
      <QuizAnswerInputContent htmlFor={`answer-select-${id}`}>
        <Textarea
          id={`answer-select-${id}`}
          value={value}
          setValue={(textareaValue) => handleChangeAnswer(id, textareaValue)}
        />
      </QuizAnswerInputContent>
    </QuizAnswerInputContainer>
  );
};

export default QuizAnswerInput;
