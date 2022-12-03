import React, { useEffect, useMemo, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { updateUserDetail } from '../../../api/authentication';
import { createCategory, getCategoryOfUser, updateCategory } from '../../../api/category';
import { createClass, getClassesByUserId, updateClass } from '../../../api/class';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { SignUpButton } from '../../../common/Button';
import { ProfileDialog } from '../../../common/Dialog';
import useDebounce from '../../../common/hooks/useDebounce';
import NavTab from '../../../common/NavTab';
import ToolTip from '../../../common/ToolTip';
import { addNewCategory, selectCategoryList, updateCategoryListById } from '../../../features/category/categorySlice';
import { selectUser, updateUser } from '../../../features/user/userSlice';
import { Wrapper } from '../../../styles/Utils';
import { getObjectKeysChanged } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { getCookie, setCookie } from '../../../utils/cookie';
import { LoadingFullPage } from '../../Loading';
import AllCategoryBlock from './AllCategoryBlock';
import AllExamBlock from './AllExamBlock';
import { classData } from './dummyData';
import {
  Actions,
  ButtonActions,
  Container,
  Content,
  MoreInfo,
  MoreInfoItem,
  ProfileHeader,
  UserAvatar,
  UserDetail,
  UserEmail,
  UserName,
  UserProfile,
} from './ProfileStyles';
import ReportBlock from './ReportBlock';
import StudentBlock from './StudentBlock';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategoryList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(QUIZ_APP_CONSTANTS.PROFILE.tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowEditDialog, setIsShowEditDialog] = useState(false);
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [isCreateClass, setIsCreateClass] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<string | undefined>(undefined);
  const [editClassId, setEditClassId] = useState<string | undefined>(undefined);

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  const [originExamList, setOriginExamList] = useState<any[]>([]);
  const [originCategoryList, setOriginCategoryList] = useState<any[]>([]);
  const [originClassList, setOriginClassList] = useState<any[]>([]);

  const [categoryFilter, setCategoryFilter] = useState({
    search: '',
    currentPage: QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage,
  });
  const [classFilter, setClassFilter] = useState({
    search: '',
    currentPage: QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage,
  });
  const [searchExamInStudent, setSearchExamInStudent] = useState('');

  const debouncedCategoryValue = useDebounce<string>(categoryFilter.search, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);
  const debouncedClassValue = useDebounce<string>(classFilter.search, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);
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
  const initialValuesForClass = useMemo(() => {
    if (editClassId) {
      const editClassIndex = classList.findIndex((item) => item.id === editClassId);
      const editClass = classList[editClassIndex];

      return {
        categoryName: editClass.name,
        categoryNote: editClass.note,
        categoryBg: editClass.color,
      };
    }

    return { categoryName: '', categoryBg: '#9852f9', categoryNote: '' };
  }, [editClassId]);

  const handleEditProfile = async (values: any) => {
    const editableInfo = { nameTitle: user.nameTitle, name: user.name };
    const updatedObj = getObjectKeysChanged(editableInfo, values);

    if (updatedObj.isUpdated) {
      const response = await updateUserDetail(updatedObj.data);

      if (response.isSuccess) {
        const token = getCookie('token');
        dispatch(updateUser({ ...user, ...updatedObj.data }));
        setCookie({ data: { ...user, ...updatedObj.data }, cookieName: 'user', time: 60 * 60 * 2 });
        setCookie({ data: token, cookieName: 'token', time: 60 * 60 * 2 });
      }
    }
  };

  const tempCreate = () => {
    setActiveTab('All Class');
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

  const handleCreateNewClass = async (values: any) => {
    const response = await createClass({
      name: values.name,
      note: values.note,
      color: values.color,
    });

    if (response.isSuccess) {
      const { id, name, note, color } = response.data;
      const newClass = { id, name, note, color };

      setClassList((prev) => [...prev, newClass]);
      setOriginClassList((prev) => [...prev, newClass]);
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

  const handleUpdateClass = async (values: any) => {
    const editClassIndex = classList.findIndex((item) => item.id === editClassId) || 0;
    const updatedClass = { ...classList[editClassIndex] };
    const changedKeys = getObjectKeysChanged(updatedClass, { ...values, id: editClassId });

    if (changedKeys.isUpdated === false || editClassId === undefined) return;

    const response = await updateClass(changedKeys.data, editClassId);
    if (response.isSuccess) {
      setClassList((prev) =>
        prev.map((item) => (item.id === editClassId ? { ...updatedClass, ...changedKeys.data } : item)),
      );
      setOriginClassList((prev) =>
        prev.map((item) => (item.id === editClassId ? { ...updatedClass, ...changedKeys.data } : item)),
      );
    }
    // dispatch(updateCategoryListById({ ...updatedCategory, ...changedKeys.data }));
  };

  useEffect(() => {
    setOriginCategoryList(categories);
  }, [categories]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchClasses = async () => {
      const response = await getClassesByUserId();

      if (response?.data && isSubscribed) {
        setClassList(response.data);
        setOriginClassList(response.data);
        setIsLoading(false);
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
        }
      }
    };

    if (user.id) {
      fetchClasses();
      fetchCategoryList();
    }

    return () => {
      isSubscribed = false;
    };
  }, [user.id]);

  useEffect(() => {
    setCategoryList(() => {
      if (debouncedCategoryValue === '') {
        return originCategoryList;
      }

      const regex = new RegExp(debouncedCategoryValue, 'gi');
      return originCategoryList
        .filter((category) => category.name.match(regex))
        .slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedCategoryValue]);

  useEffect(() => {
    setClassList(() => {
      if (debouncedClassValue === '') {
        return originClassList;
      }

      const regex = new RegExp(debouncedClassValue, 'gi');
      return originClassList
        .filter((item) => item.name.match(regex))
        .slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedClassValue]);

  useEffect(() => {
    const startIndex = (categoryFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setCategoryList(() => originCategoryList.slice(startIndex, endIndex));
  }, [categoryFilter.currentPage]);

  useEffect(() => {
    const startIndex = (classFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setCategoryList(() => originClassList.slice(startIndex, endIndex));
  }, [classFilter.currentPage]);

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
        {isLoading && <LoadingFullPage />}
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
                  <h5>{originClassList.length}</h5>
                  <span>CLASSES</span>
                </MoreInfoItem>
                <MoreInfoItem>
                  <h5>{originCategoryList.length}</h5>
                  <span>CATEGORIES</span>
                </MoreInfoItem>
              </MoreInfo>
            </Actions>
          </ProfileHeader>
          <NavTab
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setEditCategoryId(undefined);
              setEditClassId(undefined);
              setActiveTab(tab);
            }}
            tabList={QUIZ_APP_CONSTANTS.PROFILE.getTabs(activeTab)}
          >
            <AllCategoryBlock
              createName="Class"
              isCreateCategory={isCreateClass}
              editCategoryId={editClassId}
              originCategoryList={originClassList}
              categoryFilter={classFilter}
              initialValues={initialValuesForClass}
              categoryList={classList}
              setIsCreateCategory={setIsCreateClass}
              setEditCategoryId={setEditClassId}
              setCategoryFilter={setClassFilter}
              handleUpdateCategory={handleUpdateClass}
              handleCreateNewCategory={handleCreateNewClass}
            />
            <AllCategoryBlock
              createName="Category"
              isCreateCategory={isCreateCategory}
              editCategoryId={editCategoryId}
              originCategoryList={originCategoryList}
              categoryFilter={categoryFilter}
              initialValues={initialValues}
              categoryList={categoryList}
              setIsCreateCategory={setIsCreateCategory}
              setEditCategoryId={setEditCategoryId}
              setCategoryFilter={setCategoryFilter}
              handleUpdateCategory={handleUpdateCategory}
              handleCreateNewCategory={handleCreateNewCategory}
            />

            <ReportBlock
              originExamList={originExamList}
              setSearchExamInStudent={setSearchExamInStudent}
              handleCreateNewClass={tempCreate}
              searchExamInStudent={searchExamInStudent}
              setActiveTab={setActiveTab}
            />
            <StudentBlock />
          </NavTab>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Profile;
