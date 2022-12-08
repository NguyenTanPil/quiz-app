import React, { useState, useEffect } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { SiOpslevel } from 'react-icons/si';
import { useParams } from 'react-router-dom';
import { createSubExam, getDetailSubExamQuestions, getExamById } from '../../../api/exam';
import { SignUpButton } from '../../../common/Button';
import Dropdown from '../../../common/Dropdown';
import { DateTimePickerInput, OriginInput } from '../../../common/Input';
import {
  LabelGroup,
  QuizItem,
  QuizItemActions,
  QuizItemAnswer,
  QuizItemAnswers,
  QuizItemAnswerStatus,
  QuizItemContent,
  QuizItemHeader,
  QuizItemNumber,
  QuizList,
} from '../../../common/Styles';
import ToolTip from '../../../common/ToolTip';
import { QuestionDashboard, QuestionDashboardItem, WrapperSection } from '../../../styles/Utils';
import {
  compareTwoObjects,
  convertMinutesToDuration,
  convertNumberFormat,
  convertTimeDurationToMinutes,
} from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { getCookie, setCookie } from '../../../utils/cookie';
import { LoadingFullPage } from '../../Loading';
import { QuizStructureTemplateState } from '../CreateExam';
import {
  Container,
  Content,
  CreateNewQuiz,
  CreateQuizHeader,
  InputQuizStructure,
  LevelButton,
  LevelItem,
  QuizName,
  QuizOptions,
  StructureItem,
  TimeDuration,
  TimeDurationGroup,
  TimeDurationItem,
  TimeStart,
} from '../CreateExam/CreateExamStyles';
import { studentReport } from '../Profile/dummyData';
import { AnswerContent } from '../Profile/ProfileStyles';
import { NumberOfSubWrap, QuestionDashboardWrap } from './DetailExamStyles';

const DetailExam = () => {
  const { examId } = useParams();

  const [structure, setStructure] = useState(QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizStructure);
  const [number, setNumber] = useState(0);
  const [timeDuration, setTimeDuration] = useState({
    hours: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialHours,
    minutes: QUIZ_APP_CONSTANTS.CREATE_EXAM.initialMinutes,
  });
  const [timeStart, setTimeStart] = useState(QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTimeStart);
  const [numberOfSub, setNumberOfSub] = useState(0);
  const [examName, setExamName] = useState('');
  const [total, setTotal] = useState({ easy: 0, medium: 0, hard: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [isCreated, setIsCreated] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const getTotalQuestionByLevel = (name: string) => {
    return total[name as keyof typeof total];
  };

  const handleCreateNewSubExam = async () => {
    const timeDurationFormat = convertTimeDurationToMinutes(timeDuration);

    const formValues = {
      name: examName,
      questionBankId: examId,
      structureExam: {
        easy: structure.easy,
        normal: structure.medium,
        difficult: structure.hard,
      },
      timeDuration: timeDurationFormat,
      timeStart: timeStart / 1000,
      countLimit: 1,
      isPublished: 1,
      numExams: numberOfSub,
      note: '',
    };

    const res = await createSubExam(formValues);
    if (res.isSuccess) {
      setIsNew(true);
      const config = {
        listExamId: res.data.map((item: any) => item.id),
        numberOfSub: formValues.numExams,
        timeDuration: formValues.timeDuration,
        timeStart: formValues.timeStart * 1000,
        structure: {
          easy: formValues.structureExam.easy,
          medium: formValues.structureExam.normal,
          hard: formValues.structureExam.difficult,
        },
      };
      console.log({ config });
      setCookie({ data: config, cookieName: 'moreInfo', time: 60 * 60 * 2 });
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    let listExamIdCache: string[] = [];

    const moreInfo = getCookie('moreInfo');
    if (moreInfo && isSubscribed) {
      listExamIdCache = moreInfo.listExamId;
      setTimeDuration(convertMinutesToDuration(moreInfo.timeDuration));
      setStructure(moreInfo.structure);
      console.log({ moreInfo });
      setNumberOfSub(moreInfo.numberOfSub);
      setTimeStart(moreInfo.timeStart);
      setIsCreated(true);
    }

    const fetchQuestionBank = async () => {
      const response = await getExamById(examId);

      if (response.isSuccess) {
        let easyCount = 0;
        let mediumCount = 0;
        let hardCount = 0;
        response.data.quizList.forEach((item: any) => {
          if (item.level === 'easy') {
            easyCount++;
          } else if (item.level === 'normal') {
            mediumCount++;
          } else {
            hardCount++;
          }
        });

        if (isSubscribed) {
          setExamName(response.data.name);
          setTotal({ easy: easyCount, medium: mediumCount, hard: hardCount });
        }
      }
    };

    const fetchExams = async () => {
      let questions: any[] = [];

      await Promise.all(
        listExamIdCache.map(async (id: any) => {
          const res = await getDetailSubExamQuestions(id);
          questions.push(res.data);
        }),
      );

      if (isSubscribed) {
        setQuestionList(questions);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);

      if (moreInfo) {
        await fetchExams();
      }
      await fetchQuestionBank();
      setIsLoading(false);
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [isNew]);

  return (
    <Container>
      <WrapperSection>
        {isLoading ? (
          <LoadingFullPage />
        ) : (
          <Content>
            <CreateQuizHeader>
              <QuizName>
                <LabelGroup>Quiz Name</LabelGroup>
                <OriginInput value={examName} name="quiz-name" readOnly={true} />
              </QuizName>
              <CreateNewQuiz>
                <LabelGroup>Create New Sub Exam</LabelGroup>
                <SignUpButton
                  disabled={
                    isCreated ||
                    timeStart === QUIZ_APP_CONSTANTS.CREATE_EXAM.initialTimeStart ||
                    numberOfSub === 0 ||
                    convertTimeDurationToMinutes(timeDuration) <= 0 ||
                    compareTwoObjects(structure, QUIZ_APP_CONSTANTS.CREATE_EXAM.initialQuizStructure)
                  }
                  onClick={handleCreateNewSubExam}
                >
                  <FiPlusSquare />
                  <span>New Sub Exam</span>
                </SignUpButton>
              </CreateNewQuiz>
            </CreateQuizHeader>
            <QuizOptions>
              <LabelGroup>Number of sub exam</LabelGroup>
              <NumberOfSubWrap>
                <OriginInput
                  name="sub-exam-number"
                  type="number"
                  value={numberOfSub}
                  placeholder="Enter number of sub exam..."
                  min={0}
                  setValue={(value: any) => setNumberOfSub(parseInt(value))}
                />
              </NumberOfSubWrap>
            </QuizOptions>
            <QuizOptions>
              <TimeDuration>
                <LabelGroup>Time Duration</LabelGroup>
                <TimeDurationGroup>
                  <TimeDurationItem>
                    <Dropdown
                      id="hours"
                      activeValue={timeDuration.hours}
                      values={QUIZ_APP_CONSTANTS.CREATE_EXAM.getHourList()}
                      handleSelected={(value) => setTimeDuration((prev) => ({ ...prev, hours: value }))}
                    />
                    <span>h</span>
                  </TimeDurationItem>
                  <TimeDurationItem>
                    <Dropdown
                      id="minutes"
                      activeValue={timeDuration.minutes}
                      values={QUIZ_APP_CONSTANTS.CREATE_EXAM.getMinuteList()}
                      handleSelected={(value) => setTimeDuration((prev) => ({ ...prev, minutes: value }))}
                    />
                    <span>m</span>
                  </TimeDurationItem>
                </TimeDurationGroup>
              </TimeDuration>
              <TimeStart>
                <LabelGroup>Time Start</LabelGroup>
                <DateTimePickerInput
                  id="start-time"
                  initialTime={timeStart}
                  setDateTime={(value: any) => setTimeStart(value)}
                />
              </TimeStart>
            </QuizOptions>
            <QuizOptions>
              <LabelGroup>Structure of Sub Exam</LabelGroup>
              <InputQuizStructure>
                {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => {
                  const { name, typeColor } = level;
                  const inputValue = structure[name as keyof QuizStructureTemplateState];

                  return (
                    <StructureItem key={`quiz-structure-${name}`} borderColorHover={typeColor}>
                      <ToolTip content={`${name} Level`}>
                        <LevelItem typeColor={typeColor} as="div">
                          {name[0]}
                        </LevelItem>
                      </ToolTip>
                      <OriginInput
                        name={name}
                        type="number"
                        min={0}
                        max={getTotalQuestionByLevel(name)}
                        value={isNaN(inputValue) ? 0 : inputValue}
                        errorMessage={
                          inputValue > getTotalQuestionByLevel(name)
                            ? `Value must be less than or equal to ${getTotalQuestionByLevel(name)}`
                            : ''
                        }
                        setValue={(value) =>
                          setStructure((prev) => ({
                            ...prev,
                            [name]: parseInt(value),
                          }))
                        }
                      />
                    </StructureItem>
                  );
                })}
              </InputQuizStructure>
            </QuizOptions>
            {numberOfSub > 0 && isCreated && (
              <>
                <QuizOptions>
                  <QuestionDashboardWrap>
                    <LabelGroup>Questions of Sub Exam</LabelGroup>
                    <QuestionDashboard>
                      {Array.from({ length: numberOfSub }, (_: any, i: any) => i).map((num: any, idx: any) => (
                        <QuestionDashboardItem
                          isFlag={false}
                          isSubmit={false}
                          isCorrect={false}
                          active={num === number}
                          isSelected={false}
                          key={num}
                          onClick={() => setNumber(idx)}
                        >
                          {idx + 1}
                        </QuestionDashboardItem>
                      ))}
                    </QuestionDashboard>
                  </QuestionDashboardWrap>
                </QuizOptions>
                <QuizList>
                  {questionList[number].map((quiz: any, idx: number) => (
                    <QuizItem key={quiz.id}>
                      <QuizItemHeader>
                        <QuizItemNumber>Question {convertNumberFormat(idx + 1)}</QuizItemNumber>
                        <QuizItemActions>
                          <ToolTip content={`${quiz.level} Level`}>
                            <LevelButton
                              disable={true}
                              typeColor={QUIZ_APP_CONSTANTS.CREATE_EXAM.getActiveLevelTypeColor(quiz.level)}
                            >
                              <SiOpslevel />
                            </LevelButton>
                          </ToolTip>
                        </QuizItemActions>
                      </QuizItemHeader>
                      <QuizItemContent dangerouslySetInnerHTML={{ __html: quiz.question }} />
                      <QuizItemAnswers>
                        {quiz.answers.map((answer: any) => (
                          <QuizItemAnswer key={answer.id}>
                            <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                            <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                          </QuizItemAnswer>
                        ))}
                      </QuizItemAnswers>
                    </QuizItem>
                  ))}
                </QuizList>
              </>
            )}
          </Content>
        )}
      </WrapperSection>
    </Container>
  );
};

export default DetailExam;
