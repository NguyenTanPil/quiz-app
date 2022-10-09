import React, { useEffect, useRef, useState } from 'react';
import { Container, ErrorMessage, InputField, WrapMessage } from './InputStyles';

type OriginInputProps = {
  value: string;
  type?: string;
  name: string;
  errorMessage?: string | boolean;
  readOnly?: boolean;
  setValue?: (quizName: string) => void;
  onClick?: () => void;
};

const OriginInput = ({ value, type, name, errorMessage, readOnly, setValue, onClick }: OriginInputProps) => {
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

  const handleChange = (value: string) => {
    if (readOnly === false) {
      setValue && setValue(value);
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
        type={type}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={(e: any) => handleChange(e.target.value)}
        onClick={() => onClick && onClick()}
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

OriginInput.defaultProps = {
  readOnly: false,
  type: 'text',
};

export default OriginInput;
