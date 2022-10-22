import React, { useState } from 'react';
import { BiBarChart } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { NoBorderButton, SignUpButton } from '../../common/Button';
import { JoinDialog } from '../../common/Dialog';
import { selectUser } from '../../features/user/userSlice';
import { Wrapper } from '../../styles/Utils';
import Sidebar from '../Sidebar';
import { Container, Content, HeaderAvatar, Logo, NavItem, NavList, ShowSidebarBox } from './HeaderStyles';

const Header = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowJoinDialog, setIsShowJoinDialog] = useState(false);
  const user = useAppSelector(selectUser);

  const handleJoinExam = (code: string) => {
    setIsShowJoinDialog(false);
  };

  return (
    <Container>
      {isShowJoinDialog && (
        <JoinDialog
          title="Join Exam"
          applyButtonContent="Join"
          handleCancelDialog={() => setIsShowJoinDialog(false)}
          handleApplyDialog={handleJoinExam}
          handleCloseDialog={() => setIsShowJoinDialog(false)}
        />
      )}

      <Sidebar
        isLogin={user.id !== ''}
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
        setIsShowJoinDialog={setIsShowJoinDialog}
      />
      <Wrapper>
        <Content>
          <Logo to="/">
            <span>Quizil</span>
          </Logo>
          <div>
            <NavList>
              <NavItem>
                <NavLink to="/exams/create-exam">
                  <NoBorderButton>Create Exam</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NoBorderButton onClick={() => setIsShowJoinDialog(true)}>Join now</NoBorderButton>
              </NavItem>
              <NavItem>
                <NavLink to="/">
                  <NoBorderButton>Academy</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/game">
                  <NoBorderButton>Start</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={user.id !== '' ? '/profile' : '/sign-in'}>
                  {user.id !== '' ? (
                    <HeaderAvatar>
                      <img
                        src="https://lh3.googleusercontent.com/a-/AFdZucrdbwb3FFVarH2n7n2AMaXpHYdR2oExsH9wf-R6=s96-c?w=200&h=200"
                        alt=""
                      />
                    </HeaderAvatar>
                  ) : (
                    <SignUpButton>Sign In</SignUpButton>
                  )}
                </NavLink>
              </NavItem>
            </NavList>
            <ShowSidebarBox onClick={() => setIsShowSidebar(true)}>
              <BiBarChart />
            </ShowSidebarBox>
          </div>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Header;
