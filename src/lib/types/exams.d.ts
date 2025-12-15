// Exams Types
export type ExamsType = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

// Questions types
export type AnswerType = {
  answer: string;
  key: string;
};

export type QuestionType = {
  _id: string;
  question: string;
  answers: AnswerType[];
  type: string;
  correct: string;
  subject: null;
  exam: ExamsType;
  createdAt: string;
};

// Response Types
export type ExamsResponse<T> = {
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  exams: T[];
};

export type QuestionsResponse = {
  questions: QuestionType[];
};
