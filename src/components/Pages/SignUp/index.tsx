import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpImage from '../../../images/signUp.svg';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
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

type Props = {
  [key: string]: any;
};

const SignUp = ({ isLogin, setUser }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    setUser({ ...values, nameTitle: QUIZ_APP_CONSTANTS.NAME_TITLE.initNameTitle });
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
