import {
  Answer,
  MultipleQuestion,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";

type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;

//응답 데이터 리스트 형식
export interface responseDataList {
  surveyId: number;
  questions: responseQuestionType[];
}
export interface responseQuestionType {
  type: string;
  questionId: number;
  answers: Answer[];
}

//들어오는 데이터 리스트 형식
export interface incomingDataList {
  surveyId: number;
  surveyTitle: string;
  questions: QuestionTypes[];
}
