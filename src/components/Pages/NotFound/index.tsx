import React from 'react';
import { Wrapper } from '../../../styles/Utils';
import { QuizOptions } from '../CreateExam/CreateExamStyles';
import { Container } from '../Search/SearchStyles';
import { NotFoundWrap } from './NotFoundStyles';
import notFoundImg from '../../../images/notFound.svg';

const NotFound = () => {
  return (
    <Container>
      <Wrapper>
        <QuizOptions>
          <NotFoundWrap>
            <img src={notFoundImg} alt="" />
          </NotFoundWrap>
        </QuizOptions>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
