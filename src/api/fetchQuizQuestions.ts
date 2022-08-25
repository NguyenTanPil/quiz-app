import { Difficulty, Question } from '../utils/types';
import { shuffleArray } from '../utils';

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  console.log(endPoint);

  const responseObj = await fetch(endPoint);
  const data = await responseObj.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
  }));
};
