export const dummySurvey = {
  survey: {
    surveyId: 1,
    surveyTitle: "title",
    questions: [
      {
        type: "ESSAY",
        questionId: 2,
        title: "Essay Question Title",
        explanation: "ex2",
        questionNumber: "1",
        finalQuestion: false,
        nextQuestionNumber: "2",
      },
      {
        type: "MULTIPLE",
        questionId: 8,
        title: "First Multiple Question Title",
        explanation: "ex3",
        questionNumber: "2",
        finalQuestion: false,
        nextQuestionNumber: "7   ",
        numberOfAnswerChoices: 2,
        answers: [
          {
            answerId: 3,
            content: "first choice answer",
          },
          {
            answerId: 4,
            content: "second choice answer",
          },
          {
            answerId: 5,
            content: "third choice answer",
          },
          {
            answerId: 6,
            content: "fourth choice answer",
          },
          {
            answerId: 7,
            content: "fifth choice answer",
          },
        ],
        logics: [
          {
            conditionOfQuestionAnswers: [
              {
                answerId: 3,
                content: "first choice answer",
              },
              {
                answerId: 4,
                content: "second choice answer",
              },
            ],
            nextQuestionNumber: "3",
          },
          {
            conditionOfQuestionAnswers: [
              {
                answerId: 5,
                content: "third choice answer",
              },
              {
                answerId: 6,
                content: "fourth choice answer",
              },
            ],
            nextQuestionNumber: "4",
          },
        ],
      },
      {
        type: "RANGE",
        questionId: 1,
        title: "Range Bar Question",
        explanation: "ex1",
        questionNumber: "3",
        finalQuestion: false,
        nextQuestionNumber: "5",
        min: 1,
        max: 10,
      },
      {
        type: "MULTIPLE",
        questionId: 14,
        title: "Multiple Question Title",
        explanation: "without logic",
        questionNumber: "4",
        finalQuestion: false,
        nextQuestionNumber: "5",
        numberOfAnswerChoices: 1,
        answers: [
          {
            answerId: 9,
            content: "first choice answer",
          },
          {
            answerId: 10,
            content: "second choice answer",
          },
          {
            answerId: 11,
            content: "first choice answer",
          },
          {
            answerId: 12,
            content: "first choice answer",
          },
          {
            answerId: 13,
            content: "first choice answer",
          },
        ],
        logics: [],
      },
      {
        type: "ESSAY",
        questionId: 2,
        title: "Essay Question Title",
        explanation: "ex2",
        questionNumber: "5",
        finalQuestion: false,
        nextQuestionNumber: "7",
      },
      {
        type: "ESSAY",
        questionId: 2,
        title: "Essay Question Title",
        explanation: "ex2",
        questionNumber: "6",
        finalQuestion: false,
        nextQuestionNumber: "7",
      },
      {
        type: "MULTIPLE",
        questionId: 14,
        title: "Multiple Question Title",
        explanation: "without logic",
        questionNumber: "7",
        finalQuestion: true,
        nextQuestionNumber: "0",
        numberOfAnswerChoices: 1,
        answers: [
          {
            answerId: 9,
            content: "first choice answer",
          },
          {
            answerId: 10,
            content: "second choice answer",
          },
          {
            answerId: 11,
            content: "first choice answer",
          },
          {
            answerId: 12,
            content: "first choice answer",
          },
          {
            answerId: 13,
            content: "first choice answer",
          },
        ],
        logics: [],
      },
    ],
  },
  responses: [
    {
      gender: "MALE",
      age: 25,
      email: "123@gmail.com",
      name: "김민수",
      questionResponses: [
        {
          type: "ESSAY",
          questionId: 1,
          answer: "essay answer 2",
        },
        {
          type: "MULTIPLE",
          questionId: 8,
          answers: ["third choice answer"],
        },
        {
          type: "RANGE",
          questionId: 12,
          answer: 6,
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["fourth choice answer"],
        },
        {
          type: "ESSAY",
          questionId: 15,
          answer: "essay answer 8",
        },
        {
          type: "ESSAY",
          questionId: 16,
          answer: "essay answer 9",
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["fifth choice answer"],
        },
      ],
    },
    {
      gender: "FEMALE",
      age: 24,
      email: "1234@gmail.com",
      name: "이민수",
      questionResponses: [
        {
          type: "ESSAY",
          questionId: 1,
          answer: "essay answer 1",
        },
        {
          type: "MULTIPLE",
          questionId: 8,
          answers: ["first choice answer", "second choice answer"],
        },
        {
          type: "RANGE",
          questionId: 12,
          answer: 5,
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["third choice answer"],
        },
        {
          type: "ESSAY",
          questionId: 15,
          answer: "essay answer 4",
        },
        {
          type: "ESSAY",
          questionId: 16,
          answer: "essay answer 5",
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["fifth choice answer"],
        },
      ],
    },
    {
      gender: "UNKNOWN",
      age: 25,
      email: "12345@gmail.com",
      name: "박민수",
      questionResponses: [
        {
          type: "ESSAY",
          questionId: 1,
          answer: "essay answer 10",
        },
        {
          type: "MULTIPLE",
          questionId: 8,
          answers: ["second choice answer", "third choice answer"],
        },
        {
          type: "RANGE",
          questionId: 12,
          answer: 9,
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["fourth choice answer"],
        },
        {
          type: "ESSAY",
          questionId: 15,
          answer: "essay answer 11",
        },
        {
          type: "ESSAY",
          questionId: 16,
          answer: "essay answer 12",
        },
        {
          type: "MULTIPLE",
          questionId: 14,
          answers: ["second choice answer"],
        },
      ],
    },
  ],
};
