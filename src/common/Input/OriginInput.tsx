import React, { useEffect, useRef, useState } from 'react';
import { Container, ErrorMessage, InputField, WrapMessage } from './InputStyles';

type OriginInputProps = {
  value: string;
  name: string;
  errorMessage: string | undefined | boolean;
  setValue: (quizName: string) => void;
};

const OriginInput = ({ value, name, errorMessage, setValue }: OriginInputProps) => {
  const messageRef = useRef<HTMLDivElement>();
  const wrapMessageRef = useRef<HTMLDivElement>();
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const handleInputBlur = () => {
    if (errorMessage) {
      setIsShowErrorMessage(true);
    } else {
      setIsShowErrorMessage(false);
    }
  };

  useEffect(() => {
    if (messageRef.current && wrapMessageRef.current) {
      const height = messageRef.current.getBoundingClientRect().height;
      wrapMessageRef.current.style.height = height + 'px';
    }
  }, [isShowErrorMessage]);

  return (
    <Container>
      <InputField
        type="text"
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleInputBlur}
      />
      {isShowErrorMessage && (
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
