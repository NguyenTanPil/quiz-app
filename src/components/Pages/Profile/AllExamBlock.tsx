import React from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { SignUpButton } from '../../../common/Button';
import Dropdown from '../../../common/Dropdown';
import { OriginInput } from '../../../common/Input';
import Pagination from '../../../common/Pagination';
import { EmptyListAction } from '../../../styles/Utils';
import { convertNumberFormat, formatCreatedAt } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import NoDataToShow from '../../NoDataToShow';
import {
  BlockContent,
  BlockFilter,
  ExamBlock,
  NoExam,
  PaginationWrap,
  ProfileQuizAvatar,
  ProfileQuizContent,
  ProfileQuizDetails,
  ProfileQuizItem,
  ProfileQuizList,
  ProfileQuizName,
  ProfileQuizTime,
} from './ProfileStyles';

type AllExamBlockProps = {
  [key: string]: any;
};

const AllExamBlock = ({
  buttonContent,
  originExamList,
  examFilter,
  setExamFilter,
  examList,
  handleCreateNewExam,
}: AllExamBlockProps) => {
  return (
    <ExamBlock>
      {originExamList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
        <NoExam>
          <EmptyListAction>
            <SignUpButton onClick={handleCreateNewExam}>
              {buttonContent ? buttonContent : 'Create An Exam'}
            </SignUpButton>
            <span>Don't have any exams!</span>
          </EmptyListAction>
        </NoExam>
      ) : (
        <>
          <BlockFilter>
            <OriginInput
              type="search"
              name="searchExam"
              value={examFilter.search}
              placeholder="Enter exam name..."
              setValue={(value) => setExamFilter((prev: any) => ({ ...prev, search: value }))}
            />
          </BlockFilter>
          {examList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
            <NoDataToShow message="No exams to show!" />
          ) : (
            <ProfileQuizList>
              {examList.map((exam: any) => (
                <ProfileQuizItem key={exam.id}>
                  <ProfileQuizAvatar>
                    <img src="https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=600&h=600" alt="" />
                  </ProfileQuizAvatar>
                  <ProfileQuizContent>
                    <ProfileQuizName>{exam.name}</ProfileQuizName>
                    <ProfileQuizDetails>
                      <div>
                        <MdOutlineMenuOpen />
                        <span>{convertNumberFormat(exam.totalQuestions)} Questions</span>
                      </div>
                    </ProfileQuizDetails>
                    <ProfileQuizTime>
                      <AiOutlineClockCircle />
                      <span>{formatCreatedAt(exam.createdAt)}</span>
                    </ProfileQuizTime>
                  </ProfileQuizContent>
                </ProfileQuizItem>
              ))}
            </ProfileQuizList>
          )}
          {originExamList.length > QUIZ_APP_CONSTANTS.COMMON.itemsPerPage && (
            <BlockContent>
              <PaginationWrap>
                <Pagination
                  pageSize={QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize}
                  totalPage={Math.ceil(originExamList.length / QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize)}
                  currentPage={examFilter.currentPage}
                  totalElement={originExamList.length}
                  onNext={() => setExamFilter((prev: any) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  onPrev={() => setExamFilter((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                />
              </PaginationWrap>
            </BlockContent>
          )}
        </>
      )}
    </ExamBlock>
  );
};

export default AllExamBlock;
