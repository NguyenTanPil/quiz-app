import { Form, Formik, FormikErrors, FormikTouched } from 'formik';
import React, { useState } from 'react';
import { RiFacebookFill, RiGoogleFill, RiTwitterFill } from 'react-icons/ri';
import { TbFaceId } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ActionButton, OtherAuthenButton, SignUpButton } from '../../common/Button';
import { RadioBox, ValidTextInput } from '../../common/Input';
import { RadioBoxList } from '../../common/Styles';
import ToolTip from '../../common/ToolTip';
import { ValidUtils as validate } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { AuthenFormBanner, Content, FormContainer, FormTitle, ListAuthen, OtherAuthen } from './AuthenFormStyles';
import FaceAuthen from './FaceAuthen';

export type formValueProps = {
  type: string;
  placeholder: string;
  name: any;
  initValue: string;
};

type AuthenFormProps = {
  title: string;
  submitButtonText: string;
  bannerImg: any;
  isVerticalReverse?: boolean;
  formId: string;
  isSignIn?: boolean;
  moreActionText: string;
  moreActionLink: string;
  formValues: formValueProps[];
  onSubmit: (values: any) => void;
};

type FormValues = {
  [key: string]: string;
};

const createInitValuesFromFormValues = (formValues: formValueProps[]): FormValues => {
  return formValues.reduce((acc, val) => ({ ...acc, [val.name]: val.initValue as string }), {});
};

const AuthenForm = ({
  title,
  submitButtonText,
  bannerImg,
  isVerticalReverse,
  formId,
  isSignIn,
  moreActionText,
  moreActionLink,
  formValues,
  onSubmit,
}: AuthenFormProps) => {
  const [isFaceAuthen, setIsFaceAuthen] = useState(false);
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<any>({})

  const handleRegister = async () => {
    const host = 'http://192.168.1.12:3000/register';
    try {
      const res: any = await FaceAuthen.AuthPopup(host, 'http://192.168.1.12:4000/', 'Register', email);
      console.log('register success:', res);
      const search = new URL(res?.href).searchParams;

      if (search.get('error')) {
        console.log(search.get('error'));
        return;
      }

      const emailReturn = search.get('email');
      // Register
      if (emailReturn) {
        setIsFaceAuthen(true);
        onSubmit({ ...values, isFaceAuthen })
      }
      console.log({ emailReturn });
    } catch (error) {
      console.log('register fails:', error);
    }
  };

  const handleLogin = async () => {
    const host = 'http://192.168.1.12:3000/login';
    try {
      const res: any = await FaceAuthen.AuthPopup(host, 'http://192.168.1.12:4000/', 'Login', "");
      const search = new URL(res?.href).searchParams;

      if (search.get('error')) {
        console.log(search.get('error'));
        return;
      }
      const emailReturn = search.get('email');
      if (emailReturn) {
        onSubmit({ ...values, loginWithFace: true, emailRetrive: emailReturn })
      }
    } catch (error) {
      console.log('login fails:', error);
    }
  };

  function checkEmail(value: string) {
    let error = false;

    if (!value) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return false
    }

    return true;
  }

  console.log({ isFaceAuthen });
  console.log(values)
  return (
    <Content isReverse={isVerticalReverse}>
      <FormContainer isReverse={isVerticalReverse}>
        <FormTitle>
          <h3>{title}</h3>
        </FormTitle>
        <Formik
          initialValues={createInitValuesFromFormValues(formValues)}
          onSubmit={(values) => {
            onSubmit({ ...values });
          }}
        >
          {({ errors, touched, dirty, values, setFieldValue, handleSubmit }) => {
            setEmail(values.email)
            setValues(values)
            return <Form id={formId} onSubmit={handleSubmit} noValidate>
              {formValues.map((value: formValueProps) => {
                const errorProp = value.name as keyof FormikErrors<FormValues>;
                const touchedProp = value.name as keyof FormikTouched<FormValues>;
                let validFunctionParams = [values[value.name]];

                if (value.name === 'repeatPass') {
                  validFunctionParams = [values[value.name], values.password];
                }

                if (value.type === 'select') {
                  return (
                    <RadioBoxList key={value.name}>
                      {QUIZ_APP_CONSTANTS.AUTHEN_FORM.roles.map((role: string) => (
                        <SignUpButton
                          key={`role-${role}`}
                          type="button"
                          onClick={() => setFieldValue(value.name, role)}
                        >
                          <span>{role}</span>
                          <RadioBox
                            isActive={role === values[value.name] ? true : undefined}
                            handleChecked={() => setFieldValue(value.name, role)}
                          />
                        </SignUpButton>
                      ))}
                      <ToolTip content={"Face Authentication"}>
                        <ActionButton onClick={handleRegister} type="button" disabled={!dirty || Object.keys(errors).length > 0}
                          style={{ opacity: !dirty || Object.keys(errors).length > 0 ? 0.5 : 1 }}>
                          <TbFaceId />
                        </ActionButton>
                      </ToolTip>
                    </RadioBoxList>
                  );
                } else {
                  return (
                    <ValidTextInput
                      key={value.name}
                      type={value.type}
                      name={value.name}
                      placeholder={value.placeholder}
                      errorMessage={errors[errorProp] && touched[touchedProp] && errors[errorProp]}
                      touched={touched[touchedProp]}
                      validateFunc={() => validate[value.name](...validFunctionParams)}
                    />
                  );
                }
              })}
              <RadioBoxList>
                {
                  !isFaceAuthen && <SignUpButton type="submit" disabled={!dirty || Object.keys(errors).length > 0}>
                    {submitButtonText}
                  </SignUpButton>
                }
                <span style={{ width: "4.8rem", height: "4.8rem", fontSize: "16px", color: "#536471" }}>Or</span>
                {
                  isSignIn && <ToolTip content={"Face Authentication"}>
                    <ActionButton onClick={handleLogin} type="button" disabled={checkEmail(email) ? false : true}
                      style={{ opacity: checkEmail(email) ? 1 : 0.5 }}>
                      <TbFaceId />
                    </ActionButton>
                  </ToolTip>
                }
              </RadioBoxList>
            </Form>
          }}
        </Formik>

      </FormContainer>
      <AuthenFormBanner isReverse={isVerticalReverse}>
        <img src={bannerImg} alt="" />
        <Link to={moreActionLink}>{moreActionText}</Link>
      </AuthenFormBanner>
    </Content>
  );
};

export default AuthenForm;
