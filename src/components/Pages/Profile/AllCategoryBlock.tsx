import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { CreateCategoryForm } from '../../../common/Dialog';
import { OriginInput } from '../../../common/Input';
import Pagination from '../../../common/Pagination';
import { ActionsCategory, CategoryColor, CategoryContent, CategoryItem, CategoryList } from '../../../common/Styles';
import ToolTip from '../../../common/ToolTip';
import { EmptyListAction } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import NoDataToShow from '../../NoDataToShow';
import { BlockContent, BlockFilter, CreateCategoryBlock, ExamBlock, NoExam, PaginationWrap } from './ProfileStyles';

type AllExamBlockProps = {
  [key: string]: any;
};

const AllCategoryBlock = ({
  isCreateCategory,
  editCategoryId,
  originCategoryList,
  categoryFilter,
  initialValues,
  categoryList,
  setIsCreateCategory,
  setEditCategoryId,
  handleUpdateCategory,
  handleCreateNewCategory,
  setCategoryFilter,
}: AllExamBlockProps) => {
  return (
    <ExamBlock>
      {(isCreateCategory || editCategoryId) && (
        <CreateCategoryBlock>
          <CreateCategoryForm
            initialValues={initialValues}
            isCreate={isCreateCategory}
            editCategoryId={editCategoryId}
            setIsCreate={setIsCreateCategory}
            setEditCategoryId={setEditCategoryId}
            handleUpdateCategory={handleUpdateCategory}
            handleCreateNewCategory={handleCreateNewCategory}
          />
        </CreateCategoryBlock>
      )}
      {originCategoryList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength && !isCreateCategory ? (
        <NoExam>
          <EmptyListAction>
            <SignUpButton
              onClick={() => {
                setIsCreateCategory(true);
                setEditCategoryId(undefined);
              }}
            >
              Create An Category
            </SignUpButton>
            <span>Don't have any categories!</span>
          </EmptyListAction>
        </NoExam>
      ) : (
        <>
          {originCategoryList.length > QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength && (
            <BlockFilter>
              <OriginInput
                type="search"
                name="searchCategory"
                value={categoryFilter.search}
                placeholder="Enter category name..."
                setValue={(value) => setCategoryFilter((prev: any) => ({ ...prev, search: value }))}
              />
              <div>
                <SignUpButton
                  type="button"
                  onClick={() => {
                    setIsCreateCategory(true);
                    setEditCategoryId(undefined);
                  }}
                >
                  Create now
                </SignUpButton>
              </div>
            </BlockFilter>
          )}
          <BlockContent>
            {categoryList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength && !isCreateCategory ? (
              <NoDataToShow message="No exams to show!" />
            ) : (
              <CategoryList>
                {categoryList.map((item: any) => (
                  <CategoryItem key={item.id}>
                    <CategoryColor color={item.color} />
                    <CategoryContent>
                      <h4>{item.name}</h4>
                      <p>{item.note}</p>
                    </CategoryContent>
                    <ActionsCategory>
                      <ToolTip content="Edit Category">
                        <ActionButton
                          onClick={() => {
                            setIsCreateCategory(false);
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
            )}

            {categoryList.length > QUIZ_APP_CONSTANTS.COMMON.itemsPerPage && (
              <PaginationWrap>
                <Pagination
                  pageSize={QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize}
                  totalPage={Math.ceil(originCategoryList.length / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize)}
                  currentPage={categoryFilter.currentPage}
                  totalElement={originCategoryList.length}
                  onNext={() => setCategoryFilter((prev: any) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  onPrev={() => setCategoryFilter((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                />
              </PaginationWrap>
            )}
          </BlockContent>
        </>
      )}
    </ExamBlock>
  );
};

export default AllCategoryBlock;
