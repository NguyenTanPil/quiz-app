import React, { useEffect, useRef } from 'react';
import { Field } from 'formik';
import { Container, ErrorMessage, FieldGroup, IconStatus, WrapMessage } from './InputStyles';
import { BiErrorCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

type ValidTextInputProps = {
  type: string;
  name: string;
  placeholder: string;
  errorMessage: boolean | string | undefined;
  touched: boolean | undefined;
  validateFunc: (value: string) => void;
};

const ValidTextInput = ({ type, name, placeholder, errorMessage, touched, validateFunc }: ValidTextInputProps) => {
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
      <FieldGroup isError={errorMessage ? 1 : 0}>
        <Field type={type} name={name} placeholder=" " autoComplete="off" validate={validateFunc} />
        <span>{placeholder}</span>
      </FieldGroup>
      <ErrorMessage ref={wrapMessageRef}>
        <WrapMessage ref={messageRef}>
          <span>{errorMessage}</span>
        </WrapMessage>
      </ErrorMessage>
      <IconStatus isError={errorMessage ? 1 : 0}>
        {touched ? <> {errorMessage ? <BiErrorCircle /> : <AiOutlineCheckCircle />} </> : ''}
      </IconStatus>
    </Container>
  );
};

export default ValidTextInput;
