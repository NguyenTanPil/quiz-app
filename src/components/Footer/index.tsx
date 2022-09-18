import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import { Wrapper } from '../../styles/Utils';
import { Logo } from '../Header/HeaderStyles';
import {
  FooterBottom,
  Container,
  FooterBgOne,
  FooterTop,
  FooterBgTwo,
  FooterItem,
  CompanyWidget,
  ListLink,
  Language,
} from './FooterStyles';

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <FooterTop>
          <FooterItem>
            <CompanyWidget>
              <h3>Quizil</h3>
              <p>
                Education and strategy for internet marketers to launch and scale marking and business campaigns online.
              </p>
            </CompanyWidget>
          </FooterItem>
          <FooterItem>
            <ListLink>
              <li>
                <Link to="/">Company</Link>
              </li>
              <li>
                <Link to="/">Android App</Link>
              </li>
              <li>
                <Link to="/">IOS App</Link>
              </li>
              <li>
                <Link to="/">Desktop</Link>
              </li>
            </ListLink>
          </FooterItem>
          <FooterItem>
            <ListLink>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Term &amp; conditions</Link>
              </li>
              <li>
                <Link to="/">Reporting</Link>
              </li>
              <li>
                <Link to="/">Documentation</Link>
              </li>
            </ListLink>
          </FooterItem>
          <FooterItem>
            <Language>
              <Dropdown
                id="language"
                activeValue="English"
                values={['English', 'Vietnamese']}
                handleSelected={() => {}}
              />
            </Language>
          </FooterItem>
        </FooterTop>
      </Wrapper>
      <FooterBottom>
        <FooterBgOne />
        <FooterBgTwo />
      </FooterBottom>
    </Container>
  );
};

export default Footer;
