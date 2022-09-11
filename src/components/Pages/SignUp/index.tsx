import React from 'react';
import { Wrapper } from '../../../styles/Utils';
import { Container, Content, FormContainer, FormTitle, SignUpBanner } from './SignUpStyles';
import { Formik, Form } from 'formik';
import { SignUpButton } from '../../../common/Button';
import ValidTextInput from '../../Input/ValidTextInput';
import { ValidUtils as validate } from '../../../utils';
import signUpImage from '../../../images/signUp.svg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <FormContainer>
            <FormTitle>
              <h3>Sign In</h3>
            </FormTitle>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                repeatPass: '',
              }}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
              }}
            >
              {({ errors, touched, dirty, values, validateForm, handleSubmit }) => (
                <Form onSubmit={handleSubmit} noValidate>
                  <ValidTextInput
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    errorMessage={errors.name && touched.name && errors.name}
                    touched={touched.name}
                    validateFunc={validate.name}
                  />
                  <ValidTextInput
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    errorMessage={errors.email && touched.email && errors.email}
                    touched={touched.email}
                    validateFunc={validate.email}
                  />
                  <ValidTextInput
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    errorMessage={errors.password && touched.password && errors.password}
                    touched={touched.password}
                    validateFunc={validate.password}
                  />
                  <ValidTextInput
                    type="password"
                    name="repeatPass"
                    placeholder="Repeat Your Password"
                    errorMessage={errors.repeatPass && touched.repeatPass && errors.repeatPass}
                    touched={touched.repeatPass}
                    validateFunc={() => validate.repeatPass(values.repeatPass, values.password)}
                  />
                  <SignUpButton type="submit" disabled={!dirty || Object.keys(errors).length > 0}>
                    Sign In
                  </SignUpButton>
                </Form>
              )}
            </Formik>
          </FormContainer>
          <SignUpBanner>
            <img src={signUpImage} alt="" />
            <Link to="/">I'm ready member</Link>
          </SignUpBanner>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
