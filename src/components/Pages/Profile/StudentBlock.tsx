import React, { useEffect } from 'react';
import { SiOpslevel } from 'react-icons/si';
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

const StudentBlock = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <ExamBlock>
      <DetailInfo>
        <CategoryList>
          <CategoryItem>
            <InfoTitle>Exam Information</InfoTitle>
            <InfoContent>
              <li>Name : Game</li>
              <li>Questions : {convertNumberFormat(10)}</li>
              <li>Time : {convertNumberFormat(60)} minutes</li>
              <li>Count Limit : {convertNumberFormat(2)}</li>
            </InfoContent>
          </CategoryItem>
          <CategoryItem>
            <InfoTitle>Student Information</InfoTitle>
            <InfoContent>
              <li>Name : Nguyen Tan Pil</li>
              <li>Score : {convertNumberFormat(6)}</li>
              <li>Time : {convertNumberFormat(30)} minutes</li>
              <li>Count Test : {convertNumberFormat(1)}</li>
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
          {studentReport.map((quiz: any, idx: number) => (
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
              <QuizItemContent>{quiz.question}</QuizItemContent>
              <QuizItemAnswers>
                {quiz.answers.map((answer: any) => (
                  <QuizItemAnswer key={answer.id}>
                    <QuizItemAnswerStatus isCorrect={answer.isCorrect} />
                    <AnswerContent isAnswerClicked={quiz.answerClicked === answer.id}>{answer.content}</AnswerContent>
                  </QuizItemAnswer>
                ))}
              </QuizItemAnswers>
            </QuizItem>
          ))}
        </QuizList>
      </QuizListWrap>
    </ExamBlock>
  );
};

export default StudentBlock;
