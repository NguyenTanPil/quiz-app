import React, { useEffect, useRef } from 'react';
import { Container, Content, DialogBody, DialogFooter, DialogHeader, DialogTitle } from './DialogStyles';
import { MdOutlineClose } from 'react-icons/md';
import { DialogCloseButton, SignUpButton } from '../Button';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { DialogUtils } from '../../utils';

type ConfirmDialogProps = {
  content: string;
  title: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  handleCancelDialog: () => void;
  handleApplyDialog: () => void;
  handleCloseDialog: () => void;
};

const ConfirmDialog = ({
  content,
  title,
  cancelButtonContent,
  applyButtonContent,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: ConfirmDialogProps) => {
  const contentRef = useRef<HTMLDivElement>();

  const handleClose = () => {
    handleCloseDialog();
    DialogUtils.resetScrollbar();
  };

  useOnClickOutside(contentRef, handleClose);

  const handleCancel = () => {
    handleCancelDialog();
    DialogUtils.resetScrollbar();
  };

  const handleApply = () => {
    handleApplyDialog();
    DialogUtils.resetScrollbar();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
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
        <DialogFooter justifyContent="center">
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

ConfirmDialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
};

export default ConfirmDialog;
