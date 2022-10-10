import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { ActionButton } from '../Button';
import { Container, CurrentPage, PageSize, PaginationActions, RowCount } from './PaginationStyles';

type PaginationProps = {
  pageSize: number;
  totalPage: number;
  currentPage: number;
  totalElement: number;
  onNext: () => void;
  onPrev: () => void;
};

const Pagination = ({ pageSize, totalPage, currentPage, totalElement, onNext, onPrev }: PaginationProps) => {
  return (
    <Container>
      <PageSize>Size: {pageSize}</PageSize>
      <PaginationActions>
        <ActionButton disabled={currentPage === QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage} onClick={onPrev}>
          <MdNavigateBefore />
        </ActionButton>
        <CurrentPage>
          {currentPage} / {totalPage}
        </CurrentPage>
        <ActionButton disabled={currentPage === totalPage} onClick={onNext}>
          <MdNavigateNext />
        </ActionButton>
      </PaginationActions>
      <RowCount>Total: {totalElement}</RowCount>
    </Container>
  );
};

export default Pagination;
