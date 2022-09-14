import React from 'react';
import signInImage from '../../../images/signIn.svg';
import { Wrapper } from '../../../styles/Utils';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from '../SignUp/SignUpStyles';

const signInFormValues: formValueProps[] = [
  {
    type: 'text',
    placeholder: 'Your Name',
    name: 'name',
    initValue: '',
  },
  {
    type: 'password',
    placeholder: 'Your Password',
    name: 'password',
    initValue: '',
  },
];

const SignIn = () => {
  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Container>
      <Wrapper>
        <AuthenForm
          title="Sign In"
          submitButtonText="Sign In"
          bannerImg={signInImage}
          isVerticalReverse={true}
          formId="signInForm"
          moreActionText="Create an account"
          moreActionLink="/sign-up"
          formValues={signInFormValues}
          onSubmit={handleSubmit}
        />
      </Wrapper>
    </Container>
  );
};

export default SignIn;
