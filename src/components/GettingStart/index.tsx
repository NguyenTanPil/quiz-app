import React from 'react';
import { Wrapper } from '../../styles/Utils';
import { Container, ListStep, StepItem } from './GettingStartStyles';
import devicesImg from '../../images/devices.svg';
import addImg from '../../images/add.svg';
import feedbackImg from '../../images/feedback.svg';

const GettingStart = () => {
  return (
    <Wrapper>
      <Container>
        <h2>Getting started is free and easy</h2>
        <ListStep>
          <StepItem>
            <img src={addImg} alt="" />
            <h4>Add quiz and poll questions.</h4>
          </StepItem>
          <StepItem>
            <img src={devicesImg} alt="" />
            <h4>Participants engage from any device.</h4>
          </StepItem>
          <StepItem>
            <img src={feedbackImg} alt="" />
            <h4>Get instant feedback.</h4>
          </StepItem>
        </ListStep>
      </Container>
    </Wrapper>
  );
};

export default GettingStart;
