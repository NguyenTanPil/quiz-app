import React, { useState } from 'react';
import { BiBarChart } from 'react-icons/bi';
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
                <NoBorderButton>Create Quiz</NoBorderButton>
              </NavItem>
              <NavItem>
                <NoBorderButton>Join now</NoBorderButton>
              </NavItem>
              <NavItem>
                <NoBorderButton>Academy</NoBorderButton>
              </NavItem>
              <NavItem>
                <NoBorderButton>Start</NoBorderButton>
              </NavItem>
              <NavItem>
                <SignUpButton>Sign Up</SignUpButton>
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
