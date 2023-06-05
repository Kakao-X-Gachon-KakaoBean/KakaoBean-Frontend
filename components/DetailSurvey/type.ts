export interface SurveyDataType {
  surveyId: number;
  surveyTitle: string;
  surveyDate: string;
  numberOfResponse: number;
  closeStatus: boolean;
  surveyGenderPercent: { name: string; value: number }[];
  surveyAgePercent: { name: string; 인원수: number }[];
  questionsResult: QuestionResult[];
}

interface QuestionResult {
  type: "RANGE" | "MULTIPLE" | "ESSAY";
  title: string;
  explanation: string;
  min?: number;
  max?: number;
  answers: { name: string; value: number }[] | string[];
}
