export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Answers {
  [key: number]: number;
} 