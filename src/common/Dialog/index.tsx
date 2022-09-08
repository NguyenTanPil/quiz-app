import React, { useEffect, useRef } from 'react';
import { Container, Content, DialogBody, DialogFooter, DialogHeader, DialogTitle } from './DialogStyles';
import { MdOutlineClose } from 'react-icons/md';
import { DialogCloseButton, SignUpButton } from '../Button';
import useOnClickOutside from '../../utils/useOnClickOutside';

type DialogProps = {
  content: string;
  title: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  handleCancelDialog: () => void;
  handleApplyDialog: () => void;
  handleCloseDialog: () => void;
};

const resetScrollbar = () => {
  document.body.style.height = '';
  document.body.style.overflowY = '';
};

const disableScrollbar = () => {
  document.body.style.height = '100vh';
  document.body.style.overflowY = 'hidden';
};

const Dialog = ({
  content,
  title,
  cancelButtonContent,
  applyButtonContent,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: DialogProps) => {
  const contentRef = useRef<HTMLDivElement>();

  const handleClose = () => {
    handleCloseDialog();
    resetScrollbar();
  };

  useOnClickOutside(contentRef, handleClose);

  const handleCancel = () => {
    handleCancelDialog();
    resetScrollbar();
  };

  const handleApply = () => {
    handleApplyDialog();
    resetScrollbar();
  };

  useEffect(() => {
    disableScrollbar();
  }, []);

  return (
    <Container>
      <Content ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleClose}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <SignUpButton typeColor="errorColor" onClick={handleCancel}>
            {cancelButtonContent}
          </SignUpButton>
          <SignUpButton typeColor="successColor" onClick={handleApply}>
            {applyButtonContent}
          </SignUpButton>
        </DialogFooter>
      </Content>
    </Container>
  );
};

Dialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
};

export default Dialog;
