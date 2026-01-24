export interface User {
  role: 'guest' | 'student' | 'teacher'; // добавил guest
  student_id: string;
  name: string;
  surname: string;
}


export interface QuizAnswer {
  questionIndex: number;
  selectedAnswers: number[];
}

export interface Submission {
  studentName: string;
  studentSurname: string;
  labWorkId: number;
  labWorkTitle: string;
  score: number;
  totalQuestions: number;
  submittedAt: Date;
  answers: QuizAnswer[];
}
