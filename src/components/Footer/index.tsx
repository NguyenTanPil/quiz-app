import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import { Wrapper } from '../../styles/Utils';
import { Logo } from '../Header/HeaderStyles';
import { Container, Content, FooterLinks, FooterInfo } from './FooterStyles';

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <FooterInfo>
            <Logo to="/">
              <span>Quizil</span>
            </Logo>
            <p>
              Education and strategy for internet marketers to launch and scale
              marking and business campaigns online.
            </p>
          </FooterInfo>
          <FooterLinks>
            <li>
              <Link to="/">The Quizil Blog</Link>
            </li>
            <li>
              <Link to="/">Teacher Resources</Link>
            </li>
            <li>
              <Link to="/">Help Center</Link>
            </li>
            <li>
              <Link to="/">Accessibility and Inclusion</Link>
            </li>
            <li>
              <Link to="/">Terms of Service</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
          </FooterLinks>
          <div>
            <Dropdown values={['English', 'Vietnamese']} />
          </div>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Footer;
