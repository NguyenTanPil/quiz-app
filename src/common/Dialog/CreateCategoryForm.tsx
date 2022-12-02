import { Form, Formik } from 'formik';
import React from 'react';
import { compareTwoObjects } from '../../utils';
import { SignUpButton } from '../Button';
import { OriginInput, Textarea } from '../Input';
import { LabelGroup } from '../Styles';
import { CreateCategoryActions, ElementGroup, FormBody, QuizOptions } from './DialogStyles';

type CreateCategoryFormProps = {
  createName: string;
  initialValues: any;
  isCreate: boolean;
  editCategoryId: string | undefined;
  handleCreateNewCategory: (value: any) => void;
  handleUpdateCategory: (value: any) => void;
  setIsCreate: (value: any) => void;
  setEditCategoryId: (value: any) => void;
};

const CreateCategoryForm = ({
  createName,
  initialValues,
  isCreate,
  editCategoryId,
  setIsCreate,
  setEditCategoryId,
  handleUpdateCategory,
  handleCreateNewCategory,
}: CreateCategoryFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        const prevValues = { name: values.categoryName, note: values.categoryNote, color: values.categoryBg };

        if (isCreate) {
          handleCreateNewCategory(prevValues);
          actions.resetForm();
        } else {
          handleUpdateCategory(prevValues);
          setEditCategoryId(undefined);
        }
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form id={`create-${createName.toLocaleLowerCase()}-form`} onSubmit={handleSubmit}>
          <FormBody>
            <QuizOptions>
              <ElementGroup>
                <LabelGroup>{createName} Name</LabelGroup>
                <OriginInput
                  name="categoryName"
                  value={values.categoryName}
                  errorMessage={values.categoryName === '' && `${createName} name is not empty`}
                  setValue={(value) => setFieldValue('categoryName', value)}
                />
              </ElementGroup>
              <ElementGroup>
                <h3>{createName} Color</h3>
                <OriginInput
                  type="color"
                  name="categoryBg"
                  value={values.categoryBg}
                  setValue={(value) => setFieldValue('categoryBg', value)}
                />
              </ElementGroup>
            </QuizOptions>
            <ElementGroup>
              <h3>{createName} note</h3>
              <Textarea
                id={`${createName.toLocaleLowerCase()}-note`}
                placeholder={`Enter ${createName.toLocaleLowerCase()} name...`}
                value={values.categoryNote}
                setValue={(value) => {
                  setFieldValue('categoryNote', value);
                }}
              />
            </ElementGroup>
            <CreateCategoryActions>
              <SignUpButton
                type="button"
                typeColor="errorColor"
                onClick={() => (isCreate ? setIsCreate(false) : setEditCategoryId(undefined))}
              >
                Close
              </SignUpButton>
              <SignUpButton
                type="submit"
                disabled={isCreate ? values.categoryName === '' : compareTwoObjects(values, initialValues)}
              >
                {editCategoryId === undefined ? 'Add' : 'Update'}
              </SignUpButton>
            </CreateCategoryActions>
          </FormBody>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategoryForm;
