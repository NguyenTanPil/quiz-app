import React from 'react';
import Table from '../../common/Table';
import { Container } from '../QuestionCard/QuestionCardStyles';
import { ResultTitle } from './GameResultStyles';

const GameResult = () => {
  return (
    <Container>
      <ResultTitle>
        <h3>Your Score</h3>
      </ResultTitle>
      <Table widthArr={[10, 40, 25, 25]} />
    </Container>
  );
};

export default GameResult;
