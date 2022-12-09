import React, { useRef } from 'react';
import { Container, Content, Header, ListLink } from './SidebarStyles';
import { CgPushChevronRight } from 'react-icons/cg';
import { NoBorderButton } from '../../common/Button';
import { NavLink } from 'react-router-dom';
import useOnClickOutside from '../../common/hooks/useOnClickOutside';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';

type SideBarProps = {
  isLogin: boolean;
  isShowSidebar: boolean;
  setIsShowSidebar: (value: boolean) => void;
  handleSignOut: () => void;
};

const Sidebar = ({ isLogin, isShowSidebar, setIsShowSidebar, handleSignOut }: SideBarProps) => {
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
            <NavLink to="/search">
              <span>Search Class</span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              setIsShowSidebar(false);
            }}
          >
            <NavLink to="/profile/create-class">
              <span>Create Class</span>
            </NavLink>
          </li>
          <li onClick={() => setIsShowSidebar(false)}>
            <NavLink to="/profile/create-category">
              <span>Create Category</span>
            </NavLink>
          </li>
          {isLogin && (
            <li onClick={() => setIsShowSidebar(false)}>
              <span onClick={handleSignOut}>Sign Out</span>
            </li>
          )}
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
