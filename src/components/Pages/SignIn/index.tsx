import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import signInImage from '../../../images/signIn.svg';
import { Wrapper } from '../../../styles/Utils';
import AuthenForm, { formValueProps } from '../../AuthenForm';
import { Container } from '../SignUp/SignUpStyles';

const signInFormValues: formValueProps[] = [
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
];

type Props = {
  [key: string]: any;
};

const SignIn = ({ isLogin, user, setIsLogin }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    if (values.email === user.email && values.password === user.password) {
      setIsLogin(true);
      navigate('/');
    }
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
          title="Sign In"
          submitButtonText="Sign In"
          bannerImg={signInImage}
          isVerticalReverse={true}
          isSignIn={true}
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
