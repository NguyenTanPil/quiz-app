import React, { useEffect, useState } from 'react';
import { Container, RemainingTime, TimeIcon } from './CounterStyles';

const getFormattedTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsFormatted = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutesFormatted}:${secondsFormatted}`;
};

const Counter = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return (
    <Container>
      <TimeIcon seconds={seconds} />
      <RemainingTime seconds={seconds}>{getFormattedTime(seconds)}</RemainingTime>
    </Container>
  );
};

export default Counter;
