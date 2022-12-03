import React, { useState, useEffect, useMemo } from 'react';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPlusSquare } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryOfUser } from '../../../api/category';
import { getClassDetail } from '../../../api/class';
import { SignUpButton } from '../../../common/Button';
import useDebounce from '../../../common/hooks/useDebounce';
import { OriginInput } from '../../../common/Input';
import NavTab from '../../../common/NavTab';
import { LabelGroup } from '../../../common/Styles';
import Table from '../../../common/Table';
import { WrapperSection } from '../../../styles/Utils';
import { convertExam } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { LoadingFullPage } from '../../Loading';
import { Container, Content, CreateNewQuiz, CreateQuizHeader, QuizName } from '../CreateExam/CreateExamStyles';
import AllExamBlock from '../Profile/AllExamBlock';
import { studentResult } from '../Profile/dummyData';
import { ExamBlock, StudentResult } from '../Profile/ProfileStyles';

const listExam = [
  {
    id: '123',
    name: 'exam 1',
    totalQuestions: 12,
    category: {
      name: 'Category 1',
    },
    createdAt: 1666364462,
  },
  {
    id: '143',
    name: 'exam 2',
    totalQuestions: 12,
    category: {
      name: 'Category 1',
    },
    createdAt: 1666364462,
  },
  {
    id: '1233',
    name: 'exam 4',
    totalQuestions: 12,
    category: {
      name: 'Category 2',
    },
    createdAt: 1666364462,
  },
];

const ClassDetail = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  const [classDetail, setClassDetail] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(QUIZ_APP_CONSTANTS.CLASS.tabs[0]);
  const [examList, setExamList] = useState<any[]>([]);
  const [originExamList, setOriginExamList] = useState<any[]>([]);
  const [examFilter, setExamFilter] = useState({
    search: '',
    categoryName: '',
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

  useEffect(() => {
    setExamList(() => {
      let newExamList = originExamList.filter(
        (exam) => exam.category.name.toLowerCase() === examFilter.categoryName.toLowerCase(),
      );

      if (debouncedExamValue) {
        const regex = new RegExp(debouncedExamValue, 'gi');
        newExamList = newExamList.filter((exam) => exam.name.match(regex));
      }

      return newExamList.slice(QUIZ_APP_CONSTANTS.COMMON.startIndex, QUIZ_APP_CONSTANTS.COMMON.itemsPerPage);
    });
  }, [debouncedExamValue, examFilter.categoryName]);

  useEffect(() => {
    const startIndex = (examFilter.currentPage - 1) * QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;
    const endIndex = startIndex + QUIZ_APP_CONSTANTS.CREATE_EXAM.categoryPageSize;

    setExamList(() => originExamList.slice(startIndex, endIndex));
  }, [examFilter.currentPage]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchClassDetail = async () => {
      const classRes = await getClassDetail(classId);
      const categoryRes = await getCategoryOfUser();

      if (classRes.isSuccess && categoryRes.isSuccess) {
        setClassDetail(classRes.data.class);
        setOriginExamList(classRes.data.exam.map((exam: any) => convertExam(exam)));
        setExamFilter((prev) => ({ ...prev, categoryName: categoryRes.data[0].name }));
        setCategoryList(
          categoryRes.data.map((item: any) => ({
            name: item.name,
          })),
        );
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
              <CreateNewQuiz>
                <LabelGroup>Create New Exam</LabelGroup>
                <SignUpButton onClick={createNewExam}>
                  <FiPlusSquare />
                  <span>New Exam</span>
                </SignUpButton>
              </CreateNewQuiz>
            </CreateQuizHeader>
            <NavTab activeTab={activeTab} setActiveTab={setActiveTab} tabList={QUIZ_APP_CONSTANTS.CLASS.tabs}>
              <AllExamBlock
                originExamList={originExamList}
                examFilter={examFilter}
                setExamFilter={setExamFilter}
                categoryList={[{ name: 'Category 1' }, { name: 'Category 2' }]}
                examList={examList}
                handleCreateNewExam={createNewExam}
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
