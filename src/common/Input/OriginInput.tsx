import React, { useEffect, useRef } from 'react';
import { Container, ErrorMessage, InputField, WrapMessage } from './InputStyles';

const errorMessage = '';

type OriginInputProps = {
  value: string;
  errorMessage: string | undefined | boolean;
  setValue: (quizName: string) => void;
};

const OriginInput = ({ value, errorMessage, setValue }: OriginInputProps) => {
  const messageRef = useRef<HTMLDivElement>();
  const wrapMessageRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (messageRef.current && wrapMessageRef.current) {
      const height = messageRef.current.getBoundingClientRect().height;
      wrapMessageRef.current.style.height = height + 'px';
    }
  }, [errorMessage]);

  return (
    <Container>
      <InputField type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      {errorMessage && (
        <ErrorMessage ref={wrapMessageRef}>
          <WrapMessage ref={messageRef}>
            <span>{errorMessage}</span>
          </WrapMessage>
        </ErrorMessage>
      )}
    </Container>
  );
};

export default OriginInput;
