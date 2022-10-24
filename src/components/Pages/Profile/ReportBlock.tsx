import React, { useEffect, useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { SiOpslevel } from 'react-icons/si';
import { TiExportOutline } from 'react-icons/ti';
import { SignUpButton } from '../../../common/Button';
import { BarChart, LineChart } from '../../../common/Chart';
import { RadioBox, SuggestInput } from '../../../common/Input';
import {
  QuizItem,
  QuizItemActions,
  QuizItemAnswer,
  QuizItemAnswers,
  QuizItemAnswerStatus,
  QuizItemContent,
  QuizItemHeader,
  QuizItemNumber,
  RadioBoxList,
} from '../../../common/Styles';
import Table from '../../../common/Table';
import ToolTip from '../../../common/ToolTip';
import { EmptyListAction, QuestionDashboard, QuestionDashboardItem } from '../../../styles/Utils';
import { convertNumberFormat } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { LoadingInline } from '../../Loading';
import NoDataToShow from '../../NoDataToShow';
import { LevelButton } from '../CreateExam/CreateExamStyles';
import { getDataset, overviewDatasets, overviewLabels, questionsReport, studentResult } from './dummyData';
import { BlockFilter, BlockReport, ExamBlock, NoExam, ReportItem, ReportList, StudentResult } from './ProfileStyles';
import { BiMessageSquareDetail } from 'react-icons/bi';

type ReportProps = {
  [key: string]: any;
};

const ReportBlock = ({
  originExamList,
  searchExamInStudent,
  handleCreateNewExam,
  setSearchExamInStudent,
  setActiveTab,
}: ReportProps) => {
  const [reportType, setReportType] = useState(QUIZ_APP_CONSTANTS.PROFILE.reportTypes[0]);
  const [number, setNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  const actions = useMemo(
    () => [
      {
        id: 'edit-col',
        tooltip: 'View Detail',
        icon: <BiMessageSquareDetail />,
        onClick(row: any) {
          setActiveTab('Student');
        },
      },
    ],
    [],
  );

  useEffect(() => {
    let isSubscribed = true;

    if (searchExamInStudent === '') return;

    const timer = setTimeout(() => {
      if (isSubscribed) {
        setStudents(studentResult);
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
    };
  }, [searchExamInStudent]);

  return (
    <ExamBlock>
      {originExamList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength ? (
        <NoExam>
          <EmptyListAction>
            <SignUpButton onClick={handleCreateNewExam}>Create An Exam</SignUpButton>
            <span>Don't have any exams!</span>
          </EmptyListAction>
        </NoExam>
      ) : (
        <>
          <BlockFilter noWrap={true}>
            <SuggestInput
              name="searchExamInStudent"
              placeholder="Enter your exam..."
              suggestList={originExamList.map((exam: any) => exam.name)}
              setValue={(value) => setSearchExamInStudent(value)}
            />
            <span>
              <CSVLink
                data={studentResult}
                headers={[
                  { label: 'Id', key: 'id' },
                  { label: 'Name', key: 'name' },
                  { label: 'Score', key: 'score' },
                  { label: 'Time', key: 'time' },
                ]}
                filename="student.csv"
              >
                <ToolTip content="Export csv file">
                  <SignUpButton disabled={searchExamInStudent === ''}>
                    <TiExportOutline />
                  </SignUpButton>
                </ToolTip>
              </CSVLink>
            </span>
          </BlockFilter>
          {searchExamInStudent && !isLoading && (
            <BlockReport>
              <RadioBoxList>
                {QUIZ_APP_CONSTANTS.PROFILE.reportTypes.map((type: string) => (
                  <SignUpButton key={`type-${type}`} type="button" onClick={() => setReportType(type)}>
                    <span>{type}</span>
                    <RadioBox
                      isActive={type === reportType ? true : undefined}
                      handleChecked={() => setReportType(type)}
                    />
                  </SignUpButton>
                ))}
              </RadioBoxList>
              <ReportList>
                {reportType === 'Overview' ? (
                  <ReportItem>
                    <LineChart labels={overviewLabels} datasets={overviewDatasets} titleName="Report points of exam" />
                  </ReportItem>
                ) : (
                  <>
                    {reportType === 'Hide' ? (
                      <></>
                    ) : (
                      <ReportItem>
                        <QuestionDashboard>
                          {questionsReport.map((question, idx) => (
                            <QuestionDashboardItem
                              isFlag={false}
                              isSubmit={false}
                              isCorrect={false}
                              active={idx === number}
                              isSelected={false}
                              key={question.id}
                              onClick={() => setNumber(idx)}
                            >
                              {idx + 1}
                            </QuestionDashboardItem>
                          ))}
                        </QuestionDashboard>
                        <BarChart
                          labels={['A', 'B', 'C', 'D']}
                          datasets={getDataset(questionsReport[number])}
                          titleName="Report points of questions"
                        />
                        <QuizItem as="div">
                          <QuizItemHeader>
                            <QuizItemNumber>Question {convertNumberFormat(number + 1)}</QuizItemNumber>
                            <QuizItemActions>
                              <ToolTip content={`${questionsReport[number].level} Level`}>
                                <LevelButton
                                  disable={true}
                                  typeColor={QUIZ_APP_CONSTANTS.CREATE_EXAM.getActiveLevelTypeColor(
                                    questionsReport[number].level,
                                  )}
                                >
                                  <SiOpslevel />
                                </LevelButton>
                              </ToolTip>
                            </QuizItemActions>
                          </QuizItemHeader>
                          <QuizItemContent>{questionsReport[number].question}</QuizItemContent>
                          <QuizItemAnswers>
                            {questionsReport[number].answers.map((answer: any) => (
                              <QuizItemAnswer key={answer.id}>
                                <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                                <span>{answer.content}</span>
                              </QuizItemAnswer>
                            ))}
                          </QuizItemAnswers>
                        </QuizItem>
                      </ReportItem>
                    )}
                  </>
                )}
              </ReportList>
            </BlockReport>
          )}
          <StudentResult>
            {searchExamInStudent === '' ? (
              <NoDataToShow message="No report to show!" />
            ) : (
              <>
                {isLoading ? (
                  <LoadingInline />
                ) : (
                  <Table
                    rowData={students}
                    columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'score' }, { field: 'time' }]}
                    widthArr={[10, 30, 20, 20, 20]}
                    actions={actions}
                  />
                )}
              </>
            )}
          </StudentResult>
        </>
      )}
    </ExamBlock>
  );
};

export default ReportBlock;
