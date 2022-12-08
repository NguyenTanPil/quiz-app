import React, { useEffect, useState } from 'react';
import { getResult } from '../../api/exam';
import { SignUpButton } from '../../common/Button';
import Table from '../../common/Table';
import { convertLocalTime, convertSecondsToMinutes, convertTimeStampToDate } from '../../utils';
import { LoadingFullPage } from '../Loading';
import { Container } from '../QuestionCard/QuestionCardStyles';
import { ResultTitle, TryAgain } from './GameResultStyles';

type GameResultProps = {
  setIsShowJoinDialog: (value: boolean) => void;
};

const GameResult = ({ setIsShowJoinDialog }: GameResultProps) => {
  const [resultList, setResultList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    const fetchResult = async () => {
      const response = await getResult();

      if (response.isSuccess && isSubscribed) {
        const data = response?.data.map((item: any) => ({
          ...item,
          restTime: convertSecondsToMinutes(item.restTime),
          submitDate: convertTimeStampToDate(convertLocalTime(item.submitDate)),
        }));
        setResultList(data);
        setIsLoading(false);
      }
    };

    fetchResult();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingFullPage />
      ) : (
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
            <SignUpButton disabled={resultList.length >= 1} onClick={() => setIsShowJoinDialog(true)}>
              Start
            </SignUpButton>
          </TryAgain>
        </Container>
      )}
    </>
  );
};

export default GameResult;
