import React, { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "react-flow-renderer";
import {
  ConditionSection,
  LogicBody,
  LogicBottom,
  SideBar,
  LogicBodyHeader,
  QuestionNumDiv,
  OptionHeader,
  DefaultMoveDiv,
  LogicDiv,
  AccordionDiv,
  AddLogicButton,
  AccordionSummaryDiv,
} from "@components/CreateSurveySideBar/LogicControl/styles";
import { Button, Select } from "antd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteOption } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/styles";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SelNodeState,
  NodeState,
  EdgeState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../../States/LogicState";
import { questionsState } from "../../../States/SurveyState";
import { MultipleQuestion } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";

export const LogicControl = () => {
  type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;

  // 전체 질문
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);
  const [nodes, setNodes] = useRecoilState(NodeState);
  const [edges, setEdges] = useRecoilState(EdgeState);
  // 현재 선택한 노드
  const selNode = useRecoilValue(SelNodeState);
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

  const isNoLogic = () => {
    const QuestionsList = JSON.parse(JSON.stringify(surveyQuestions));
    console.log("isLogicStart");
    let i = 0;
    if (QuestionsList != undefined) {
      MainLoop: for (i; i < QuestionsList.length; i++) {
        if (i == QuestionsList.length - 1) {
          console.log("맨 마지막 문제");
          if (QuestionsList[i]?.nextQuestionNumber != "0") {
            console.log("마지막 문제가 0이 아님");
            break;
          } else if ("logics" in QuestionsList[i]) {
            let j = 0;
            for (j; QuestionsList[i].logics.length; j++) {
              if (QuestionsList[i].logics[j]?.nextQuestionNumber != "0") {
                console.log("모든 로직에서 이동이 다음 문제가 아님");
                console.log("원래 다음 문제 : " + "0");
                console.log(QuestionsList[i].logics[j]?.nextQuestionNumber);
                break MainLoop;
              }
            }
          }
        } else {
          console.log("마지막 문제 아닌것");
          if (QuestionsList[i]?.nextQuestionNumber != String(i + 2)) {
            console.log("다음 문제가 아님");
            break;
          } else if ("logics" in QuestionsList[i]) {
            let j = 0;
            for (j; QuestionsList[i].logics.length; j++) {
              if (
                QuestionsList[i].logics[j]?.nextQuestionNumber != String(i + 2)
              ) {
                console.log("모든 로직에서 이동이 다음 문제가 아님");
                console.log("원래 다음 문제 : " + String(i + 2));
                console.log(QuestionsList[i].logics[j]?.nextQuestionNumber);
                break MainLoop;
              }
            }
          }
        }
      }
      console.log("result");
      console.log(i);
      console.log(QuestionsList.length);

      return i == QuestionsList.length;
    }
  };

  const resetNodeAndEdge = () => {
    const newNodeTuple: Node[] = [];
    const newEdgeTuple: Edge[] = [];
    let newNode, newEdge;
    let yaxis = 30;
    let i = 0;

    for (i = 0; i < surveyQuestions.length; i++) {
      if (i == 0) {
        newNode = {
          id: String(i + 1),
          type: "input",
          data: {
            label:
              surveyQuestions[i].title !== ""
                ? surveyQuestions[i].title
                : "제목 없음",
          },
          position: { x: 500, y: yaxis },
        };
      } else {
        if (i == surveyQuestions.length - 1) {
          newNode = {
            id: String(i + 1),
            data: {
              label:
                surveyQuestions[i].title !== ""
                  ? surveyQuestions[i].title
                  : "제목 없음",
            },
            position: { x: 500, y: yaxis },
          };
        } else {
          newNode = {
            id: String(i + 1),
            data: {
              label:
                surveyQuestions[i].title !== ""
                  ? surveyQuestions[i].title
                  : "제목 없음",
            },
            position: { x: 500, y: yaxis },
          };
        }
      }
      newEdge = {
        id: "e" + String(i + 1) + "-" + String(i + 2),
        source: String(i + 1),
        target: String(i + 2),
      };

      newNodeTuple.push(newNode);
      newEdgeTuple.push(newEdge);

      yaxis += 100;
    }
    const submitNode = {
      id: "0",
      type: "output",
      data: { label: "submit" },
      position: { x: 500, y: yaxis },
    };

    const submitEdge = {
      id: "e_submit",
      source: String(i),
      target: "0",
    };

    newNodeTuple.push(submitNode);
    newEdgeTuple.push(submitEdge);
    setNodes(newNodeTuple);
    setEdges(newEdgeTuple);
    console.log("No Logic!!");
  };

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

    if (isNoLogic()) {
      resetNodeAndEdge();
    } else {
      const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
      let updatedEdges = JSON.parse(JSON.stringify(edges));
      const updatedCounts = [...count];

      updatedEdges = updatedEdges.filter((edge: Edge) => {
        return !(
          edge.source === selNode &&
          edge.target == select.logics[logicIndex].nextQuestionNumber &&
          edge.animated
        );
      });

      const newLogics = [...select.logics];
      newLogics.splice(logicIndex, 1);

      const updatedQuestion = {
        ...select,
        logics: newLogics,
      };

      updatedQuestions[questionIndex - 1] = updatedQuestion;
      setSurveyQuestions(updatedQuestions);

      setEdges(updatedEdges);

      setCount(updatedCounts);
    }
  };

  //로직->조건 변경시 호출.
  const ConditionChange = (i: number, index2: number, value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const selNodeNumber = Number(Number(selNode) - 1);
    const targetLogic = updatedQuestions[selNodeNumber].logics[i];
    targetLogic.conditionOfQuestionAnswers[index2] = value;

    setSurveyQuestions(updatedQuestions);
  };

  //다음 질문 수정될때 node, edge 바뀜
  const NextQuestionChange = (i: number, value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;
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
    const originNextValue = String(Number(selNode) + 1);
    const rootXAxis = updatedNodes[questionIndex].position.x;

    updatedQuestions[questionIndex].logics[i].nextQuestionNumber = value;
    setSurveyQuestions(updatedQuestions);

    //변경이 필요한 노드들의 위치를 수정
    if (value != originValue) {
      if (Number(value) == 0) {
        updatedNodes.forEach((node: Node) => {
          if (Number(node.id) > Number(selNode)) {
            node.position.x = rootXAxis + 100;
          }
        });
      } else if (value == originNextValue) {
        updatedNodes.forEach((node: Node) => {
          if (Number(node.id) > Number(selNode)) {
            node.position.x = node.position.x - 100;
          }
        });
      } else {
        updatedNodes.forEach((node: Node) => {
          if (
            Number(node.id) > Number(selNode) &&
            Number(node.id) < Number(value)
          ) {
            node.position.x = node.position.x + 100;
          }
        });
      }

      updatedEdges = updatedEdges.filter((edge: Edge) => {
        return !(
          edge.source === selNode &&
          edge.target == originValue &&
          edge.animated == true
        );
      });
      updatedEdges.push(newEdge);
    }

    if (isNoLogic()) {
      resetNodeAndEdge();
    } else {
      setEdges(updatedEdges);
      setNodes(updatedNodes);
    }
  };

  //로직 설정 안하고 다음 질문 설정할때 호출 -> 생성이랑 합친 후 node위치 및 edge 수정 필요
  const NoLogicChangeNext = (value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value,
      source: String(selNode),
      target: String(value),
    };

    const originValue = updatedQuestions[questionIndex].nextQuestionNumber;
    const originNextValue = String(Number(selNode) + 1);
    const originNode = nodes.find((node) => Number(node.id) == Number(value));
    const submitUpperNodeYAxis = updatedNodes[nodes.length - 2].position.y;
    const targetUpperNode = nodes.find(
      (node) => Number(node.id) == Number(value) - 1
    );
    const targetUpperNodeYAxis = targetUpperNode?.position.y;

    updatedQuestions[questionIndex].nextQuestionNumber = value;
    setSurveyQuestions(updatedQuestions);

    //선택한 값이 기존 값과 다를때만 Node, Edge 변경
    if (value != originValue) {
      if (Number(value) == 0) {
        updatedNodes.forEach((node: Node) => {
          if (Number(node.id) == Number(selNode)) {
            node.position.x = node.position.x - 100;
            node.position.y = submitUpperNodeYAxis;
          } else if (Number(node.id) != 0) {
            node.position.x = node.position.x + 100;
          }
        });
      } else if (value == originNextValue && originNode != undefined) {
        updatedNodes[questionIndex].position.x = originNode.position.x;
        updatedNodes[questionIndex].position.y =
          updatedNodes[questionIndex + 1].position.y - 100;
      } else if (
        (targetUpperNode != null || targetUpperNode != undefined) &&
        targetUpperNodeYAxis != null
      ) {
        updatedNodes.forEach((node: Node) => {
          if (Number(node.id) == Number(selNode)) {
            node.position.x = node.position.x - 100;
            node.position.y = targetUpperNodeYAxis;
          } else if (Number(node.id) != 0 && Number(node.id) < Number(value)) {
            node.position.x = node.position.x + 100;
          }
        });
      }

      updatedEdges = updatedEdges.filter((edge: Edge) => {
        return !(edge.source === selNode && edge.target == originValue);
      });
      updatedEdges.push(newEdge);
    }

    if (isNoLogic()) {
      resetNodeAndEdge();
    } else {
      setEdges(updatedEdges);
      setNodes(updatedNodes);
    }
  };

  useEffect(() => {
    const updatedQuestions = surveyQuestions.map((item, index) => {
      if (
        index == surveyQuestions.length - 1 &&
        "finalQuestion" in item &&
        "nextQuestionNumber"
      ) {
        const updatedItem = Object.assign({}, item, {
          finalQuestion: true,
          nextQuestionNumber: "0",
        });
        item = updatedItem;
      }
      return item;
    });
    setSurveyQuestions(() => updatedQuestions as QuestionTypes[]);

    console.log("Node!!");
    console.log(nodes);
    console.log("Edge!!");
    console.log(edges);
    console.log("SurveyQuestions!!");
    console.log(surveyQuestions);
  }, []);

  // useEffect(() => {
  //   isNoLogic();
  // }, [surveyQuestions]);

  return (
    <div>
      <SideBar>
        {selNode === undefined || selNode === "0" || select === undefined ? (
          <div style={{ fontWeight: "bold" }}>질문을 선택해 주세요</div>
        ) : (
          <div>
            <QuestionNumDiv>질문 {selNode}번</QuestionNumDiv>
            <DefaultMoveDiv>
              <OptionHeader>기본 이동</OptionHeader>
              <Select
                value={
                  "nextQuestionNumber" in select
                    ? select.nextQuestionNumber
                    : "-1"
                }
                style={{
                  width: "7rem",
                }}
                onChange={NoLogicChangeNext}
                options={questionListExceptMe}
              />
            </DefaultMoveDiv>
            {surveyQuestions[Number(Number(selNode) - 1)] &&
              surveyQuestions[Number(Number(selNode) - 1)].type ===
                "MULTIPLE" && (
                <LogicDiv>
                  <OptionHeader>로직</OptionHeader>
                  <AddLogicButton onClick={addLogic}>
                    <span style={{ color: "#039BA1" }}>+ 로직&nbsp;</span>추가
                    하기
                  </AddLogicButton>
                  {count[Number(selNode)] >= 0 ? (
                    <AccordionDiv>
                      {"logics" in select ? (
                        select.logics.map((item, i) => (
                          <Accordion
                            key={i}
                            style={{
                              marginTop: "1.3rem",
                              width: "100%",
                              boxShadow: "0 0 2px rgba(0,0,0,0.3)",
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <AccordionSummaryDiv>
                                <div style={{ fontWeight: "700" }}>
                                  로직 {i + 1}
                                </div>
                                <Button
                                  onClick={(e: any) => {
                                    DeleteLogic(i);
                                  }}
                                  style={DeleteOption()}
                                >
                                  X
                                </Button>
                              </AccordionSummaryDiv>
                            </AccordionSummary>
                            <AccordionDetails
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                              }}
                            >
                              <LogicBody>
                                <LogicBodyHeader>조건</LogicBodyHeader>
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
                                                style={{ width: 100 }}
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
                                <LogicBodyHeader>이동</LogicBodyHeader>
                                <Select
                                  value={
                                    "nextQuestionNumber" in item
                                      ? item.nextQuestionNumber
                                      : "0"
                                  }
                                  style={{ width: 100 }}
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
                    </AccordionDiv>
                  ) : (
                    <div></div>
                  )}
                </LogicDiv>
              )}
          </div>
        )}
      </SideBar>
    </div>
  );
};
