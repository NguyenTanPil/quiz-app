import React from 'react';
import { ActionButton } from '../Button';
import ToolTip from '../ToolTip';
import { ActionCol, Container, TBody, TCell, THead, TRow } from './TableStyles';

type rowDataProps = {
  [key: string]: any;
};

type Props = {
  widthArr: number[];
  rowData: rowDataProps[];
  columnDefs: rowDataProps[];
  actions?: any[];
};

const Table = ({ rowData, columnDefs, widthArr, actions }: Props) => {
  return (
    <Container widthArr={widthArr}>
      <THead>
        {columnDefs.map((column) => (
          <TCell key={column.field} style={{ textTransform: 'capitalize' }}>
            {column.field}
          </TCell>
        ))}
        {actions && <TCell>Actions</TCell>}
      </THead>
      <TBody>
        {rowData.map((row: rowDataProps, idx) => (
          <TRow key={row.id}>
            {columnDefs.map((column) => (
              <TCell key={column.field + idx} data-label={column.field}>
                {row[column.field]}
              </TCell>
            ))}

            {actions && (
              <TCell data-label="action">
                <ActionCol>
                  {actions.map((action) => (
                    <ToolTip key={`${action.id}-action`} content={action.tooltip}>
                      <ActionButton onClick={() => action.onClick(row)}>{action.icon}</ActionButton>
                    </ToolTip>
                  ))}
                </ActionCol>
              </TCell>
            )}
          </TRow>
        ))}
      </TBody>
    </Container>
  );
};

export default Table;
