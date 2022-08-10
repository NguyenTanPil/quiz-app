// defined a new type
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

// enum is group of named constants values
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type AnswerObject = {
  question: string;
  answerClicked: string;
  correct: boolean;
  correctAnswer: string;
};

export type AnswerButtonProps = {
  correct: boolean;
  userClicked: boolean;
};
