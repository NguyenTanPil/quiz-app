import React from 'react';
import { SignUpButton } from '../../common/Button';
import { SectionTitle, WrapperSection } from '../../styles/Utils';
import { CenterBlock, Container } from './GetStartedFooterStyles';
import gettingStartBanner from '../../images/gettingStartBanner.png';
import { useNavigate } from 'react-router-dom';

const GetStartedFooter = () => {
  const navigate = useNavigate();

  return (
    <WrapperSection>
      <Container url={gettingStartBanner}>
        <CenterBlock>
          <SectionTitle onClick={() => navigate('/search')}>Ready for meaningful engagement?</SectionTitle>
          <SignUpButton>Get Started</SignUpButton>
        </CenterBlock>
      </Container>
    </WrapperSection>
  );
};

export default GetStartedFooter;
