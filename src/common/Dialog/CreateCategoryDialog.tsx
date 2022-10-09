import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import { CategoryQuiz, LabelGroup } from '../../components/Pages/CreateExam/CreateExamStyles';
import { compareTwoObjects, DialogUtils, getObjectKeysChanged } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { QuizProps } from '../../utils/types';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { ActionButton, DialogCloseButton, SignUpButton } from '../Button';
import Dropdown from '../Dropdown';
import { OriginInput, QuizAnswerInput, RadioBox, Textarea, ValidTextInput } from '../Input';
import ToolTip from '../ToolTip';
import {
  Container,
  CreateQuizContent,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ElementGroup,
  QuizAnswers,
  QuizOptions,
  CategoryList,
  CategoryItem,
  CategoryContent,
  CategoryColor,
  SelectedCategory,
  ActionsCategory,
  CreateCategory,
  CreateCategoryActions,
} from './DialogStyles';

const categoryListTemp = [
  {
    id: '123',
    name: 'Category Name 1',
    notes:
      'I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS',
    bg: '#ddffff',
  },
  {
    id: '1233',
    name: 'Category Name 2',
    notes:
      'I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS',
    bg: '#dddfff',
  },
  {
    id: '12334',
    name: 'Category Name 24',
    notes:
      'I want to wrap a text within only two lines inside div of specific width. If text goes beyond the length of two lines then I want to show ellipses. Is there a way to do that using CSS',
    bg: '#dddfff',
  },
];

type CreateCategoryDialogProps = {
  title: string;
  initialCategory: string;
  cancelButtonContent: string;
  applyButtonContent: string;
  handleCancelDialog: () => void;
  handleApplyDialog: (values: any) => void;
  handleCloseDialog: () => void;
};

const CreateCategoryDialog = ({
  title,
  cancelButtonContent,
  applyButtonContent,
  initialCategory,
  handleCancelDialog,
  handleApplyDialog,
  handleCloseDialog,
}: CreateCategoryDialogProps) => {
  const [categoryList, setCategoryList] = useState(categoryListTemp);
  const [categoryId, setCategoryId] = useState(initialCategory || categoryListTemp[0].id);
  const [isCreate, setIsCreate] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | undefined>(undefined);

  const contentRef = useRef<HTMLDivElement>();
  const initialValues = useMemo(() => {
    if (editCategoryId) {
      const editCategoryIndex = categoryList.findIndex((category) => category.id === editCategoryId) || 0;
      const editCategory = categoryList[editCategoryIndex];
      return {
        categoryName: editCategory.name,
        categoryNotes: editCategory.notes,
        categoryBg: editCategory.bg,
      };
    }

    return { categoryName: '', categoryBg: '#9852f9', categoryNotes: '' };
  }, [editCategoryId]);

  const handleClose = () => {
    handleCloseDialog();
    DialogUtils.resetScrollbar();
  };

  useOnClickOutside(contentRef, handleClose);

  const handleCancel = () => {
    handleCancelDialog();
    DialogUtils.resetScrollbar();
  };

  const handleCreateNewCategory = (values: any) => {
    setCategoryList((prev) => [...prev, { id: '1234556', ...values }]);
  };

  const handleUpdateCategory = (values: any) => {
    const editCategoryIndex = categoryList.findIndex((category) => category.id === editCategoryId) || 0;
    const updatedCategory = { ...categoryList[editCategoryIndex] };
    const changedKeys = getObjectKeysChanged(updatedCategory, { ...values, id: editCategoryId });

    if (changedKeys.isUpdated === false) return;

    for (const key in changedKeys.data) {
      updatedCategory[key as keyof typeof updatedCategory] = changedKeys.data[key];
    }

    setCategoryList((prev) => prev.map((category) => (category.id === editCategoryId ? updatedCategory : category)));
  };

  const handleApply = () => {
    const categoryIndex = categoryList.findIndex((category) => category.id === categoryId) || 0;
    handleApplyDialog(categoryList[categoryIndex]);
    DialogUtils.resetScrollbar();
    handleCloseDialog();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
  }, []);

  return (
    <Container>
      <CreateQuizContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseButton onClick={handleClose}>
            <MdOutlineClose />
          </DialogCloseButton>
        </DialogHeader>
        <DialogBody>
          {isCreate || editCategoryId ? (
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={(values, actions) => {
                const prevValues = { name: values.categoryName, notes: values.categoryNotes, bg: values.categoryBg };

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
                <Form id="create-category-form" onSubmit={handleSubmit}>
                  <DialogBody>
                    <QuizOptions>
                      <ElementGroup>
                        <LabelGroup>Category Name</LabelGroup>
                        <OriginInput
                          name="categoryName"
                          value={values.categoryName}
                          errorMessage={values.categoryName === '' && 'Category name is not empty'}
                          setValue={(value) => setFieldValue('categoryName', value)}
                        />
                      </ElementGroup>
                      <ElementGroup>
                        <h3>Category Color</h3>
                        <OriginInput
                          type="color"
                          name="categoryBg"
                          value={values.categoryBg}
                          setValue={(value) => setFieldValue('categoryBg', value)}
                        />
                      </ElementGroup>
                    </QuizOptions>
                    <ElementGroup>
                      <h3>Category Notes</h3>
                      <Textarea
                        id="category-notes"
                        value={values.categoryNotes}
                        setValue={(value) => {
                          setFieldValue('categoryNotes', value);
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
                  </DialogBody>
                </Form>
              )}
            </Formik>
          ) : (
            <CreateCategory>
              <SignUpButton type="button" onClick={() => setIsCreate(true)}>
                New category
              </SignUpButton>
            </CreateCategory>
          )}
          <CategoryList>
            {categoryList.map((item) => (
              <CategoryItem key={item.id}>
                <CategoryColor bg={item.bg} />
                <CategoryContent>
                  <h4>{item.name}</h4>
                  <p>{item.notes}</p>
                </CategoryContent>
                <ActionsCategory>
                  <SelectedCategory>
                    <ToolTip content="Select Category">
                      <RadioBox
                        isActive={categoryId === item.id ? true : undefined}
                        handleChecked={() => setCategoryId(item.id)}
                      />
                    </ToolTip>
                  </SelectedCategory>
                  <ToolTip content="Edit Category">
                    <ActionButton
                      onClick={() => {
                        setIsCreate(false);
                        setEditCategoryId(item.id);
                      }}
                    >
                      <BiEditAlt />
                    </ActionButton>
                  </ToolTip>
                </ActionsCategory>
              </CategoryItem>
            ))}
          </CategoryList>
        </DialogBody>
        <DialogFooter justifyContent="flex-end">
          <SignUpButton type="button" typeColor="errorColor" onClick={handleCancel}>
            {cancelButtonContent}
          </SignUpButton>
          <SignUpButton type="button" typeColor="successColor" onClick={handleApply}>
            {applyButtonContent}
          </SignUpButton>
        </DialogFooter>
      </CreateQuizContent>
    </Container>
  );
};

CreateCategoryDialog.defaultProps = {
  cancelButtonContent: 'cancel',
  applyButtonContent: 'apply',
};

export default CreateCategoryDialog;
