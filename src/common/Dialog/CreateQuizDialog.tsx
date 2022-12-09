import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { DialogUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { QuizProps } from '../../utils/types';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { DialogCloseButton, SignUpButton } from '../Button';
import Dropdown from '../Dropdown';
import { QuizAnswerInput, Textarea } from '../Input';
import {
  Container,
  CreateQuizContent,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ElementGroup,
  QuizAnswers,
  QuizOptions,
  FormBody,
} from './DialogStyles';
import { TitleGroup } from '../Styles';

type CreateQuizDialogProps = {
  title: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  initialQuiz: QuizProps;
  handleCancelDialog: () => void;
  handleApplyDialog: (values: any) => void;
  handleCloseDialog: () => void;
};

const CreateQuizDialog = ({
  title,
  cancelButtonContent,
  applyButtonContent,
  initialQuiz,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: CreateQuizDialogProps) => {
  const contentRef = useRef<HTMLDivElement>();
  const [isShuffle, setIsShuffle] = useState(false);

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
    if (!values.question) return;

    handleApplyDialog(values);
    DialogUtils.resetScrollbar();
    handleCloseDialog();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
  }, []);

  return (
    <Container>
      <CreateQuizContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleClose}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <DialogBody>
          <Formik
            initialValues={initialQuiz}
            onSubmit={(values) => {
              handleApply({ ...values });
            }}
          >
            {({ dirty, values, setFieldValue, handleSubmit }) => (
              <Form id="create-quiz-form" onSubmit={handleSubmit}>
                <FormBody>
                  <QuizOptions>
                    <ElementGroup>
                      <h3>Quiz Level</h3>
                      <Dropdown
                        id="level"
                        activeValue={values.level}
                        values={QUIZ_APP_CONSTANTS.CREATE_EXAM.getAllLevels()}
                        handleSelected={(value) => setFieldValue('level', value)}
                      />
                    </ElementGroup>
                    <ElementGroup>
                      <h3>Exam Mode</h3>
                      <Dropdown
                        id="mode"
                        activeValue={values.mode}
                        values={QUIZ_APP_CONSTANTS.CREATE_EXAM.examModes}
                        handleSelected={(value) => setFieldValue('mode', value)}
                      />
                    </ElementGroup>
                  </QuizOptions>
                  <ElementGroup>
                    <h3>Quiz Content</h3>
                    <Textarea
                      id="create-quiz"
                      value={values.question}
                      placeholder="Enter question content..."
                      setValue={(value) => {
                        setFieldValue('question', value);
                      }}
                    />
                  </ElementGroup>
                  <ElementGroup>
                    <TitleGroup>
                      <h3>Quiz Answers</h3>
                      {/* <SignUpButton type="button" onClick={() => setIsShuffle(!isShuffle)}>
                        {isShuffle ? 'Shuffle' : 'UnShuffle'}
                      </SignUpButton> */}
                    </TitleGroup>
                    <QuizAnswers>
                      {values.answers.map((answer: any, idx: number) => (
                        <QuizAnswerInput
                          key={`answer-${answer.id}`}
                          id={answer.id}
                          label={QUIZ_APP_CONSTANTS.AUTHEN_FORM.answerLabels[idx]}
                          isCorrect={answer.isCorrect}
                          value={answer.content}
                          handleChecked={(id) => {
                            const newAnswers = values.answers.map((answer) =>
                              answer.id === id ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false },
                            );
                            setFieldValue('answers', newAnswers);
                          }}
                          handleChangeAnswer={(id, value) => {
                            const newAnswers = values.answers.map((answer) =>
                              answer.id === id ? { ...answer, content: value } : answer,
                            );
                            setFieldValue('answers', newAnswers);
                          }}
                        />
                      ))}
                    </QuizAnswers>
                  </ElementGroup>
                </FormBody>
                <DialogFooter justifyContent="flex-end" pt={3.2}>
                  <SignUpButton type="button" typeColor="errorColor" onClick={handleCancel}>
                    {cancelButtonContent}
                  </SignUpButton>
                  <SignUpButton
                    type="submit"
                    typeColor="successColor"
                    disabled={
                      !dirty ||
                      values.question === '' ||
                      values.answers.some((value) => value.content === '' || value.isCorrect === undefined)
                    }
                    onClick={handleApply}
                  >
                    {applyButtonContent}
                  </SignUpButton>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </CreateQuizContent>
    </Container>
  );
};

CreateQuizDialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
};

export default CreateQuizDialog;
