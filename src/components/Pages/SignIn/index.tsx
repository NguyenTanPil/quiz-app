import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSignIn } from '../../../api/authentication';
import { ConfirmDialog } from '../../../common/Dialog';
import signInImage from '../../../images/signIn.svg';
import { Wrapper } from '../../../styles/Utils';
import { setCookie } from '../../../utils/cookie';
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

const SignIn = ({ isLogin, setUser, setIsLogin }: Props) => {
  const navigate = useNavigate();
  const [isShowErrorDialog, setIsShowErrorDialog] = useState(false);

  const handleSubmit = async (values: any) => {
    const response = await checkSignIn(values);

    if (response.isSuccess) {
      const user = response.data.user;
      const bearerToken = response.data['bearer-token'];

      setUser({
        nameTitle: 'Mr.',
        name: user.name,
        email: user.email,
      });

      setIsLogin(true);
      setCookie({ data: { user }, cookieName: 'user', time: 60 * 60 * 2 });
      setCookie({ data: bearerToken, cookieName: 'bearerToken', time: 60 * 60 * 2 });
      navigate('/profile');
    } else {
      setIsShowErrorDialog(true);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return (
    <Container>
      <Wrapper>
        {isShowErrorDialog && (
          <ConfirmDialog
            content="Your email or your password is incorrect!"
            title="Notification"
            applyButtonContent="Try Again"
            handleApplyDialog={() => setIsShowErrorDialog(false)}
            handleCloseDialog={() => setIsShowErrorDialog(false)}
          />
        )}
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
