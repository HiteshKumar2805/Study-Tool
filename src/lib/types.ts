export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type QuizData = {
  questions: QuizQuestion[];
};

export type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export type FeynmanGrade = {
  score: number;
  feedback: string;
};

export type FeynmanData = {
  topic: string;
  grade?: FeynmanGrade;
};
