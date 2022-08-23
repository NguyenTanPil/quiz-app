import React from 'react';
import { Container, LeftSide, RightSide } from './BannerStyles';
import banner from '../../images/banner.jpeg';
import { WrapperSection } from '../../styles/Utils';
import { SignUpButton } from '../../common/Button';

const Banner = () => {
  return (
    <WrapperSection>
      <Container>
        <LeftSide>
          <h1>A Community of online marketers.</h1>
          <p>
            Education and strategy for internet marketers to launch and scale marking and business campaigns online.
          </p>
          <SignUpButton>Take A Quiz</SignUpButton>
        </LeftSide>
        <RightSide>
          <img src={banner} alt="" />
        </RightSide>
      </Container>
    </WrapperSection>
  );
};

export default Banner;
