import styled from 'styled-components';

export const Container = styled.div`
  background: #ebfeff;
  border: 0.2 solid #0085a3;
  border-radius: 0.8rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
  max-width: 1100px;
  padding: 2rem 4rem;
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

export const AnswerList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const AnswerItem = styled.div`
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
  width: 100%;
`;
