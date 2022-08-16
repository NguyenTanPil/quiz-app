import React, { useState } from 'react';
import { NoBorderButton, SignUpButton } from '../../common/Button';
import Dropdown from '../../common/Dropdown';
import { Wrapper } from '../../styles/Utils';
import { BiBarChart } from 'react-icons/bi';
import Sidebar from '../Sidebar';
import {
  Container,
  Content,
  LeftSide,
  Logo,
  NavItem,
  NavList,
  RightSide,
  ShowSidebarBox,
} from './HeaderStyles';

const Header = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <Container>
      <Sidebar
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <Wrapper>
        <Content>
          <LeftSide>
            <Logo to="/">
              <span>Quizil</span>
            </Logo>
            <NavList>
              <NavItem>
                <NoBorderButton>Create Quiz</NoBorderButton>
              </NavItem>
              <NavItem>
                <NoBorderButton>Join now</NoBorderButton>
              </NavItem>
            </NavList>
          </LeftSide>
          <RightSide>
            <NavList>
              <NavItem>
                <Dropdown values={['English', 'Vietnamese']} />
              </NavItem>
              <NavItem>
                <SignUpButton>Sign Up</SignUpButton>
              </NavItem>
            </NavList>
            <ShowSidebarBox onClick={() => setIsShowSidebar(true)}>
              <BiBarChart />
            </ShowSidebarBox>
          </RightSide>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Header;
