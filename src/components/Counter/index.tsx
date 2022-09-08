import React, { useEffect, useState } from 'react';
import { GameUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Container, RemainingTime, TimeIcon } from './CounterStyles';

type Props = {
  isPause: boolean;
  time: number;
  handleCompletedTest: () => void;
};

const Counter = ({ isPause, time, handleCompletedTest }: Props) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (seconds === QUIZ_APP_CONSTANTS.GAME.endTime) {
      return;
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
    if (seconds === QUIZ_APP_CONSTANTS.GAME.endTime) {
      handleCompletedTest();
    }
  }, [seconds]);

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
