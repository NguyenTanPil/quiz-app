import React, { useState, useEffect } from 'react';
import { RichEditor } from './InputStyles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useDebounce from '../hooks/useDebounce';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import PropTypes from 'prop-types';

type TextareaProps = {
  id: string;
  isFull?: boolean;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
};

const Textarea = ({ id, isFull, placeholder, value, setValue }: TextareaProps) => {
  const [text, setText] = useState(value);

  const debouncedValue = useDebounce<string>(text, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);

  const modules = {
    toolbar: isFull ? QUIZ_APP_CONSTANTS.AUTHEN_FORM.toolbarFull : QUIZ_APP_CONSTANTS.AUTHEN_FORM.toolbarShort,
  };

  const formats = isFull ? QUIZ_APP_CONSTANTS.AUTHEN_FORM.formatsFull : QUIZ_APP_CONSTANTS.AUTHEN_FORM.formatsShort;

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue]);

  return (
    <RichEditor id={`${id}-textarea`}>
      <ReactQuill
        placeholder={placeholder}
        theme="snow"
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
      />
    </RichEditor>
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  isFull: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

Textarea.defaultProps = {
  isFull: true,
  value: '',
  placeholder: 'Write somethings...',
};

export default Textarea;
