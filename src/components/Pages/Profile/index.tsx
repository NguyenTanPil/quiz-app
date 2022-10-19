import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCategory, BiEditAlt } from 'react-icons/bi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { createCategory, getCategoryOfUser, updateCategory } from '../../../api/category';
import { getExamsByUserId } from '../../../api/exam';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ActionButton, SignUpButton } from '../../../common/Button';
import { CreateCategoryForm, ProfileDialog } from '../../../common/Dialog';
import Dropdown from '../../../common/Dropdown';
import useDebounce from '../../../common/hooks/useDebounce';
import { OriginInput } from '../../../common/Input';
import { SuggestInput } from '../../../common/Input';
import { TiExportOutline } from 'react-icons/ti';
import NavTab from '../../../common/NavTab';
import Pagination from '../../../common/Pagination';
import { ActionsCategory, CategoryColor, CategoryContent, CategoryItem, CategoryList } from '../../../common/Styles';
import Table from '../../../common/Table';
import ToolTip from '../../../common/ToolTip';
import { addNewCategory, updateCategoryListById } from '../../../features/category/categorySlice';
import { selectUser, updateUser } from '../../../features/user/userSlice';
import { EmptyListAction, Wrapper } from '../../../styles/Utils';
import { convertNumberFormat, formatCreatedAt, GameUtils, getObjectKeysChanged } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import NoDataToShow from '../../NoDataToShow';
import {
  Actions,
  BlockContent,
  BlockFilter,
  ButtonActions,
  Container,
  Content,
  CreateCategoryBlock,
  ExamBlock,
  MoreInfo,
  MoreInfoItem,
  NoExam,
  PaginationWrap,
  ProfileHeader,
  ProfileQuizAvatar,
  ProfileQuizContent,
  ProfileQuizDetails,
  ProfileQuizItem,
  ProfileQuizList,
  ProfileQuizName,
  ProfileQuizTime,
  StudentResult,
  UserAvatar,
  UserDetail,
  UserEmail,
  UserName,
  UserProfile,
} from './ProfileStyles';
import { CSVLink } from 'react-csv';
import { updateUserDetail } from '../../../api/authentication';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isShowEditDialog, setIsShowEditDialog] = useState(false);
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | undefined>(undefined);

  const [examList, setExamList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [originExamList, setOriginExamList] = useState<any[]>([]);
  const [originCategoryList, setOriginCategoryList] = useState<any[]>([]);

  const [examFilter, setExamFilter] = useState({
    search: '',
    categoryName: '',
    currentPage: QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage,
  });
  const [categoryFilter, setCategoryFilter] = useState({
    search: '',
    currentPage: QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage,
  });
  const [searchExamInStudent, setSearchExamInStudent] = useState('');

  const debouncedExamValue = useDebounce<string>(examFilter.search, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);
  const debouncedCategoryValue = useDebounce<string>(categoryFilter.search, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);
  const initialValues = useMemo(() => {
    if (editCategoryId) {
      const editCategoryIndex = categoryList.findIndex((category) => category.id === editCategoryId);
      const editCategory = categoryList[editCategoryIndex];

      return {
        categoryName: editCategory.name,
        categoryNote: editCategory.note,
        categoryBg: editCategory.color,
      };
    }

    return { categoryName: '', categoryBg: '#9852f9', categoryNote: '' };
  }, [editCategoryId]);

  const handleEditProfile = async (values: any) => {
    const editableInfo = { nameTitle: user.nameTitle, name: user.name };
    const updatedObj = getObjectKeysChanged(editableInfo, values);

    if (updatedObj.isUpdated) {
      const response = await updateUserDetail(updatedObj.data);

      if (response.isSuccess) {
        dispatch(updateUser({ ...user, ...updatedObj.data }));
      }
    }
  };

  const handleCreateNewExam = () => {
    navigate('/create-quiz');
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
    const editCategoryIndex = categoryList.findIndex((category) => category.id === editCategoryId) || 0;
    const updatedCategory = { ...categoryList[editCategoryIndex] };
    const changedKeys = getObjectKeysChanged(updatedCategory, { ...values, id: editCategoryId });

    if (changedKeys.isUpdated === false || editCategoryId === undefined) return;
    setCategoryList((prev) =>
      prev.map((category) => (category.id === editCategoryId ? { ...updatedCategory, ...changedKeys.data } : category)),
    );

    const response = await updateCategory(changedKeys.data, editCategoryId);
    dispatch(updateCategoryListById({ ...updatedCategory, ...changedKeys.data }));
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchExams = async () => {
      const response = await getExamsByUserId();

      if (response?.data && isSubscribed) {
        setExamList(response.data);
        setOriginExamList(response.data);
      }
    };

    const fetchCategoryList = async () => {
      const response = await getCategoryOfUser();

      if (response.isSuccess) {
        const responseList = response.data.map((item: any): any => ({
          id: item.id,
          name: item.name,
          note: item.note,
          color: item.color,
        }));

        if (isSubscribed) {
          setCategoryList(responseList);
          setOriginCategoryList(responseList);
          setExamFilter((prev) => ({ ...prev, categoryName: responseList[0].name }));
        }
      }
    };

    if (user.id) {
      fetchExams();
      fetchCategoryList();
    }

    return () => {
      isSubscribed = false;
    };
  }, [user.id]);

  useEffect(() => {
    setExamList(() => {
      let newExamList = originExamList.filter(
        (exam) => exam.category.name.toLowerCase() === examFilter.categoryName.toLowerCase(),
      );

      if (debouncedExamValue) {
        const regex = new RegExp(debouncedExamValue, 'gi');
        newExamList = originExamList.filter((exam) => regex.test(exam.name));
      }

      return newExamList.slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedExamValue, examFilter.categoryName]);

  useEffect(() => {
    const startIndex = (examFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setExamList(() => originExamList.slice(startIndex, endIndex));
  }, [examFilter.currentPage]);

  useEffect(() => {
    setCategoryList(() => {
      if (debouncedCategoryValue === '') {
        return originCategoryList;
      }

      const regex = new RegExp(debouncedCategoryValue, 'gi');
      return originCategoryList
        .filter((category) => regex.test(category.name))
        .slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedCategoryValue]);

  useEffect(() => {
    const startIndex = (categoryFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setCategoryList(() => originCategoryList.slice(startIndex, endIndex));
  }, [categoryFilter.currentPage]);

  if (user.id === '') {
    return <>loading...</>;
  }

  return (
    <Container>
      <Wrapper>
        {/* start dialogs */}
        {isShowEditDialog && (
          <ProfileDialog
            title="Edit Profile"
            applyButtonContent="Save Changed"
            initialValues={{ name: user.name, nameTitle: user.nameTitle }}
            handleCancelDialog={() => setIsShowEditDialog(false)}
            handleApplyDialog={handleEditProfile}
            handleCloseDialog={() => setIsShowEditDialog(false)}
          />
        )}
        {/* end dialogs */}
        <Content>
          <ProfileHeader>
            <UserProfile>
              <UserAvatar>
                <img
                  src="https://lh3.googleusercontent.com/a-/AFdZucrdbwb3FFVarH2n7n2AMaXpHYdR2oExsH9wf-R6=s96-c?w=200&h=200"
                  alt=""
                />
              </UserAvatar>
              <UserDetail>
                <UserName>
                  {user.nameTitle} {user.name}
                </UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserDetail>
            </UserProfile>
            <Actions>
              <ButtonActions>
                <ToolTip content="Edit Profile">
                  <SignUpButton onClick={() => setIsShowEditDialog(true)}>
                    <BiEditAlt />
                    <span>Edit Profile</span>
                  </SignUpButton>
                </ToolTip>
              </ButtonActions>
              <MoreInfo>
                <MoreInfoItem>
                  <h5>{examList.length}</h5>
                  <span>EXAMS</span>
                </MoreInfoItem>
                <MoreInfoItem>
                  <h5>{categoryList.length}</h5>
                  <span>CATEGORIES</span>
                </MoreInfoItem>
              </MoreInfo>
            </Actions>
          </ProfileHeader>
          <NavTab tabList={['All Exam', 'All Category', 'Students']}>
            <ExamBlock>
              <BlockFilter>
                <OriginInput
                  type="search"
                  name="searchExam"
                  value={examFilter.search}
                  placeholder="Enter exam name..."
                  setValue={(value) => setExamFilter((prev) => ({ ...prev, search: value }))}
                />
                <Dropdown
                  id="category"
                  activeValue={examFilter.categoryName}
                  values={categoryList.map((item) => item.name)}
                  handleSelected={(value) => setExamFilter((prev) => ({ ...prev, categoryName: value }))}
                />
              </BlockFilter>
              <BlockContent>
                {originExamList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
                  <NoExam>
                    <EmptyListAction>
                      <SignUpButton onClick={handleCreateNewExam}>Create An Exam</SignUpButton>
                      <span>Don't have any exams!</span>
                    </EmptyListAction>
                  </NoExam>
                ) : (
                  <>
                    {examList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
                      <NoDataToShow message="No exams to show!" />
                    ) : (
                      <ProfileQuizList>
                        {examList.map((exam) => (
                          <ProfileQuizItem key={exam.id}>
                            <ProfileQuizAvatar>
                              <img
                                src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=600&h=600"
                                alt=""
                              />
                            </ProfileQuizAvatar>
                            <ProfileQuizContent>
                              <ProfileQuizName>
                                <Link to={`/exams/${exam.id}`}>{exam.name}</Link>
                              </ProfileQuizName>
                              <ProfileQuizDetails>
                                <div>
                                  <MdOutlineMenuOpen />
                                  <span>{convertNumberFormat(exam.totalQuestions)} Questions</span>
                                </div>
                                <div>
                                  <BiCategory />
                                  <span>{exam.category.name}</span>
                                </div>
                              </ProfileQuizDetails>
                              <ProfileQuizTime>
                                <AiOutlineClockCircle />
                                <span>{formatCreatedAt(exam.createdAt / 1000)}</span>
                              </ProfileQuizTime>
                            </ProfileQuizContent>
                          </ProfileQuizItem>
                        ))}
                      </ProfileQuizList>
                    )}
                  </>
                )}

                {originExamList.length > QUIZ_APP_CONSTANTS.COMMON.itemsPerPage && (
                  <PaginationWrap>
                    <Pagination
                      pageSize={QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize}
                      totalPage={Math.ceil(originExamList.length / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize)}
                      currentPage={examFilter.currentPage}
                      totalElement={originExamList.length}
                      onNext={() => setExamFilter((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      onPrev={() => setExamFilter((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    />
                  </PaginationWrap>
                )}
              </BlockContent>
            </ExamBlock>
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
              <BlockFilter>
                <OriginInput
                  type="search"
                  name="searchCategory"
                  value={categoryFilter.search}
                  placeholder="Enter category name..."
                  setValue={(value) => setCategoryFilter((prev) => ({ ...prev, search: value }))}
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
              <BlockContent>
                {categoryList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
                  <NoDataToShow message="No exams to show!" />
                ) : (
                  <CategoryList>
                    {categoryList.map((item) => (
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
                      totalPage={Math.ceil(originExamList.length / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize)}
                      currentPage={examFilter.currentPage}
                      totalElement={originExamList.length}
                      onNext={() => setExamFilter((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      onPrev={() => setExamFilter((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    />
                  </PaginationWrap>
                )}
              </BlockContent>
            </ExamBlock>
            <ExamBlock>
              <BlockFilter noWrap={true}>
                <SuggestInput
                  name="searchExamInStudent"
                  placeholder="Enter your exam..."
                  suggestList={originExamList.map((exam) => exam.name)}
                  setValue={(value) => setSearchExamInStudent(value)}
                />
                <span>
                  <CSVLink
                    data={[
                      { id: '1', name: 'Nguyen Tan Pil', score: 0.7 * 10, time: GameUtils.getFormattedTime(6 * 1000) },
                    ]}
                    headers={[
                      { label: 'Id', key: 'id' },
                      { label: 'Name', key: 'name' },
                      { label: 'Score', key: 'score' },
                      { label: 'Time', key: 'time' },
                    ]}
                    filename="student.csv"
                  >
                    <ToolTip content="Export csv file">
                      <SignUpButton disabled={searchExamInStudent === ''}>
                        <TiExportOutline />
                      </SignUpButton>
                    </ToolTip>
                  </CSVLink>
                </span>
              </BlockFilter>
              <StudentResult>
                {searchExamInStudent === '' ? (
                  <NoDataToShow message="No students to show!" />
                ) : (
                  <Table
                    rowData={[
                      { id: '1', name: 'Nguyen Tan Pil', score: 0.7 * 10, time: GameUtils.getFormattedTime(6 * 1000) },
                    ]}
                    columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'score' }, { field: 'time' }]}
                    widthArr={[10, 40, 25, 25]}
                  />
                )}
              </StudentResult>
            </ExamBlock>
          </NavTab>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Profile;
