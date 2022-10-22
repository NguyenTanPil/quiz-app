import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Content,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  EnterCode,
  BodyDialogWrap,
} from './DialogStyles';
import { MdOutlineClose } from 'react-icons/md';
import { DialogCloseButton, SignUpButton } from '../Button';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { DialogUtils, ValidUtils } from '../../utils';
import { OriginInput } from '../Input';
import useDebounce from '../hooks/useDebounce';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';

type JoinDialogProps = {
  title: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  cancelButtonTypeColor: string;
  applyButtonTypeColor: string;
  handleCancelDialog?: () => void;
  handleApplyDialog: (code: string) => void;
  handleCloseDialog: () => void;
};

const JoinDialog = ({
  title,
  cancelButtonContent,
  applyButtonContent,
  cancelButtonTypeColor,
  applyButtonTypeColor,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: JoinDialogProps) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const contentRef = useRef<HTMLDivElement>();

  const handleClose = () => {
    handleCloseDialog();
    DialogUtils.resetScrollbar();
  };

  useOnClickOutside(contentRef, handleClose);
  const debouncedValue = useDebounce<string>(code, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);

  const handleCancel = () => {
    handleCancelDialog && handleCancelDialog();
    DialogUtils.resetScrollbar();
  };

  const handleApply = () => {
    handleApplyDialog(code);
    DialogUtils.resetScrollbar();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
  }, []);

  useEffect(() => {
    setErrorMessage(ValidUtils.code(debouncedValue));
  }, [debouncedValue]);

  return (
    <Container>
      <Content ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleClose}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <BodyDialogWrap>
          <DialogBody>
            <EnterCode>
              <h3>Exam Code</h3>
              <OriginInput
                value={code}
                name="exam-code"
                errorMessage={errorMessage}
                setValue={(value) => setCode(value)}
              />
            </EnterCode>
          </DialogBody>
        </BodyDialogWrap>
        <DialogFooter justifyContent="center">
          <SignUpButton typeColor={cancelButtonTypeColor} onClick={handleCancel}>
            {cancelButtonContent}
          </SignUpButton>
          <SignUpButton disabled={errorMessage !== ''} typeColor={applyButtonTypeColor} onClick={handleApply}>
            {applyButtonContent}
          </SignUpButton>
        </DialogFooter>
      </Content>
    </Container>
  );
};

JoinDialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
  cancelButtonTypeColor: 'errorColor',
  applyButtonTypeColor: 'successColor',
};

export default JoinDialog;
