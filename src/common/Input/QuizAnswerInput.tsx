import React from 'react';
import {
  QuizAnswerInputContainer,
  QuizAnswerInputContent,
  QuizAnswerInputHeader,
  QuizAnswerLabelHeader,
} from './InputStyles';
import RadioBox from './RadioBox';
import Textarea from './Textarea';

type QuizAnswerInputProps = {
  id: string;
  label: string;
  isCorrect: boolean | undefined;
  value: string;
  handleChecked: (id: string) => void;
  handleChangeAnswer: (id: string, value: string) => void;
};

const QuizAnswerInput = ({ id, label, isCorrect, value, handleChecked, handleChangeAnswer }: QuizAnswerInputProps) => {
  return (
    <QuizAnswerInputContainer>
      <QuizAnswerInputHeader>
        <RadioBox isActive={isCorrect} handleChecked={() => handleChecked(id)} />
      </QuizAnswerInputHeader>
      <QuizAnswerLabelHeader>{label}</QuizAnswerLabelHeader>
      <QuizAnswerInputContent htmlFor={`answer-select-${id}`}>
        <Textarea
          id={`answer-select-${id}`}
          isFull={false}
          value={value}
          placeholder="Enter answer content..."
          setValue={(textareaValue) => handleChangeAnswer(id, textareaValue)}
        />
      </QuizAnswerInputContent>
    </QuizAnswerInputContainer>
  );
};

export default QuizAnswerInput;
