import {
  Answer,
  MultipleQuestion,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";

export type QuestionTypes =
  | MultipleQuestion
  | SubjectiveQuestion
  | RangeBarQuestion;

export type answerTypes = Answer[] | answerValue | answer;

export type answer = string;
export type answerValue = number;
//응답 데이터 리스트 형식
export interface responseDataList {
  surveyId: number;
  questions: responseQuestionType[];
}
export interface responseQuestionType {
  type: string;
  questionId: number;
  answers: answerTypes;
}

//들어오는 데이터 리스트 형식
export interface incomingDataList {
  surveyId: number;
  surveyTitle: string;
  questions: QuestionTypes[];
}
