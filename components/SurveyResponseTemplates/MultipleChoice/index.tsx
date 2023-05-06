import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { forLogic, report } from "@pages/Team/index";

import {
  Answer,
  MultipleQuestion,
  subProps,
} from "@components/SurveyResponseTemplates/MultipleChoice/type";
import {
  ChoiceBtn,
  Explanation,
  MultipleQuestionDiv,
  QuestionBox,
  Title,
} from "@components/SurveyResponseTemplates/MultipleChoice/styles";
import { responseQuestionType } from "@pages/Team/type";

export const MultipleChoiceQuestions = (props: subProps) => {
  const [question] = useState<MultipleQuestion>({
    questionId: props.thisQuestion.questionId,
    type: props.thisQuestion.type,
    title: props.thisQuestion.title,
    explanation: props.thisQuestion.explanation,
    finalQuestion: props.thisQuestion.finalQuestion,
    nextQuestionNumber: props.thisQuestion.nextQuestionNumber,
    questionNumber: props.thisQuestion.questionNumber,
    numberOfAnswerChoices: props.thisQuestion.numberOfAnswerChoices,
    answers: props.thisQuestion.answers,
    logics: props.thisQuestion.logics,
  });

  // 각 객관식 선택지 false로 초기화 -> 이후 로직에 이를 활용
  const [checkboxData, setCheckboxData] = useState(
    question.answers.map(() => ({ checked: false }))
  );
  // 각 선택지에 대한 Answer형식 설정 가능하게 해주는 []
  const [makeData, setMakeData] = useState<Answer[]>([]);
  // recoil reportData -> 제출 시 makeData 입력하기 위함
  const [reportData, setReportData] = useRecoilState(report);

  //logic Mapping
  const [logic, setLogic] = useRecoilState(forLogic);
  const [selectedIdBox, setSelectedIdBox] = useState<Number[]>([0]);
  const [logicIdBox, setLogicIdBox] = useState(
    question.logics.map(() => ({ id: [0], next: "" }))
  );

  //버튼 클릭에 따른 바뀐 선택지 state true로 적용 vice versa
  const handleCheckboxChange = (index: number) => {
    setCheckboxData((prevState) => {
      const newState = [...prevState];
      newState[index].checked = !newState[index].checked;
      //로직 업데이트
      if (newState[index].checked) {
        setSelectedIdBox((prev) => {
          return [...prev].concat(question.answers[index].answerId);
        });
      } else {
        setSelectedIdBox((prev) => {
          return [...prev].filter(
            (value) => value !== question.answers[index].answerId
          );
        });
      }
      return newState;
    });
  };

  //해당 문제 로직 초기 설정
  const LogicMap = () => {
    setLogicIdBox((prevState) => {
      const newState = [...prevState];
      question.logics.map((arr, index1) => {
        newState[index1].next = arr.nextQuestionNumber;
        arr.conditionOfQuestionAnswers.map((ans, index2) => {
          newState[index1].id = [...newState[index1].id, ans.answerId];
        });
      });
      return newState; // 새로운 상태 반환
    });
  };

  useEffect(() => {
    LogicMap();
  }, []);

  //바뀐 스테이트에 따라 해당 항목 값 makeData에 answer 형식으로 변환 및 저장
  useEffect(() => {
    checkboxData.map((boolean, index) => {
      if (boolean.checked) {
        setMakeData((prevState) => {
          if (!prevState.includes(question.answers[index])) {
            return [...prevState, question.answers[index]];
          } else return prevState;
        });
      } else {
        setMakeData((prevState) => {
          return prevState.filter((value) => value !== question.answers[index]);
        });
      }
    });
  }, [checkboxData]);

  //저장 값을 recoil로 넘겨주는 function, 한번만 작동할 수 밖에 없으므로(제출버튼 클릭시 발생할 이벤트) 중복체크 없음
  //TODO: 제출 버튼이 눌린 경우에만 작동, 지금은 각 페이지에 버튼 존재
  const onSubmit = () => {
    const newQuestion: responseQuestionType = {
      type: question.type,
      questionId: question.questionId,
      answers: makeData,
    };
    setReportData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion],
    }));
  };

  return (
    <QuestionBox>
      <Title>{question.title}</Title>
      <Explanation>{question.explanation}</Explanation>
      {question.answers.map((question, index) => (
        <MultipleQuestionDiv key={index}>
          <ChoiceBtn
            checked={checkboxData[index].checked}
            onClick={() => {
              handleCheckboxChange(index);
            }}
          >
            {index + 1}. {question.content}
          </ChoiceBtn>
        </MultipleQuestionDiv>
      ))}
      <button
        onClick={() => {
          onSubmit();
          console.log("selected logic: ", selectedIdBox);
          console.log("input logic: ", logicIdBox);
        }}
      >
        check Recoiled Data
      </button>
    </QuestionBox>
  );
};
