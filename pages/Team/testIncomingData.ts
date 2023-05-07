import { MultipleQuestion } from "@components/SurveyResponseTemplates/MultipleChoice/type";
import { RangeBarQuestion } from "@components/SurveyResponseTemplates/RangeBar/type";
import { SubjectiveQuestion } from "@components/SurveyResponseTemplates/Subjective/type";
import { incomingDataList } from "@pages/Team/type";

type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;
export const testInput: incomingDataList = {
  surveyId: 27,
  surveyTitle: "내가 만든 선물",
  questions: [
    {
      type: "MULTIPLE",
      questionId: 28,
      title: "객관식 1번",
      explanation: "설문 1번",
      questionNumber: "1",
      finalQuestion: false,
      nextQuestionNumber: "2",
      numberOfAnswerChoices: 1,
      answers: [
        {
          answerId: 29,
          content: "답변 1",
        },
        {
          answerId: 30,
          content: "답변 2",
        },
        {
          answerId: 31,
          content: "답변 3",
        },
        {
          answerId: 32,
          content: "답변 4",
        },
      ],
      logics: [
        {
          conditionOfQuestionAnswers: [
            {
              answerId: 31,
              content: "답변 3",
            },
          ],
          nextQuestionNumber: "4",
        },
      ],
    },
    {
      type: "ESSAY",
      questionId: 35,
      title: "주관식 2번",
      explanation: "설문 2번",
      questionNumber: "2",
      finalQuestion: false,
      nextQuestionNumber: "3",
    },
    {
      type: "RANGE",
      questionId: 36,
      title: "선형배열 3번",
      explanation: "설문 3번",
      questionNumber: "3",
      finalQuestion: false,
      nextQuestionNumber: "4",
      min: 2,
      max: 10,
    },
    {
      type: "MULTIPLE",
      questionId: 37,
      title: "객관식 4번",
      explanation: "설문 4번",
      questionNumber: "4",
      finalQuestion: false,
      nextQuestionNumber: "5",
      numberOfAnswerChoices: 1,
      answers: [
        {
          answerId: 38,
          content: "1번",
        },
        {
          answerId: 39,
          content: "2번",
        },
      ],
      logics: [],
    },
    {
      type: "ESSAY",
      questionId: 40,
      title: "주관식 5번",
      explanation: "설문 5번",
      questionNumber: "5",
      finalQuestion: true,
      nextQuestionNumber: "0",
    },
  ],
};
