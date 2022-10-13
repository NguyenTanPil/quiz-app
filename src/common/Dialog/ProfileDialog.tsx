import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { compareTwoObjects, DialogUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { DialogCloseButton, SignUpButton } from '../Button';
import Dropdown from '../Dropdown';
import { OriginInput } from '../Input';
import {
  Container,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ElementGroup,
  ProfileContent,
  QuizOptions,
} from './DialogStyles';

type ProfileDialogProps = {
  title: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  cancelButtonTypeColor: string;
  applyButtonTypeColor: string;
  initialValues: { name: string; nameTitle: string };
  handleCancelDialog: () => void;
  handleApplyDialog: (values: any) => void;
  handleCloseDialog: () => void;
};

const ProfileDialog = ({
  title,
  cancelButtonContent,
  applyButtonContent,
  cancelButtonTypeColor,
  applyButtonTypeColor,
  initialValues,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: ProfileDialogProps) => {
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

  const handleApply = (values: any) => {
    if (!values.name) return;

    handleApplyDialog(values);
    DialogUtils.resetScrollbar();
    handleCloseDialog();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
  }, []);

  return (
    <Container>
      <ProfileContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleClose}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              handleApply(values);
            }}
          >
            {({ dirty, values, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <QuizOptions>
                  <ElementGroup>
                    <h3>Name Title</h3>
                    <Dropdown
                      id="nameTitle"
                      activeValue={values.nameTitle}
                      values={QUIZ_APP_CONSTANTS.CREATE_EXAM.titles}
                      handleSelected={(value) => setFieldValue('nameTitle', value)}
                    />
                  </ElementGroup>
                  <ElementGroup>
                    <h3>User Name</h3>
                    <OriginInput
                      value={values.name}
                      name="name"
                      errorMessage={values.name === '' ? 'Please enter your user name' : ''}
                      setValue={(value) => setFieldValue('name', value)}
                    />
                  </ElementGroup>
                </QuizOptions>
                <DialogFooter justifyContent="flex-end">
                  <SignUpButton type="button" typeColor={cancelButtonTypeColor} onClick={handleCancel}>
                    {cancelButtonContent}
                  </SignUpButton>
                  <SignUpButton
                    type="submit"
                    disabled={!dirty || compareTwoObjects(initialValues, values)}
                    typeColor={applyButtonTypeColor}
                    onClick={handleApply}
                  >
                    {applyButtonContent}
                  </SignUpButton>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </ProfileContent>
    </Container>
  );
};

ProfileDialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
  cancelButtonTypeColor: 'errorColor',
  applyButtonTypeColor: 'successColor',
};

export default ProfileDialog;
