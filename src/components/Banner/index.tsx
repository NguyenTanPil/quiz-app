import React, { useState } from 'react';
import { Container, LeftSide, RightSide } from './BannerStyles';
import banner from '../../images/banner.jpeg';
import { WrapperSection } from '../../styles/Utils';
import { SignUpButton } from '../../common/Button';
import { history } from '../../images/history_train';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getGeneraExamById } from '../../api/exam';
// import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
// import { CSVLink } from 'react-csv';

const Banner = () => {
  const navigate = useNavigate();
  // const handleImport = async () => {
  //   const questions = data.questions.map((item) => {
  //     const topQuestionsId: any[] = [];
  //     const bottomQuestionsId: any[] = [];

  //     const content = item.question;
  //     const correctAnswer = item.correct_answer;
  //     const inCorrectAnswer = item.incorrect_answers;
  //     const level = item.level;

  //     return { content, correctAnswer, inCorrectAnswer, level, topQuestionsId, bottomQuestionsId };
  //   });

  //   const url = 'http://127.0.0.1:8000/api/creator/questionbank/add/5c4b715a-095f-47dc-b3d7-726aaa4d0054';
  //   const token = '12|io2OPkc94Id9AP3Wn9YUFK0hstUMms26AB1eVKYr';

  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url,
  //       data: { questionList: questions },
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log('success');

  //     return { isSuccess: true, data: response.data.data };
  //   } catch (error: any) {
  //     console.log('error');
  //     return { isSuccess: false, message: error.message };
  //   }
  // };

  // const [q, setQ] = useState([]);

  // const handleImport = async () => {
  //   const data = history.questions.map((item: any) => {
  //     const { id, recd_tf_bottom: bottomQuestionsId, recd_tf_top: topQuestionsId } = item;
  //     return { id, bottomQuestionsId, topQuestionsId };
  //   });

  //   const url = 'http://127.0.0.1:8000/api/creator/questionbank/update/question';
  //   const token = '12|io2OPkc94Id9AP3Wn9YUFK0hstUMms26AB1eVKYr';
  //   const input = { questionList: [{ question: data }] };

  //   try {
  //     const response = await axios({
  //       method: 'patch',
  //       url,
  //       data: input,
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log('success');

  //     return { isSuccess: true, data: response.data.data };
  //   } catch (error: any) {
  //     console.log('error');
  //     return { isSuccess: false, message: error.message };
  //   }
  // };

  return (
    <WrapperSection>
      <Container>
        <LeftSide>
          <h1>A Community of online marketers.</h1>
          <p>
            Education and strategy for internet marketers to launch and scale marking and business campaigns online.
          </p>
          <SignUpButton onClick={() => navigate('/search')}>Take A Quiz</SignUpButton>
        </LeftSide>
        <RightSide>
          <img src={banner} alt="" />
        </RightSide>
      </Container>
    </WrapperSection>
  );
};

export default Banner;
