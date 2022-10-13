import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../../api/authentication';
import signUpImage from '../../../images/signUp.svg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from './SignUpStyles';
import uuid from 'react-uuid';
import { ConfirmDialog } from '../../../common/Dialog';

const signUpFormValues: formValueProps[] = [
  {
    type: 'select',
    placeholder: 'Your Role',
    name: 'role',
    initValue: 'Student',
  },
  {
    type: 'text',
    placeholder: 'Your Name',
    name: 'name',
    initValue: '',
  },
  {
    type: 'email',
    placeholder: 'Your Email',
    name: 'email',
    initValue: '',
  },
  {
    type: 'password',
    placeholder: 'Your Password',
    name: 'password',
    initValue: '',
  },
  {
    type: 'password',
    placeholder: 'Repeat Your Password',
    name: 'repeatPass',
    initValue: '',
  },
];

type Props = {
  [key: string]: any;
};

const SignUp = ({ isLogin }: Props) => {
  const navigate = useNavigate();
  const [isShowErrorDialog, setIsShowErrorDialog] = useState(false);

  const handleSubmit = async (values: any) => {
    const formValues = { ...values };

    formValues.role =
      values.role === 'Student'
        ? QUIZ_APP_CONSTANTS.AUTHEN_FORM.studentRoleNumber
        : QUIZ_APP_CONSTANTS.AUTHEN_FORM.teacherRoleNumber;
    formValues.nameTitle = QUIZ_APP_CONSTANTS.CREATE_EXAM.initNameTitle;

    delete formValues.repeatPass;

    const response = await createAccount(formValues);
    if (response.isSuccess) {
      navigate('/sign-in');
    } else {
      setIsShowErrorDialog(true);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      {/* starts dialogs */}
      {isShowErrorDialog && (
        <ConfirmDialog
          content="Your email is exists!"
          title="Notification"
          applyButtonContent="Try Again"
          handleApplyDialog={() => setIsShowErrorDialog(false)}
          handleCloseDialog={() => setIsShowErrorDialog(false)}
        />
      )}
      {/* starts dialogs */}
      <Wrapper>
        <AuthenForm
          title="Sign Up"
          submitButtonText="Sign Up"
          bannerImg={signUpImage}
          formId="signUpForm"
          moreActionText="I'm ready member"
          moreActionLink="/sign-in"
          formValues={signUpFormValues}
          onSubmit={handleSubmit}
        />
      </Wrapper>
    </Container>
  );
};

export default SignUp;
