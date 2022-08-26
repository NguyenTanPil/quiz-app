import React from 'react';
import { SignUpButton } from '../../common/Button';
import { SectionTitle, WrapperSection } from '../../styles/Utils';
import { CenterBlock, Container } from './GetStartedFooterStyles';
import gettingStartBanner from '../../images/gettingStartBanner.png';

const GetStartedFooter = () => {
  return (
    <WrapperSection>
      <Container url={gettingStartBanner}>
        <CenterBlock>
          <SectionTitle>Ready for meaningful engagement?</SectionTitle>
          <SignUpButton>Get Started</SignUpButton>
        </CenterBlock>
      </Container>
    </WrapperSection>
  );
};

export default GetStartedFooter;
