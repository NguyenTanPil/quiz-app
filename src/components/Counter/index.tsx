import React, { useEffect, useState } from 'react';
import { GameUtils } from '../../utils';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { Container, RemainingTime, TimeIcon } from './CounterStyles';

type Props = {
  isPause: boolean;
  time: number;
};

const Counter = ({ isPause, time }: Props) => {
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

  return (
    <Container>
      <TimeIcon seconds={seconds} />
      <RemainingTime seconds={seconds}>{GameUtils.getFormattedTime(seconds)}</RemainingTime>
    </Container>
  );
};

export default Counter;
