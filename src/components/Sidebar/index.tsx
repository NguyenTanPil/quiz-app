import React, { useRef } from 'react';
import { Container, Content, Header, ListLink } from './SidebarStyles';
import { CgPushChevronRight } from 'react-icons/cg';
import { NoBorderButton } from '../../common/Button';
import { NavLink } from 'react-router-dom';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';

type SideBarProps = {
  isLogin: boolean;
  isShowSidebar: boolean;
  setIsShowSidebar: (value: boolean) => void;
  setIsShowJoinDialog: (value: boolean) => void;
};

const Sidebar = ({ isLogin, isShowSidebar, setIsShowSidebar, setIsShowJoinDialog }: SideBarProps) => {
  const contentRef = useRef<HTMLDivElement>();
  useOnClickOutside(contentRef, () => setIsShowSidebar(false));

  return (
    <Container isShow={isShowSidebar}>
      <Content ref={contentRef}>
        <Header>
          <NoBorderButton onClick={() => setIsShowSidebar(false)}>
            <CgPushChevronRight />
          </NoBorderButton>
        </Header>
        <ListLink>
          <li onClick={() => setIsShowSidebar(false)}>
            <NavLink to="/exams/create-exam">
              <span>Create Exam</span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setIsShowSidebar(false);
              setIsShowJoinDialog(true);
            }}
          >
            <span>Join now</span>
          </li>
          <li onClick={() => setIsShowSidebar(false)}>
            <NavLink to="/">
              <span>Academy</span>
            </NavLink>
          </li>
          <li onClick={() => setIsShowSidebar(false)}>
            <NavLink to="/game">
              <span>Start</span>
            </NavLink>
          </li>
          <li onClick={() => setIsShowSidebar(false)}>
            <NavLink to={isLogin ? '/profile' : '/sign-in'}>
              <span>{isLogin ? 'Profile' : 'Sign in'}</span>
            </NavLink>
          </li>
        </ListLink>
      </Content>
    </Container>
  );
};

export default Sidebar;
