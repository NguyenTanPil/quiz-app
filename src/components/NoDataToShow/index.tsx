import React from 'react';
import { MdNotInterested } from 'react-icons/md';
import { Container } from './NoDataToShowStyles';

type NoDataToShowProps = {
  message: string;
};

const NoDataToShow = ({ message }: NoDataToShowProps) => {
  return (
    <Container>
      <MdNotInterested />
      <p>{message}</p>
    </Container>
  );
};

export default NoDataToShow;
