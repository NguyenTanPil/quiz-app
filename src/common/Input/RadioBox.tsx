import React from 'react';
import { RadioBoxContainer } from './InputStyles';

type RadioBoxProps = {
  isActive: boolean | undefined;
  handleChecked: (value: boolean) => void;
};

const RadioBox = ({ isActive, handleChecked }: RadioBoxProps) => {
  return <RadioBoxContainer isActive={isActive} onClick={handleChecked} />;
};

export default RadioBox;
