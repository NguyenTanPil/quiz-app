import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

export const Container = styled.section`
  background-color: #f7f7f7;
`;

export const FeedbackList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 3.2rem;
  padding-top: 3.2rem;
`;

export const FeedbackItem = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 1.6rem;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 64rem;
  padding: 2.4rem;
`;

export const Avatar = styled.div`
  margin-right: 2.4rem;

  img {
    border-radius: 50%;
    height: 8rem;
    object-fit: cover;
    width: 8rem;
  }
`;

export const Content = styled.div`
  p {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    line-height: 2.4rem;
    margin: 0;
  }

  h4 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
    margin-top: 1.6rem;
  }
`;
