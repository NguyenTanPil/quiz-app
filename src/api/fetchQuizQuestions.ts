import { Difficulty, Question } from '../utils/types';
import { shuffleArray } from '../utils';

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const responseObj = await fetch(endPoint);
  const data = await responseObj.json();
  return data.results.map((q: Question, idx: number) => {
    const { question, correct_answer: correctAnswer, incorrect_answers: inCorrectAnswers } = q;
    return {
      id: idx + '',
      question,
      correctAnswer,
      inCorrectAnswers,
      answerClicked: undefined,
      isCorrect: undefined,
      answers: shuffleArray([...inCorrectAnswers, correctAnswer]),
    };
  });
};

export const fakeFetchQuizList = (quizList: any[]) => {
  return quizList.map((quiz: any) => {
    const { id, question, correctAnswer, inCorrectAnswers } = quiz;

    return {
      id: id,
      question,
      correctAnswer,
      inCorrectAnswers,
      answerClicked: undefined,
      isCorrect: undefined,
      answers: shuffleArray([...inCorrectAnswers, correctAnswer]),
    };
  });
};
