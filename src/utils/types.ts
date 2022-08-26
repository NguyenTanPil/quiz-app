// defined a new type
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  answerClicked: undefined | string;
  isCorrect: undefined | boolean;
  answers: string[];
};

// enum is group of named constants values
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type AnswerButtonProps = {
  isCorrect: boolean;
  userClicked: boolean;
};
