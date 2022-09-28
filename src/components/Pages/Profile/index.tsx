import React, { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCategory, BiEditAlt } from 'react-icons/bi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../../api/authentication';
import { getExamsByUserId } from '../../../api/exam';
import { SignUpButton } from '../../../common/Button';
import ProfileDialog from '../../../common/Dialog/ProfileDialog';
import ToolTip from '../../../common/ToolTip';
import { EmptyListAction, Wrapper } from '../../../styles/Utils';
import { convertNumberFormat, formatCreatedAt, getObjectKeysChanged } from '../../../utils';
import { Exam } from '../../../utils/types';
import {
  Actions,
  ButtonActions,
  Container,
  Content,
  MoreInfo,
  MoreInfoItem,
  NoExam,
  ProfileHeader,
  ProfileQuizAvatar,
  ProfileQuizContent,
  ProfileQuizDetails,
  ProfileQuizItem,
  ProfileQuizList,
  ProfileQuizName,
  ProfileQuizTime,
  UserAvatar,
  UserDetail,
  UserEmail,
  UserName,
  UserProfile,
} from './ProfileStyles';

type Props = {
  [key: string]: any;
};

const Profile = ({ isLogin, user, setUser }: Props) => {
  const [isShowEditDialog, setIsShowEditDialog] = useState(false);
  const [examList, setExamList] = useState<Exam[]>([]);
  const navigate = useNavigate();

  const handleEditProfile = (values: any) => {
    const editableInfo = { nameTitle: user.nameTitle, name: user.name };

    const updatedObj = getObjectKeysChanged(editableInfo, values);

    if (updatedObj.isUpdated) {
      updateUser(user.userId, updatedObj.data);
      setUser({ ...user, ...values });
    }
  };

  const handleCreateNewExam = () => {
    navigate('/create-quiz');
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchExams = async () => {
      const exams = await getExamsByUserId(user.id);

      if (isSubscribed) {
        setExamList(exams);
      }
    };

    if (user) {
      fetchExams();
    }

    return () => {
      isSubscribed = false;
    };
  }, [isLogin]);

  if (!examList || !isLogin) {
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
                  <span>QUIZZES</span>
                </MoreInfoItem>
                <MoreInfoItem>
                  <h5>0</h5>
                  <span>COLLECTIONS</span>
                </MoreInfoItem>
              </MoreInfo>
            </Actions>
          </ProfileHeader>
          {examList.length === 0 ? (
            <NoExam>
              <EmptyListAction>
                <SignUpButton onClick={handleCreateNewExam}>Create An Exam</SignUpButton>
                <span>Don't have any exams!</span>
              </EmptyListAction>
            </NoExam>
          ) : (
            <ProfileQuizList>
              {examList.map((exam) => (
                <ProfileQuizItem key={exam.id}>
                  <ProfileQuizAvatar>
                    <img src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=600&h=600" alt="" />
                  </ProfileQuizAvatar>
                  <ProfileQuizContent>
                    <ProfileQuizName>
                      <Link to={`/exams/${exam.id}`}>{exam.name}</Link>
                    </ProfileQuizName>
                    <ProfileQuizDetails>
                      <div>
                        <MdOutlineMenuOpen />
                        <span>{convertNumberFormat(exam.totalQuestions)} Quizzes</span>
                      </div>
                      <div>
                        <BiCategory />
                        <span>{exam.categoryId}</span>
                      </div>
                    </ProfileQuizDetails>
                    <ProfileQuizTime>
                      <AiOutlineClockCircle />
                      <span>{formatCreatedAt(exam.createdAt)}</span>
                    </ProfileQuizTime>
                  </ProfileQuizContent>
                </ProfileQuizItem>
              ))}
            </ProfileQuizList>
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Profile;
