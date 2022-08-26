import React from 'react';
import { Container, TBody, TCell, THead, TRow } from './TableStyles';

type Props = {
  widthArr: number[];
};

const Table = ({ widthArr }: Props) => {
  return (
    <Container widthArr={widthArr}>
      <THead>
        <TCell>No</TCell>
        <TCell>name</TCell>
        <TCell>Score</TCell>
        <TCell>Time</TCell>
      </THead>
      <TBody>
        <TRow>
          <TCell>1</TCell>
          <TCell>Nguyen Tan Pil</TCell>
          <TCell>90</TCell>
          <TCell>12:17</TCell>
        </TRow>
        <TRow>
          <TCell>2</TCell>
          <TCell>Nguyen Tan Dong</TCell>
          <TCell>80</TCell>
          <TCell>2:17</TCell>
        </TRow>
      </TBody>
    </Container>
  );
};

export default Table;
