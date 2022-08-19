import React from 'react';
import { SignUpButton } from '../../common/Button';
import { SectionTitle } from '../../styles/Utils';
import { CenterBlock, Container, SideBlock } from './GetStartedFooterStyles';

const GetStartedFooter = () => {
  return (
    <Container>
      <SideBlock>
        <img
          src="https://cf.quizizz.com/img/mkt/7-CTA_SECTION-Left.png"
          alt=""
        />
      </SideBlock>
      <CenterBlock>
        <SectionTitle>Ready for meaningful engagement?</SectionTitle>
        <SignUpButton>Get Started</SignUpButton>
      </CenterBlock>
      <SideBlock>
        <img
          src="https://cf.quizizz.com/img/mkt/7-CTA_SECTION-Right.png"
          alt=""
        />
      </SideBlock>
    </Container>
  );
};

export default GetStartedFooter;
