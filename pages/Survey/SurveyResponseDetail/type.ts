import { QuestionTypes } from "../../Team/type";

export interface incomingSurvey {
  surveyId: number;
  surveyTitle: string;
  questions: QuestionTypes[];
}

export interface incomingResponses {
  gender: string;
  age: number;
  email: string;
  name: string;
  questionResponses: QuestionResponse[];
}

export interface QuestionResponse {
  title: string;
  type: string;
  questionId: number;
  answer?: string | number;
  answers?: string[];
}
