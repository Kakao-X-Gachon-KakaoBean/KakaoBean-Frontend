import React, { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "react-flow-renderer";
import {
  ConditionSection,
  LogicBody,
  LogicBottom,
  SideBar,
} from "@components/CreateSurveySideBar/LogicControl/styles";
import { Button, Select } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { DeleteOption } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/styles";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SelNodeState,
  IdNumState,
  NodeState,
  EdgeState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../../States/LogicState";
import { questionsState } from "../../../States/SurveyState";
import { target } from "react-chatbot-kit/build/webpack.config";

export const LogicControl = () => {
  // 전체 질문
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [nodes, setNodes] = useRecoilState(NodeState);
  const [edges, setEdges] = useRecoilState(EdgeState);
  // 현재 선택한 노드
  const selNode = useRecoilValue(SelNodeState);
  const idNum = useRecoilValue(IdNumState);
  const select = surveyQuestions[Number(Number(selNode) - 1)];

  //로직 개수 count
  const [count, setCount] = useRecoilState(LogicCountState);
  //로직 조건 개수 count
  const [isMultiCondition, setIsMultiCondition] =
    useRecoilState(MultiConditionState);
  const questionList = useRecoilValue(QuestionList);
  const questionListExceptMe = questionList.filter((question) => {
    if (Number(selNode) != 0)
      return nodes[Number(selNode) - 1].id != question.value;
  });

  useEffect(() => {
    //console.log(Number(Number(selNode) - 1));
  }, []);

  //로직 추가하기
  const addLogic = () => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const updatedCounts = [...count];
    let updatedLogics;

    //마지막 질문일 경우 next질문 0 (제출하기)
    if (Number(selNode) == surveyQuestions.length) {
      updatedLogics = {
        conditionOfQuestionAnswers: [""],
        nextQuestionNumber: "0",
      };
    }
    //마지막 질문 아닌경우 next질문 다음 번호
    else {
      updatedLogics = {
        conditionOfQuestionAnswers: [""],
        nextQuestionNumber: String(Number(selNode) + 1),
      };
    }

    updatedCounts[Number(selNode)] = updatedCounts[Number(selNode)] + 1;
    updatedQuestions[Number(selNode) - 1].logics.push(updatedLogics);

    setSurveyQuestions(updatedQuestions);
    setCount(updatedCounts);
  };

  //로직 삭제
  const DeleteLogic = (logicIndex: number) => {
    if (Number(selNode) == 0 || selNode === undefined) {
      console.error("selNode is 0 or undefined");
      return;
    }

    const questionIndex = Number(selNode);
    const select = JSON.parse(
      JSON.stringify(surveyQuestions[questionIndex - 1])
    );

    if (!select || !("logics" in select)) {
      console.error("logics is undefined");
      return;
    }

    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const updatedCounts = [...count];

    const newLogics = [...select.logics];
    newLogics.splice(logicIndex, 1);

    const updatedQuestion = {
      ...select,
      logics: newLogics,
    };

    //updatedQuestions[questionIndex].logics = newLogics;
    updatedQuestions[questionIndex - 1] = updatedQuestion;

    //console.log(updatedQuestions);
    setSurveyQuestions(updatedQuestions);
    setCount(updatedCounts);
  };

  //로직->조건 변경시 호출. node위치 및 edge 변경 필요
  const ConditionChange = (i: number, index2: number, value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const selNodeNumber = Number(Number(selNode) - 1);
    const targetLogic = updatedQuestions[selNodeNumber].logics[i];
    targetLogic.conditionOfQuestionAnswers[index2] = value;

    setSurveyQuestions(updatedQuestions);
  };

  //다음 질문 수정될때 node, edge 바뀜
  const NextQuestionChange = (i: number, value: string) => {
    //SurveyQuestion 변경
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;

    updatedQuestions[questionIndex].logics[i].nextQuestionNumber = "" + value;
    setSurveyQuestions(updatedQuestions);

    //Node, Edge 변경
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value + "-animated",
      source: String(selNode),
      target: String(value),
      animated: true,
    };

    const originValue =
      updatedQuestions[questionIndex].logics[i].nextQuestionNumber;
    const rootXAxis = updatedNodes[questionIndex].position.x;

    //변경이 필요한 노드들의 위치를 수정
    if (value == "0") {
      updatedNodes.forEach((node: Node) => {
        if (Number(node.id) > Number(selNode)) {
          node.position.x = rootXAxis + 100;
          console.log(node);
        }
      });
    } else if (value != updatedQuestions[questionIndex].nextQuestionNumber) {
      updatedNodes.forEach((node: Node) => {
        if (
          node.id === String(selNode) ||
          node.id === String(value) ||
          node.id === "0" ||
          Number(node.id) < Number(selNode) ||
          Number(node.id) > Number(value)
        ) {
          node.position.x = rootXAxis;
        } else {
          node.position.x = rootXAxis + 100;
        }
      });
    }

    //다음질문이 여러번 변경되면 그 전에 저장되었던 다음 질문과 연결된 edge 제거하기
    updatedEdges = updatedEdges.filter((edge: Edge) => {
      return !(
        edge.source === selNode &&
        edge.target == originValue &&
        edge.animated
      );
    });

    //다음질문이 기본이동과 동일하지 않을때만 edge 생성
    if (value != updatedQuestions[questionIndex].nextQuestionNumber) {
      updatedEdges.push(newEdge);
    }

    setEdges(updatedEdges);
    setNodes(updatedNodes);
  };

  //로직 설정 안하고 다음 질문 설정할때 호출 -> 생성이랑 합친 후 node위치 및 edge 수정 필요
  const NoLogicChangeNext = (value: string) => {
    //SurveyQuestion 변경
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;

    updatedQuestions[questionIndex].nextQuestionNumber = "" + value;
    setSurveyQuestions(updatedQuestions);

    //Node, Edge 변경
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value,
      source: String(selNode),
      target: String(value),
    };

    const originValue = updatedQuestions[questionIndex].nextQuestionNumber;
    const submitYAxis = updatedNodes[idNum].position.y;

    //선택한 값이 기존 값과 다를때만 Node, Edge 변경
    if (value != originValue) {
      if (Number(value) == 0) {
        updatedNodes.forEach((node: Node) => {
          if (node.id == selNode) {
            node.position.x = node.position.x - 70;
            node.position.y = submitYAxis;
          } else if (node.id > value) {
            node.position.x = node.position.x + 70;
          }
        });

        updatedEdges = updatedEdges.filter((edge: Edge) => {
          return !(edge.source === selNode && edge.target == originValue);
        });
        updatedEdges.push(newEdge);
      } else {
        updatedNodes.forEach((node: Node) => {
          if (node.id == selNode) {
            node.position.x = node.position.x - 70;
            node.position.y = updatedNodes[value].position.y;
          } else if (node.id < value) {
            node.position.x = node.position.x + 70;
          }
        });

        updatedEdges = updatedEdges.filter((edge: Edge) => {
          return !(edge.source === selNode && edge.target == originValue);
        });
        updatedEdges.push(newEdge);
      }
    }
    setEdges(updatedEdges);
    setNodes(updatedNodes);
  };

  return (
    <div>
      <SideBar>
        {selNode === undefined || selNode === "0" || select === undefined ? (
          <div>질문을 선택해 주세요</div>
        ) : (
          <div>
            <div>질문 {selNode}</div>
            <div>
              이동하기
              <Select
                value={
                  "nextQuestionNumber" in select
                    ? select.nextQuestionNumber
                    : "-1"
                }
                style={{ width: 120 }}
                onChange={NoLogicChangeNext}
                options={questionListExceptMe}
              />
            </div>
            {surveyQuestions[Number(Number(selNode) - 1)] &&
              surveyQuestions[Number(Number(selNode) - 1)].type ===
                "MULTIPLE" && (
                <>
                  <Button onClick={addLogic}>로직 추가 하기</Button>
                  {count[Number(selNode)] >= 0 ? (
                    <>
                      {"logics" in select ? (
                        select.logics.map((item, i) => (
                          <Accordion key={i}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>로직 {i + 1}</Typography>
                              <Button
                                onClick={(e: any) => {
                                  DeleteLogic(i);
                                }}
                                style={DeleteOption()}
                              >
                                X
                              </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                              <LogicBody>
                                조건 :
                                {isMultiCondition[Number(selNode)] > 0 &&
                                "conditionOfQuestionAnswers" in item &&
                                item.conditionOfQuestionAnswers != null &&
                                Array.isArray(
                                  item.conditionOfQuestionAnswers
                                ) ? (
                                  <>
                                    {item.conditionOfQuestionAnswers.length >
                                      0 && (
                                      <ConditionSection>
                                        {[
                                          ...Array(
                                            parseInt(
                                              String(
                                                select.numberOfAnswerChoices
                                              )
                                            )
                                          ),
                                        ].map((n, index) => {
                                          if ("answers" in select) {
                                            return (
                                              <Select
                                                key={index}
                                                value={
                                                  select.logics[i]
                                                    .conditionOfQuestionAnswers[
                                                    index
                                                  ]
                                                }
                                                style={{ width: 120 }}
                                                onChange={(e) =>
                                                  ConditionChange(i, index, e)
                                                }
                                                options={select.answers.map(
                                                  (answer) => ({
                                                    label: answer,
                                                    value: answer,
                                                  })
                                                )}
                                              />
                                            );
                                          } else {
                                            return <div key={index}></div>;
                                          }
                                        })}
                                      </ConditionSection>
                                    )}
                                  </>
                                ) : (
                                  <div></div>
                                )}
                              </LogicBody>
                              <LogicBottom>
                                이동 :
                                <Select
                                  value={
                                    "nextQuestionNumber" in item
                                      ? item.nextQuestionNumber
                                      : "0"
                                  }
                                  style={{ width: 120 }}
                                  onChange={(e: string) =>
                                    NextQuestionChange(i, e)
                                  }
                                  options={questionListExceptMe}
                                />
                              </LogicBottom>
                            </AccordionDetails>
                          </Accordion>
                        ))
                      ) : (
                        <div></div>
                      )}
                      <div>
                        {JSON.stringify(surveyQuestions[Number(selNode) - 1])}
                      </div>
                    </>
                  ) : (
                    <div></div>
                  )}
                </>
              )}
          </div>
        )}
      </SideBar>
    </div>
  );
};
