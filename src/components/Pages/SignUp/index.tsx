import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../../api/authentication';
import { ConfirmDialog } from '../../../common/Dialog';
import signUpImage from '../../../images/signUp.svg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from './SignUpStyles';

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

const SignUp = () => {
  const navigate = useNavigate();
  const [errorDialog, setErrorDialog] = useState({ message: '', isShow: false });

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
      setErrorDialog({
        isShow: true,
        message: response.message,
      });
    }
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     navigate('/');
  //   }
  // }, []);

  return (
    <Container>
      {/* starts dialogs */}
      {errorDialog.isShow && (
        <ConfirmDialog
          content={errorDialog.message}
          title="Notification"
          applyButtonContent="Try Again"
          handleApplyDialog={() => setErrorDialog({ message: '', isShow: false })}
          handleCloseDialog={() => setErrorDialog({ message: '', isShow: false })}
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
