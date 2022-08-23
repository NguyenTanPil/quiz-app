import React from 'react';
import { SignUpButton } from '../../common/Button';
import { SectionTitle, WrapperSection } from '../../styles/Utils';
import { CenterBlock, Container } from './GetStartedFooterStyles';

const GetStartedFooter = () => {
  return (
    <WrapperSection>
      <Container>
        <CenterBlock>
          <SectionTitle>Ready for meaningful engagement?</SectionTitle>
          <SignUpButton>Get Started</SignUpButton>
        </CenterBlock>
      </Container>
    </WrapperSection>
  );
};

export default GetStartedFooter;
