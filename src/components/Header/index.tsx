import React from 'react';
import { Button } from '../../common/Button';
import { TOTAL_QUESTIONS } from '../../utils/constants';
import { Container, LoadingContainer, Score } from './HeaderStyles';

type Props = {
  gameOver: boolean;
  userAnswers: any;
  loading: boolean;
  score: number;
  startGame: any;
};

const Header: React.FC<Props> = ({
  gameOver,
  userAnswers,
  loading,
  score,
  startGame,
}) => {
  return (
    <Container>
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <Button onClick={startGame}>Start</Button>
      )}
      {!gameOver && <Score>Score: {score}</Score>}
      {loading && <LoadingContainer>Loading Question...</LoadingContainer>}
    </Container>
  );
};

export default Header;
