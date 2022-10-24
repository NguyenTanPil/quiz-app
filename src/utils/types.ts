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
  correctAnswer: { id: string; content: string };
  inCorrectAnswers: { id: string; content: string }[];
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
  isTestMode: boolean;
  isSubmit: boolean;
};

export type AnswerProps = {
  id: string;
  content: string;
  isCorrect: boolean | undefined;
};

export type QuizProps = {
  id: string;
  question: string;
  level: string;
  mode: string;
  answers: AnswerProps[];
};

// export interface UserProps {
//   id: string;
//   email: string;
//   createdAt: number;
//   name: string;
//   nameTitle: string;
//   password: string;
//   role: number;
// }

export type Exam = {
  id: string;
  categoryId: string;
  countLimit: number;
  createdAt: number;
  creatorId: string;
  timeDuration: number;
  timeStart: number;
  name: string;
  totalQuestions: number;
};

export type Quiz = {
  content: string;
  correctAnswer: string;
  inCorrectAnswers: string[];
  examId: string;
  id: string;
  level: number;
};
