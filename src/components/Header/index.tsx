import React from 'react';
import { NoBorderButton, SignUpButton } from '../../common/Button';
import Dropdown from '../../common/Dropdown';
import { Wrapper } from '../../styles/Utils';
import {
  Container,
  Content,
  LeftSide,
  Logo,
  NavItem,
  NavList,
  RightSide,
} from './HeaderStyles';

const Header = () => {
  return (
    <Container>
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
          </RightSide>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Header;
