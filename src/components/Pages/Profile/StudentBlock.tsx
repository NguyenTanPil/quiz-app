import React, { useEffect, useState } from 'react';
import { SiOpslevel } from 'react-icons/si';
import { getClassDetail, getResultByTeacher } from '../../../api/class';
import { getDetailSubExamQuestions } from '../../../api/exam';
import {
  CategoryItem,
  CategoryList,
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
import { convertNumberFormat, scrollToTop } from '../../../utils';
import { QUIZ_APP_CONSTANTS } from '../../../utils/constants';
import { LoadingFullPage } from '../../Loading';
import { LevelButton, LevelItem, LevelList } from '../CreateExam/CreateExamStyles';
import { studentReport } from './dummyData';
import {
  AnswerContent,
  DetailColor,
  DetailColorItem,
  DetailInfo,
  ExamBlock,
  InfoContent,
  InfoTitle,
  QuizListWrap,
} from './ProfileStyles';

type StudentBlockType = {
  [key: string]: any;
};

const StudentBlock = ({ studentDetail, currentClassId }: StudentBlockType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState({});

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getQuestions = async (resultId: string) => {
      const res = await getResultByTeacher(resultId);
      const res2 = await getClassDetail(currentClassId, false);
      setQuestionBank({
        name: res2.data.exam[0].main[0].name,
        timeDuration: res2.data.exam[0].main[0].timeDuration,
        totalQuestions: res2.data.exam[0].sub.total,
      });
      const tempQuestions = res.data.questions.map((item: any) => {
        return {
          id: item.id,
          question: item.question,
          answerClicked: item.chooseAnswer.id,
          level: item.level,
          answers: item.answers,
        };
      });

      setQuestions(tempQuestions);
      setIsLoading(false);
    };

    if (studentDetail.resultId) {
      getQuestions(studentDetail.resultId);
    }
  }, [studentDetail]);

  return (
    <>
      {isLoading ? (
        <LoadingFullPage />
      ) : (
        <ExamBlock>
          <DetailInfo>
            <CategoryList>
              <CategoryItem style={{ flexDirection: 'column' }}>
                <InfoTitle>Exam Information</InfoTitle>
                <InfoContent>
                  <li>Name : {questionBank.name}</li>
                  <li>Questions : {questionBank.totalQuestions}</li>
                  <li>Time Duration : {questionBank.timeDuration} minutes</li>
                </InfoContent>
              </CategoryItem>
              <CategoryItem style={{ flexDirection: 'column' }}>
                <InfoTitle>Student Information</InfoTitle>
                <InfoContent>
                  <li>Name : {studentDetail.name}</li>
                  <li>Score : {studentDetail.numCorrect}</li>
                  <li>Rest Time : {studentDetail.restTime} minutes</li>
                </InfoContent>
              </CategoryItem>
            </CategoryList>
          </DetailInfo>
          <DetailColor>
            <DetailColorItem>
              <LabelGroup>Answer Colors</LabelGroup>
              <LevelList>
                {QUIZ_APP_CONSTANTS.PROFILE.answerColors.map((level) => (
                  <LevelItem key={level.name} typeColor={level.typeColor}>
                    {level.name}
                  </LevelItem>
                ))}
              </LevelList>
            </DetailColorItem>
            <DetailColorItem>
              <LabelGroup>Level Colors</LabelGroup>
              <LevelList>
                {QUIZ_APP_CONSTANTS.CREATE_EXAM.levels.map((level) => (
                  <LevelItem key={level.name} typeColor={level.typeColor}>
                    {level.name}
                  </LevelItem>
                ))}
              </LevelList>
            </DetailColorItem>
          </DetailColor>
          <QuizListWrap>
            <QuizList>
              {questions.map((quiz: any, idx: number) => (
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
                        <AnswerContent isAnswerClicked={quiz.answerClicked === answer.id}>
                          <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                        </AnswerContent>
                      </QuizItemAnswer>
                    ))}
                  </QuizItemAnswers>
                </QuizItem>
              ))}
            </QuizList>
          </QuizListWrap>
        </ExamBlock>
      )}
    </>
  );
};

export default StudentBlock;
