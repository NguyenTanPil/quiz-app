import React, { useState } from 'react';
import { BiBarChart } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NoBorderButton, SignUpButton } from '../../common/Button';
import { JoinDialog } from '../../common/Dialog';
import { resetUser, selectUser } from '../../features/user/userSlice';
import { Wrapper } from '../../styles/Utils';
import Sidebar from '../Sidebar';
import { Container, Content, HeaderAvatar, Logo, NavItem, NavList, ShowSidebarBox } from './HeaderStyles';

const Header = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowJoinDialog, setIsShowJoinDialog] = useState(false);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleJoinExam = (code: string) => {
    setIsShowJoinDialog(false);
    navigate(`/game/5c4b715a-095f-47dc-b3d7-726aaa4d0054`);
  };

  const handleSignOut = () => {
    dispatch(resetUser());
    navigate('/sign-in');
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
                <NavLink to="/search">
                  <NoBorderButton>Search Class</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NoBorderButton onClick={() => setIsShowJoinDialog(true)}>Join now</NoBorderButton>
              </NavItem>
              <NavItem>
                <NavLink to="/class/create-class">
                  <NoBorderButton>Academy</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/sign-in">
                  <NoBorderButton>Start</NoBorderButton>
                </NavLink>
              </NavItem>
              {user.id !== '' && (
                <NavItem>
                  <SignUpButton onClick={handleSignOut}>Sign Out</SignUpButton>
                </NavItem>
              )}

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
