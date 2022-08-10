import styled from 'styled-components';

export const Container = styled.div`
  background: #ebfeff;
  max-width: 1100px;
  border-radius: 0.8rem;
  border: 0.2 solid #0085a3;
  padding: 2rem 4rem;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

export const QuestionNumber = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
`;

export const QuestionContent = styled(QuestionNumber)`
  padding: 1.2rem 0;
`;

export const AnswerList = styled.div``;

export const AnswerItem = styled.div``;
