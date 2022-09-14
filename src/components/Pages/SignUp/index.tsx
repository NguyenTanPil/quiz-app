import React from 'react';
import signUpImage from '../../../images/signUp.svg';
import { Wrapper } from '../../../styles/Utils';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from './SignUpStyles';

const signUpFormValues: formValueProps[] = [
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
  const handleSubmit = () => {
    console.log('submit');
  };

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
