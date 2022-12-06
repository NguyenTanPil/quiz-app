import React, { useState, useEffect, useMemo } from 'react';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPlusSquare } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategoryOfUser } from '../../../api/category';
import { getClassDetail } from '../../../api/class';
import { SignUpButton } from '../../../common/Button';
import useDebounce from '../../../common/hooks/useDebounce';
import { OriginInput } from '../../../common/Input';
import NavTab from '../../../common/NavTab';
import { LabelGroup } from '../../../common/Styles';
import Table from '../../../common/Table';
import { EmptyListAction, WrapperSection } from '../../../styles/Utils';
import { convertExam } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { LoadingFullPage } from '../../Loading';
import { Container, Content, CreateNewQuiz, CreateQuizHeader, QuizName } from '../CreateExam/CreateExamStyles';
import AllExamBlock from '../Profile/AllExamBlock';
import { studentResult } from '../Profile/dummyData';
import { ExamBlock, NoExam, StudentResult } from '../Profile/ProfileStyles';
import { QuestionBankBlock, QuestionBankBody, QuestionBankImg, QuestionBankBlockBtn } from './ClassDetailStyles';
import { BsQuestionSquareFill } from 'react-icons/bs';
import { MdOutlineUpdate } from 'react-icons/md';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/user/userSlice';

const ClassDetail = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const user = useAppSelector(selectUser);

  const [classDetail, setClassDetail] = useState<any>();
  const [isExistExam, setIsExistExam] = useState(false);
  const [questionBank, setQuestionBank] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(QUIZ_APP_CONSTANTS.CLASS.tabs[0]);
  const [examList, setExamList] = useState<any[]>([]);
  const [originExamList, setOriginExamList] = useState<any[]>([]);
  const [examFilter, setExamFilter] = useState({
    search: '',
    currentPage: QUIZ_APP_CONSTANTS.COMMON.initialCurrentPage,
  });
  const debouncedExamValue = useDebounce<string>(examFilter.search, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);

  const actions = useMemo(
    () => [
      {
        id: 'edit-col',
        tooltip: 'View Detail',
        icon: <BiMessageSquareDetail />,
        onClick(row: any) {},
      },
    ],
    [],
  );

  const createNewExam = () => {
    navigate(`/exams/create-exam/${classId}`);
  };

  const createNewSubExam = () => {
    navigate(`/exams/${questionBank.id}/detail`);
  };

  useEffect(() => {
    setExamList(() => {
      if (debouncedExamValue === '') {
        return originExamList;
      }

      const regex = new RegExp(debouncedExamValue, 'gi');
      return originExamList
        .filter((exam) => exam.name.match(regex))
        .slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedExamValue]);

  useEffect(() => {
    const startIndex = (examFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setExamList(() => originExamList.slice(startIndex, endIndex));
  }, [examFilter.currentPage]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchClassDetail = async () => {
      const classRes = await getClassDetail(classId);

      if (classRes.isSuccess) {
        setClassDetail(classRes.data.class);

        if (user.role === 1) {
          const fetchedExams = classRes.data.exam.map((exam: any, idx: number) => {
            const item = convertExam(exam);

            return {
              id: item.id,
              name: `${item.name} - ${idx + 1}`,
              totalQuestions: item.arrayQuestion.length,
              createdAt: item.createdAt,
            };
          });
          setClassDetail(classRes.data.class);
          setOriginExamList(fetchedExams);
          setExamList(fetchedExams);
        }

        if (classRes.data.questionbank?.length > 0 && user.role === 1) {
          setQuestionBank({
            id: classRes.data.questionbank[0].main[0].id,
            name: classRes.data.questionbank[0].main[0].name,
            categoryName: classRes.data.questionbank[0].optional.categoryName,
            totalQuestion: classRes.data.questionbank[0].sub.total,
          });
        }

        if (classRes.data.exam?.length > 0 && user.role === 1) {
          const config = {
            listExamId: classRes.data.exam.map((item: any) => item.main[0].id),
            numberOfSub: classRes.data.exam.length,
            timeDuration: classRes.data.exam[0].main[0].timeDuration,
            timeStart: classRes.data.exam[0].main[0].timeStart,
            structure: {
              easy: classRes.data.exam[0].sub.esay,
              medium: classRes.data.exam[0].sub.normal,
              hard: classRes.data.exam[0].sub.difficult,
            },
          };

          setCookie({ data: config, cookieName: 'moreInfo', time: 60 * 60 * 2 });
          setIsExistExam(true);
        } else {
          deleteCookie('moreInfo');
        }
        setIsLoading(false);
      }
    };

    if (isSubscribed) {
      fetchClassDetail();
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  console.log({ isLoading, classDetail });

  return (
    <Container>
      <WrapperSection>
        {isLoading ? (
          <LoadingFullPage />
        ) : (
          <Content>
            <CreateQuizHeader>
              <QuizName>
                <LabelGroup>Class Name</LabelGroup>
                <OriginInput value={classDetail.name} name="class-name" readOnly={true} />
              </QuizName>
              {user.role === 1 && (
                <CreateNewQuiz>
                  <LabelGroup>Create New Exam</LabelGroup>
                  <SignUpButton onClick={createNewExam}>
                    {questionBank?.id ? <MdOutlineUpdate /> : <FiPlusSquare />}

                    <span>{questionBank?.id ? 'Update Exam' : 'New Exam'}</span>
                  </SignUpButton>
                </CreateNewQuiz>
              )}
            </CreateQuizHeader>
            <NavTab activeTab={activeTab} setActiveTab={setActiveTab} tabList={QUIZ_APP_CONSTANTS.CLASS.tabs}>
              <QuestionBankBlock>
                {questionBank?.id ? (
                  <>
                    <QuestionBankImg>
                      <BsQuestionSquareFill />
                    </QuestionBankImg>
                    <QuestionBankBody>
                      <Link to={`/exams/${questionBank.id}`}>{questionBank.name}</Link>
                      <h5>{questionBank.categoryName}</h5>
                      <span>{questionBank.totalQuestion} Questions</span>
                    </QuestionBankBody>
                    <QuestionBankBlockBtn>
                      <SignUpButton onClick={createNewSubExam}>
                        {isExistExam ? 'Update' : 'Create'} sub exam
                      </SignUpButton>
                    </QuestionBankBlockBtn>
                  </>
                ) : (
                  <NoExam>
                    <EmptyListAction>
                      <SignUpButton onClick={createNewExam}>Create An Exam</SignUpButton>
                      <span>Don't have any exams!</span>
                    </EmptyListAction>
                  </NoExam>
                )}
              </QuestionBankBlock>
              <AllExamBlock
                buttonContent={questionBank?.id ? 'Create Sub Exam' : 'Create An Exam'}
                originExamList={originExamList}
                examFilter={examFilter}
                setExamFilter={setExamFilter}
                examList={examList}
                handleCreateNewExam={questionBank?.id ? createNewSubExam : createNewExam}
              />
              <ExamBlock>
                <StudentResult>
                  <Table
                    rowData={studentResult}
                    columnDefs={[{ field: 'id' }, { field: 'name' }, { field: 'score' }, { field: 'time' }]}
                    widthArr={[10, 30, 20, 20, 20]}
                    actions={actions}
                  />
                </StudentResult>
              </ExamBlock>
            </NavTab>
          </Content>
        )}
      </WrapperSection>
    </Container>
  );
};

export default ClassDetail;
