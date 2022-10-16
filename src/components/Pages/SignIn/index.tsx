import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSignIn } from '../../../api/authentication';
import { useAppDispatch } from '../../../app/hooks';
import { ConfirmDialog } from '../../../common/Dialog';
import { createToken, createUser } from '../../../features/user/userSlice';
import signInImage from '../../../images/signIn.svg';
import { Wrapper } from '../../../styles/Utils';
import { getLoginStatus } from '../../../utils';
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

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = getLoginStatus();
  const [errorDialog, setErrorDialog] = useState({ message: '', isShow: false });

  const handleSubmit = async (values: any) => {
    const response = await checkSignIn(values);

    if (response.isSuccess) {
      const user = response.data.user;
      const token = response.data['bearer-token'];

      const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: parseInt(user.role),
        avatar: user.avatar,
        nameTitle: user.nameTitle,
        createdAt: user.created_at,
      };

      dispatch(createUser(formattedUser));
      dispatch(createToken(token));
      setCookie({ data: formattedUser, cookieName: 'user', time: 60 * 60 * 2 });
      setCookie({ data: token, cookieName: 'token', time: 60 * 60 * 2 });
      navigate('/profile');
    } else {
      setErrorDialog({
        isShow: true,
        message: response.message,
      });
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
        {errorDialog.isShow && (
          <ConfirmDialog
            content="Your email or your password is incorrect!"
            title="Notification"
            applyButtonContent="Try Again"
            handleApplyDialog={() => setErrorDialog({ message: '', isShow: false })}
            handleCloseDialog={() => setErrorDialog({ message: '', isShow: false })}
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
