import React, { useEffect, useState } from 'react';
import { GameUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Container, RemainingTime, TimeIcon } from './CounterStyles';

type Props = {
  isPause: boolean;
  isStop: boolean;
  time: number;
  handleCompletedTest: () => void;
  setSpendTime: (seconds: number) => void;
};

const Counter = ({ isPause, isStop, time, handleCompletedTest, setSpendTime }: Props) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (isStop) {
      handleCompletedTest();
      return;
    }

    if (seconds === QUIZ_APP_CONSTANTS.GAME.endTime) {
      handleCompletedTest();
      return;
    }

    if (isPause) {
      setSpendTime(seconds);
    }

    const timer = setInterval(() => {
      if (!isPause) {
        setSeconds((prev) => prev - 1);
      }
    }, QUIZ_APP_CONSTANTS.COMMON.oneSecond);

    return () => {
      clearInterval(timer);
    };
  }, [isPause, seconds]);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  return (
    <Container>
      <TimeIcon seconds={seconds} />
      <RemainingTime seconds={seconds}>{GameUtils.getFormattedTime(seconds)}</RemainingTime>
    </Container>
  );
};

export default Counter;
