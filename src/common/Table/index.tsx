import React from 'react';
import { Container, TBody, TCell, THead, TRow } from './TableStyles';

type rowDataProps = {
  [key: string]: any;
};

type Props = {
  widthArr: number[];
  rowData: rowDataProps[];
  columnDefs: rowDataProps[];
};

const Table = ({ rowData, columnDefs, widthArr }: Props) => {
  return (
    <Container widthArr={widthArr}>
      <THead>
        {columnDefs.map((column) => (
          <TCell key={column.field}>{column.field}</TCell>
        ))}
      </THead>
      <TBody>
        {rowData.map((row: rowDataProps, idx) => (
          <TRow key={idx}>
            {columnDefs.map((column) => (
              <TCell key={column.field + idx} data-label={column.field}>
                {row[column.field]}
              </TCell>
            ))}
          </TRow>
        ))}
      </TBody>
    </Container>
  );
};

export default Table;
