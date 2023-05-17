import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import inComingData from "./incoming3.json"; // incoming3.json
import { Wrapper } from "@components/SurveyResponseLogicFlow/styles";
import { Logic } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";

const SurveyResponseLogicFlow = () => {
  const getRandomColor = () => {
    // 랜덤한 색상을 생성
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 로직 유무 확인
  const hasLogics = inComingData.questions.some(
    (question) => question.logics && question.logics.length > 0
  );

  // Node 설정
  const questionNodes: Node<any>[] = inComingData.questions.map(
    (question, index) => {
      if (question.logics && question.logics.length > 0) {
        return {
          id: question.questionId.toString(),
          data: {
            label: question.title,
          },
          position: { x: 250, y: 5 + index * 100 },
        };
      } else if (hasLogics) {
        return {
          id: question.questionId.toString(),
          data: {
            label: question.title,
          },
          position: { x: 350, y: 5 + index * 100 },
        };
      } else {
        return {
          id: question.questionId.toString(),
          data: {
            label: question.title,
          },
          position: { x: 250, y: 5 + index * 100 },
        };
      }
    }
  );
  // 새로운 배열을 생성하고 제출 노드를 추가합니다.
  const submitNode: Node<any>[] = [
    {
      id: "submit",
      data: {
        label: "제출",
      },
      position: {
        x: 250,
        y: questionNodes.length * 100,
      },
    },
  ];

  // spread 연산자를 사용하여 두 배열을 합칩니다.
  const initialNodes: Node<any>[] = [...questionNodes, ...submitNode];

  // Edge 설정
  const initialEdges: Edge<any>[] = inComingData.questions
    .filter((question) => question.nextQuestionNumber !== "")
    .map((question) => {
      // node question 이 주관식, 혹은 선형배율식일 경우엔 nextQuestionNumber에 해당하는 노드를 찾아서 연결한다.
      if (question.type === "ESSAY" || question.type === "RANGE") {
        console.log(question.nextQuestionNumber);
        if (question.nextQuestionNumber === "0") {
          return {
            id: `${question.questionId} to submit`,
            source: question.questionId.toString(),
            target: "submit",
          };
        } else {
          const nextQuestion = inComingData.questions.find(
            (q) => q.questionNumber === question.nextQuestionNumber
          );
          if (!nextQuestion) {
            throw new Error(
              `Question ${question.nextQuestionNumber} not found`
            );
          }
          return {
            id: `${question.questionId} to ${nextQuestion.questionId}`,
            source: question.questionId.toString(),
            target: nextQuestion.questionId.toString(),
          };
        }
      }
      // node question이 객관식인 경우
      else if (question.type === "MULTIPLE") {
        // 로직이 존재하는 경우, 로직 length 만큼 edge를 생성한다.
        if (question.logics && question.logics.length > 0) {
          const logicEdges = question.logics.map((logic: Logic) => {
            if (logic.nextQuestionNumber === "0") {
              return {
                id: `${question.questionId} to submit (logic)`,
                source: question.questionId.toString(),
                target: "submit",
                animated: true,
                style: { stroke: getRandomColor() }, // 엣지의 색상을 랜덤으로 변경
              };
            } else {
              const nextQuestion = inComingData.questions.find(
                (q) => q.questionNumber === logic.nextQuestionNumber
              );
              if (!nextQuestion) {
                throw new Error(
                  `Question ${logic.nextQuestionNumber} not found`
                );
              }
              return {
                id: `${question.questionId} to ${nextQuestion.questionId} (logic)`,
                source: question.questionId.toString(),
                target: nextQuestion.questionId.toString(),
                animated: true,
                style: { stroke: getRandomColor() }, // 엣지의 색상을 랜덤으로 변경
              };
            }
          });

          if (question.nextQuestionNumber === "0") {
            return [
              ...logicEdges,
              {
                id: `${question.questionId} to submit`,
                source: question.questionId.toString(),
                target: "submit",
              },
            ];
          } else {
            // 로직이 존재하던 존재하지 않던, 기본 이동도 추가한다.
            const nextQuestion = inComingData.questions.find(
              (q) => q.questionNumber === question.nextQuestionNumber
            );
            if (!nextQuestion) {
              throw new Error(
                `Question ${question.nextQuestionNumber} not found`
              );
            }

            return [
              ...logicEdges,
              {
                id: `${question.questionId} to ${nextQuestion.questionId}`,
                source: question.questionId.toString(),
                target: nextQuestion.questionId.toString(),
              },
            ];
          }
        } else {
          // 로직이 존재하지 않는 경우, 기본 이동만 구현한다.
          if (question.nextQuestionNumber === "0") {
            return {
              id: `${question.questionId} to submit`,
              source: question.questionId.toString(),
              target: "submit",
            };
          } else {
            const nextQuestion = inComingData.questions.find(
              (q) => q.questionNumber === question.nextQuestionNumber
            );
            if (!nextQuestion) {
              throw new Error(
                `Question ${question.nextQuestionNumber} not found`
              );
            }
            return {
              id: `${question.questionId} to ${nextQuestion.questionId}`,
              source: question.questionId.toString(),
              target: nextQuestion.questionId.toString(),
            };
          }
        }
      }
    })
    .filter((edge): edge is Edge<any> => edge !== undefined)
    .flat(); // 배열 평탄화, logic 값에 의해 묶여진 배열을 평탄화한다.

  useEffect(() => {
    console.log("initialNodes", initialNodes);
    console.log("initialEdges", initialEdges);
  }, [initialNodes, initialEdges]);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log(`Clicked node ${node.id} with data:`, node.data);
  };

  return (
    <Wrapper>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      />
    </Wrapper>
  );
};

export default SurveyResponseLogicFlow;
