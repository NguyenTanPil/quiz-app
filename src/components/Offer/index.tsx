import React from 'react';
import { TbDeviceAnalytics, TbFileCheck, TbZoomQuestion } from 'react-icons/tb';
import { SectionTitle, WrapperSection } from '../../styles/Utils';
import { Container, ListStep } from '../GettingStart/GettingStartStyles';
import { StepItem } from './OfferStyles';

const Offer = () => {
  return (
    <WrapperSection>
      <Container>
        <SectionTitle>What we offer</SectionTitle>
        <ListStep>
          <StepItem>
            <TbFileCheck />
            <h4>Live Tests</h4>
            <p>
              Register for the exam you want to Appear. You can Register in
              single click for the exam of your Choice from dashboard.
            </p>
          </StepItem>
          <StepItem>
            <TbZoomQuestion />
            <h4>High Yield Questions</h4>
            <p>
              Take live Tests on Time. You can take the missed test from
              dashboard. Live Exams link appears only when the exam is live.
            </p>
          </StepItem>
          <StepItem>
            <TbDeviceAnalytics />
            <h4>Insightful Analysis</h4>
            <p>
              Dashboard is true sense that helps you analyze your performance.
              Everything you do at one place. You real preparation pal.
            </p>
          </StepItem>
        </ListStep>
      </Container>
    </WrapperSection>
  );
};

export default Offer;
