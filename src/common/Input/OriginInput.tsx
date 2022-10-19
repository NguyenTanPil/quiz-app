import React, { useEffect, useRef, useState } from 'react';
import { Container, ErrorMessage, InputField, WrapMessage } from './InputStyles';

type OriginInputProps = {
  value: string | number;
  type?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string | boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  setValue?: (quizName: string) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const OriginInput = ({
  value,
  type,
  name,
  placeholder,
  errorMessage,
  readOnly,
  min,
  max,
  setValue,
  onClick,
  onFocus,
  onBlur,
}: OriginInputProps) => {
  const messageRef = useRef<HTMLDivElement>();
  const wrapMessageRef = useRef<HTMLDivElement>();
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const handleInputBlur = () => {
    if (onBlur) {
      onBlur();
    } else {
      if (errorMessage) {
        setIsShowErrorMessage(true);
      } else {
        setIsShowErrorMessage(false);
      }
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
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e: any) => handleChange(e.target.value)}
        onClick={() => onClick && onClick()}
        onBlur={handleInputBlur}
        onFocus={() => onFocus && onFocus()}
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
  placeholder: '',
};

export default OriginInput;
