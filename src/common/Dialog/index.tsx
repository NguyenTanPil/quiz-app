import React, { useEffect } from 'react';
import { Container, Content, DialogBody, DialogFooter, DialogHeader, DialogTitle } from './DialogStyles';
import { MdOutlineClose } from 'react-icons/md';
import { DialogCloseButton, SignUpButton } from '../Button';

type DialogProps = {
  content: string;
  title: string;
  handleCloseDialog: () => void;
  handleApplyDialog: () => void;
};

const resetScrollbar = () => {
  document.body.style.height = '';
  document.body.style.overflowY = '';
};

const disableScrollbar = () => {
  document.body.style.height = '100vh';
  document.body.style.overflowY = 'hidden';
};

const Dialog = ({ content, title, handleCloseDialog, handleApplyDialog }: DialogProps) => {
  const handleClose = () => {
    handleCloseDialog();
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
      <Content>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleCloseDialog}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <DialogBody>{content}</DialogBody>
        <DialogFooter>
          <SignUpButton typeColor="errorColor" onClick={handleClose}>
            Cancel
          </SignUpButton>
          <SignUpButton typeColor="successColor" onClick={handleApply}>
            Okay
          </SignUpButton>
        </DialogFooter>
      </Content>
    </Container>
  );
};

export default Dialog;
