import React from 'react';
import Table from '../../common/Table';
import { GameUtils } from '../../utils';
import { Container } from '../QuestionCard/QuestionCardStyles';
import { ResultTitle } from './GameResultStyles';

const GameResult = () => {
  return (
    <Container>
      <ResultTitle>
        <h3>Your Score</h3>
      </ResultTitle>
      <Table
        rowData={[{ id: '1', name: 'Nguyen Tan Pil', score: 0.7 * 10, time: GameUtils.getFormattedTime(6 * 1000) }]}
        columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'score' }]}
        widthArr={[10, 40, 50]}
      />
    </Container>
  );
};

export default GameResult;
