import React from 'react';
import { SignUpButton } from '../../common/Button';
import Table from '../../common/Table';
import { GameUtils } from '../../utils';
import { Container } from '../QuestionCard/QuestionCardStyles';
import { ResultTitle, TryAgain } from './GameResultStyles';

type GameResultProps = {
  result: any[];
  setIsStart: (value: boolean) => void;
};

const GameResult = ({ result, setIsStart }: GameResultProps) => {
  return (
    <Container>
      <ResultTitle>
        <h3>Your Score</h3>
      </ResultTitle>
      <Table
        rowData={result}
        columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'score' }, { field: 'time' }]}
        widthArr={[10, 40, 25, 25]}
      />
      <TryAgain>
        <SignUpButton onClick={() => setIsStart(true)}>Start</SignUpButton>
      </TryAgain>
    </Container>
  );
};

export default GameResult;
