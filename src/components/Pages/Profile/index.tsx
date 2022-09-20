import React, { useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCategory, BiEditAlt } from 'react-icons/bi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { SignUpButton } from '../../../common/Button';
import ProfileDialog from '../../../common/Dialog/ProfileDialog';
import ToolTip from '../../../common/ToolTip';
import { Wrapper } from '../../../styles/Utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import {
  Actions,
  ButtonActions,
  Container,
  Content,
  MoreInfo,
  MoreInfoItem,
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

const Profile = () => {
  const [isShowEditDialog, setIsShowEditDialog] = useState(false);
  const [nameTitle, setNameTitle] = useState(QUIZ_APP_CONSTANTS.NAME_TITLE.initNameTitle);
  const [userName, setUserName] = useState('Pil Nguyen');

  const handleEditProfile = (values: any) => {
    setNameTitle(values.nameTitle);
    setUserName(values.name);
  };

  return (
    <Container>
      <Wrapper>
        {/* start dialogs */}
        {isShowEditDialog && (
          <ProfileDialog
            title="Edit Profile"
            applyButtonContent="Save Changed"
            initialValues={{ name: userName, nameTitle: nameTitle }}
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
                  {nameTitle} {userName}
                </UserName>
                <UserEmail>tanpil@gmail.com</UserEmail>
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
                  <h5>4</h5>
                  <span>QUIZZES</span>
                </MoreInfoItem>
                <MoreInfoItem>
                  <h5>0</h5>
                  <span>COLLECTIONS</span>
                </MoreInfoItem>
              </MoreInfo>
            </Actions>
          </ProfileHeader>
          <ProfileQuizList>
            <ProfileQuizItem>
              <ProfileQuizAvatar>
                <img src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=600&h=600" alt="" />
              </ProfileQuizAvatar>
              <ProfileQuizContent>
                <ProfileQuizName>Quiz Name 2</ProfileQuizName>
                <ProfileQuizDetails>
                  <div>
                    <MdOutlineMenuOpen />
                    <span>09 Quizzes</span>
                  </div>
                  <div>
                    <BiCategory />
                    <span>Data Science</span>
                  </div>
                </ProfileQuizDetails>
                <ProfileQuizTime>
                  <AiOutlineClockCircle />
                  <span>04 month ago</span>
                </ProfileQuizTime>
              </ProfileQuizContent>
            </ProfileQuizItem>
            <ProfileQuizItem>
              <ProfileQuizAvatar>
                <img src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=600&h=600" alt="" />
              </ProfileQuizAvatar>
              <ProfileQuizContent>
                <ProfileQuizName>Quiz Name 1</ProfileQuizName>
                <ProfileQuizDetails>
                  <div>
                    <MdOutlineMenuOpen />
                    <span>12 Quizzes</span>
                  </div>
                  <div>
                    <BiCategory />
                    <span>Computer Science</span>
                  </div>
                </ProfileQuizDetails>
                <ProfileQuizTime>
                  <AiOutlineClockCircle />
                  <span>01 month ago</span>
                </ProfileQuizTime>
              </ProfileQuizContent>
            </ProfileQuizItem>
          </ProfileQuizList>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Profile;
