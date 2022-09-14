import { Form, Formik, FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { RiFacebookFill, RiGoogleFill, RiTwitterFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { OtherAuthenButton, SignUpButton } from '../../common/Button';
import { ValidUtils as validate } from '../../utils';
import ValidTextInput from '../Input/ValidTextInput';
import { AuthenFormBanner, Content, FormContainer, FormTitle, ListAuthen, OtherAuthen } from './AuthenFormStyles';

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
  moreActionText: string;
  moreActionLink: string;
  formValues: formValueProps[];
  onSubmit: () => void;
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
  moreActionText,
  moreActionLink,
  formValues,
  onSubmit,
}: AuthenFormProps) => {
  return (
    <Content isReverse={isVerticalReverse}>
      <FormContainer>
        <FormTitle>
          <h3>{title}</h3>
        </FormTitle>
        <Formik
          initialValues={createInitValuesFromFormValues(formValues)}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            onSubmit();
          }}
        >
          {({ errors, touched, dirty, values, validateForm, handleSubmit }) => (
            <Form id={formId} onSubmit={handleSubmit} noValidate>
              {formValues.map((value: formValueProps) => {
                const errorProp = value.name as keyof FormikErrors<FormValues>;
                const touchedProp = value.name as keyof FormikTouched<FormValues>;
                let validFunctionParams = [values[value.name]];

                if (value.name === 'repeatPass') {
                  validFunctionParams = [values[value.name], values.password];
                }

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
              })}
              <SignUpButton type="submit" disabled={!dirty || Object.keys(errors).length > 0}>
                {submitButtonText}
              </SignUpButton>
            </Form>
          )}
        </Formik>
        <OtherAuthen>
          <span>Or login with</span>
          <ListAuthen>
            <li>
              <OtherAuthenButton logoColor="#4267B2">
                <RiFacebookFill />
              </OtherAuthenButton>
            </li>
            <li>
              <OtherAuthenButton logoColor="#1DA1F2">
                <RiTwitterFill />
              </OtherAuthenButton>
            </li>
            <li>
              <OtherAuthenButton logoColor="#DB4437">
                <RiGoogleFill />
              </OtherAuthenButton>
            </li>
          </ListAuthen>
        </OtherAuthen>
      </FormContainer>
      <AuthenFormBanner isReverse={isVerticalReverse}>
        <img src={bannerImg} alt="" />
        <Link to={moreActionLink}>{moreActionText}</Link>
      </AuthenFormBanner>
    </Content>
  );
};

export default AuthenForm;