import React, { useEffect, useState } from 'react';
import { getResult } from '../../api/exam';
import { SignUpButton } from '../../common/Button';
import Table from '../../common/Table';
import { GameUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Container } from '../QuestionCard/QuestionCardStyles';
import { ResultTitle, TryAgain } from './GameResultStyles';

type GameResultProps = {
  setIsStart: (value: boolean) => void;
};

const GameResult = ({ setIsStart }: GameResultProps) => {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchResult = async () => {
      const response = await getResult();

      if (response.isSuccess && isSubscribed) {
        setResultList(response?.data);
      }
    };

    fetchResult();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // if (resultList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container>
      <ResultTitle>
        <h3>Your Score</h3>
      </ResultTitle>
      {resultList.length !== 0 && (
        <Table
          rowData={resultList}
          columnDefs={[{ field: 'no' }, { field: 'submitDate' }, { field: 'score' }, { field: 'restTime' }]}
          widthArr={[10, 40, 25, 25]}
        />
      )}
      <TryAgain isEmpty={resultList.length === 0}>
        <SignUpButton onClick={() => setIsStart(true)}>Start</SignUpButton>
      </TryAgain>
    </Container>
  );
};

export default GameResult;
