import React, { useState } from 'react';
import { BiBarChart } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { NoBorderButton, SignUpButton } from '../../common/Button';
import { Wrapper } from '../../styles/Utils';
import Sidebar from '../Sidebar';
import { Container, Content, Logo, NavItem, NavList, ShowSidebarBox } from './HeaderStyles';

const Header = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <Container>
      <Sidebar isShowSidebar={isShowSidebar} setIsShowSidebar={setIsShowSidebar} />
      <Wrapper>
        <Content>
          <Logo to="/">
            <span>Quizil</span>
          </Logo>
          <div>
            <NavList>
              <NavItem>
                <NavLink to="/create-quiz">
                  <NoBorderButton>Create Quiz</NoBorderButton>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/">
                  <NoBorderButton>Join now</NoBorderButton>
                </NavLink>
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
                <NavLink to="/sign-in">
                  <SignUpButton>Sign In</SignUpButton>
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
