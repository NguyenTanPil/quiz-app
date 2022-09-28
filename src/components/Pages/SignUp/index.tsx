import moment from 'moment';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../../api/authentication';
import signUpImage from '../../../images/signUp.svg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from './SignUpStyles';
import uuid from 'react-uuid';

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

  const handleSubmit = async (values: any) => {
    const formValues = { ...values };

    formValues.id = uuid();
    formValues.role =
      values.role === 'Student'
        ? QUIZ_APP_CONSTANTS.AUTHEN_FORM.studentRoleNumber
        : QUIZ_APP_CONSTANTS.AUTHEN_FORM.teacherRoleNumber;
    formValues.nameTitle = QUIZ_APP_CONSTANTS.CREATE_EXAM.initNameTitle;
    formValues.createdAt = moment().valueOf();

    delete formValues.repeatPass;

    try {
      await createAccount(formValues);
    } catch (error) {
      console.log({ error });
    }
    navigate('/sign-in');
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
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
