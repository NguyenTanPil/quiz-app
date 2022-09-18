import React, { useState } from 'react';
import { TextareaContainer } from './InputStyles';

type TextareaProps = {
  id: string;
  value: string;
  setValue: (value: string) => void;
};

const Textarea = ({ id, value, setValue }: TextareaProps) => {
  const resize = (element: HTMLInputElement) => {
    element.style.height = '0px';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    resize(e.target);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    resize(e.target as HTMLInputElement);
  };

  return <TextareaContainer id={id} value={value} onChange={handleChange} onKeyDown={handleKeydown} />;
};

export default Textarea;
