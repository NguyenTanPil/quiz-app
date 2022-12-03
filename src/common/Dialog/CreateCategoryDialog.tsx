import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import { createCategory, getCategoryOfUser, updateCategory } from '../../api/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import NoDataToShow from '../../components/NoDataToShow';
import {
  addNewCategory,
  CategoryState,
  createCategoryList,
  selectCategoryList,
  updateCategoryListById,
} from '../../features/category/categorySlice';
import { DialogUtils, getObjectKeysChanged } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ActionButton, DialogCloseButton, SignUpButton } from '../Button';
import useDebounce from '../hooks/useDebounce';
import { OriginInput, RadioBox } from '../Input';
import Pagination from '../Pagination';
import ToolTip from '../ToolTip';
import CreateCategoryForm from './CreateCategoryForm';
import { ActionsCategory, CategoryColor, CategoryContent, CategoryItem, CategoryList } from '../Styles';
import {
  Container,
  CreateCategory,
  CreateQuizContent,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  PaginationWrap,
  SearchCategory,
  SelectedCategory,
} from './DialogStyles';

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
  const originCategoryList = useAppSelector(selectCategoryList);
  const dispatch = useAppDispatch();

  const [categoryList, setCategoryList] = useState<CategoryState[]>([]);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [isCreate, setIsCreate] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | undefined>(undefined);

  const [searchContent, setSearchContent] = useState('');
  const [categoryCurrentPage, setCategoryCurrentPage] = useState<number>(() => {
    if (initialCategory) {
      const currentIndex =
        originCategoryList.findIndex((category: CategoryState) => category.id === initialCategory) ||
        QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage;
      return Math.ceil((currentIndex + 0.5) / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize);
    }

    return QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage;
  });

  const debouncedValue = useDebounce<string>(searchContent, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);
  const contentRef = useRef<HTMLDivElement>();
  const initialValues = useMemo(() => {
    if (editCategoryId) {
      const editCategoryIndex = categoryList.findIndex((category: CategoryState) => category.id === editCategoryId);
      const editCategory = categoryList[editCategoryIndex];

      return {
        categoryName: editCategory.name,
        categoryNote: editCategory.note,
        categoryBg: editCategory.color,
      };
    }

    return { categoryName: '', categoryBg: '#9852f9', categoryNote: '' };
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

  const handleCreateNewCategory = async (values: any) => {
    const response = await createCategory({
      name: values.name,
      note: values.note,
      isPublished: 1,
      color: values.color,
    });

    if (response.isSuccess) {
      const { id, name, note, isPublished, color } = response.data;
      const newCategory = { id, name, note, isPublished, color };

      setCategoryList((prev) => [...prev, newCategory]);
      dispatch(addNewCategory(newCategory));
    }
  };

  const handleUpdateCategory = async (values: any) => {
    const editCategoryIndex = categoryList.findIndex((category: CategoryState) => category.id === editCategoryId) || 0;
    const updatedCategory = { ...categoryList[editCategoryIndex] };
    const changedKeys = getObjectKeysChanged(updatedCategory, { ...values, id: editCategoryId });

    if (changedKeys.isUpdated === false || editCategoryId === undefined) return;
    setCategoryList((prev) =>
      prev.map((category) => (category.id === editCategoryId ? { ...updatedCategory, ...changedKeys.data } : category)),
    );

    const response = await updateCategory(changedKeys.data, editCategoryId);
    dispatch(updateCategoryListById({ ...updatedCategory, ...changedKeys.data }));
  };

  const handleApply = () => {
    const categoryIndex = categoryList.findIndex((category) => category.id === categoryId);
    handleApplyDialog(
      categoryIndex === -1 ? QUIZ_APP_CONSTANTS.CREATE_EXAM.initialCategory : categoryList[categoryIndex],
    );
    DialogUtils.resetScrollbar();
    handleCloseDialog();
  };

  useEffect(() => {
    DialogUtils.disableScrollbar();
  }, []);

  useEffect(() => {
    setCategoryList(() => {
      if (debouncedValue === '') {
        return originCategoryList.slice(0, QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize);
      }

      const regex = new RegExp(debouncedValue, 'gi');
      return originCategoryList
        .filter((category) => regex.test(category.name))
        .slice(0, QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize);
    });
  }, [debouncedValue]);

  useEffect(() => {
    const startIndex = (categoryCurrentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setCategoryList(() => originCategoryList.slice(startIndex, endIndex));
  }, [categoryCurrentPage]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchCategoryList = async () => {
      const response = await getCategoryOfUser();

      if (response.isSuccess) {
        const responseList = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          note: item.note,
          color: item.color,
        }));

        if (isSubscribed) {
          setCategoryList(responseList);
          setCategoryId(categoryId || responseList.id);
          dispatch(createCategoryList(responseList));
        }
      }
    };

    fetchCategoryList();

    return () => {
      isSubscribed = false;
    };
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
            <CreateCategoryForm
              createName="Category"
              initialValues={initialValues}
              isCreate={isCreate}
              editCategoryId={editCategoryId}
              setIsCreate={setIsCreate}
              setEditCategoryId={setEditCategoryId}
              handleUpdateCategory={handleUpdateCategory}
              handleCreateNewCategory={handleCreateNewCategory}
            />
          ) : (
            <CreateCategory>
              <SignUpButton
                type="button"
                onClick={() => {
                  setIsCreate(true);
                  setEditCategoryId(undefined);
                }}
              >
                New category
              </SignUpButton>
            </CreateCategory>
          )}
          <SearchCategory>
            <OriginInput
              type="search"
              name="searchCategory"
              value={searchContent}
              placeholder="Enter category name..."
              setValue={(value) => setSearchContent(value)}
            />
          </SearchCategory>
          {categoryList.length === 0 ? (
            <NoDataToShow message="No categories to show!" />
          ) : (
            <>
              <CategoryList>
                {categoryList.map((item) => (
                  <CategoryItem key={item.id}>
                    <CategoryColor color={item.color} />
                    <CategoryContent>
                      <h4>{item.name}</h4>
                      <div dangerouslySetInnerHTML={{ __html: item.note }} />
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
              {originCategoryList.length > QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize && (
                <PaginationWrap>
                  <Pagination
                    pageSize={QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize}
                    totalPage={Math.ceil(originCategoryList.length / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize)}
                    currentPage={categoryCurrentPage}
                    totalElement={originCategoryList.length}
                    onNext={() => setCategoryCurrentPage((prev) => prev + 1)}
                    onPrev={() => setCategoryCurrentPage((prev) => prev - 1)}
                  />
                </PaginationWrap>
              )}
            </>
          )}
        </DialogBody>
        <DialogFooter justifyContent="flex-end" pt={0.04} pr={3.2} pb={3.2} pl={3.2}>
          <SignUpButton type="button" typeColor="errorColor" onClick={handleCancel}>
            {cancelButtonContent}
          </SignUpButton>
          <SignUpButton type="button" typeColor="successColor" disabled={!categoryId} onClick={handleApply}>
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
