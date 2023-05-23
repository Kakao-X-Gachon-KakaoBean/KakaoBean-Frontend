import React, { useEffect } from "react";
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
import { Logic } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { countState, questionsState } from "../../../States/SurveyState";
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
  const [questionList, setQuestionList] = useRecoilState(QuestionList);
  const questionListExceptMe = questionList.filter((question) => {
    if (Number(selNode) != 0)
      return nodes[Number(selNode) - 1].id != question.value;
  });

  const getRandomColor = () => {
    // 랜덤한 색상을 생성
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hasLogics = surveyQuestions.some(
    (question): question is MultipleQuestion => {
      return (
        "logics" in question && question.logics && question.logics.length > 0
      );
    }
  );

  const redrawNodeAndEdge = () => {
    // Node 설정
    const questionNodes: Node<any>[] = surveyQuestions.map(
      (question, index) => {
        if ("logics" in question && question.logics.length > 0) {
          return {
            id: question.id.toString().substring(15),
            data: {
              label: question.title ? question.title : "제목없음",
            },
            position: { x: 250, y: 5 + index * 100 },
          };
        } else if (hasLogics) {
          return {
            id: question.id.toString().substring(15),
            data: {
              label: question.title ? question.title : "제목없음",
            },
            position: { x: 350, y: 5 + index * 100 },
          };
        } else {
          return {
            id: question.id.toString().substring(15),
            data: {
              label: question.title ? question.title : "제목없음",
            },
            position: { x: 250, y: 5 + index * 100 },
          };
        }
      }
    );
    // 새로운 배열을 생성하고 제출 노드를 추가합니다.
    const submitNode: Node<any>[] = [
      {
        id: "0",
        type: "output",
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
    setNodes(initialNodes);

    // Edge 설정
    const initialEdges: Edge<any>[] = surveyQuestions
      .map((question) => {
        // node question 이 주관식, 혹은 선형배율식일 경우엔 nextQuestionNumber에 해당하는 노드를 찾아서 연결한다.
        if (question.type === "ESSAY" || question.type === "RANGE") {
          if (question.nextQuestionNumber === "0") {
            return {
              id: `${question.id.substring(15)}-0`,
              source: question.id.toString().substring(15),
              target: "0",
            };
          } else {
            const nextQuestion = surveyQuestions.find(
              (q) => q.questionNumber === question.nextQuestionNumber
            );
            if (!nextQuestion) {
              return {
                id: `${question.id.substring(15)}-0`,
                source: question.id.toString().substring(15),
                target: "0",
              };
            } else {
              return {
                id: `${question.id.substring(15)}-${nextQuestion.id.substring(
                  15
                )}`,
                source: question.id.toString().substring(15),
                target: nextQuestion.id.toString().substring(15),
              };
            }
          }
        }
        // node question이 객관식인 경우
        else if (question.type === "MULTIPLE" && "logics" in question) {
          // 로직이 존재하는 경우, 로직 length 만큼 edge를 생성한다.
          if (question.logics && question.logics.length > 0) {
            const logicEdges = question.logics.map((logic: Logic) => {
              if (logic.nextQuestionNumber === "0") {
                return {
                  id: `${question.id.substring(15)}-0 (logic)`,
                  source: question.id.toString().substring(15),
                  target: "0",
                  animated: true,
                  style: { stroke: getRandomColor() }, // 엣지의 색상을 랜덤으로 변경
                };
              } else {
                const nextQuestion = surveyQuestions.find(
                  (q) => q.questionNumber === logic.nextQuestionNumber
                );
                if (!nextQuestion) {
                  return {
                    id: `${question.id.substring(15)}-0 (logic)`,
                    source: question.id.toString().substring(15),
                    target: "0",
                    animated: true,
                    style: { stroke: getRandomColor() }, // 엣지의 색상을 랜덤으로 변경
                  };
                } else {
                  return {
                    id: `${question.id.substring(
                      15
                    )}-${nextQuestion.id.substring(15)} (logic)`,
                    source: question.id.toString().substring(15),
                    target: nextQuestion.id.toString().substring(15),
                    animated: true,
                    style: { stroke: getRandomColor() }, // 엣지의 색상을 랜덤으로 변경
                  };
                }
              }
            });

            if (question.nextQuestionNumber === "0") {
              return [
                ...logicEdges,
                {
                  id: `${question.id.substring(15)}-0`,
                  source: question.id.toString().substring(15),
                  target: "0",
                },
              ];
            } else {
              // 로직이 존재하던 존재하지 않던, 기본 이동도 추가한다.
              const nextQuestion = surveyQuestions.find(
                (q) => q.questionNumber === question.nextQuestionNumber
              );
              if (!nextQuestion) {
                return [
                  ...logicEdges,
                  {
                    id: `${question.id.substring(15)}-0`,
                    source: question.id.toString().substring(15),
                    target: "0",
                  },
                ];
              } else {
                return [
                  ...logicEdges,
                  {
                    id: `${question.id.substring(
                      15
                    )}-${nextQuestion.id.substring(15)}`,
                    source: question.id.toString().substring(15),
                    target: nextQuestion.id.toString().substring(15),
                  },
                ];
              }
            }
          } else {
            // 로직이 존재하지 않는 경우, 기본 이동만 구현한다.
            if (question.nextQuestionNumber === "0") {
              return {
                id: `${question.id.substring(15)}-0`,
                source: question.id.toString().substring(15),
                target: "0",
              };
            } else {
              const nextQuestion = surveyQuestions.find(
                (q) => q.questionNumber === question.nextQuestionNumber
              );
              if (!nextQuestion) {
                return {
                  id: `${question.id.substring(15)}-0`,
                  source: question.id.toString().substring(15),
                  target: "0",
                };
              } else {
                return {
                  id: `${question.id.substring(15)}-${nextQuestion.id.substring(
                    15
                  )}`,
                  source: question.id.toString().substring(15),
                  target: nextQuestion.id.toString().substring(15),
                };
              }
            }
          }
        }
      })
      .filter((edge): edge is Edge<any> => edge !== undefined)
      .flat(); // 배열 평탄화, logic 값에 의해 묶여진 배열을 평탄화한다.
    initialEdges.sort();
    console.log(initialEdges);
    setEdges(initialEdges);
  };

  const reDefineSurveyQuestion = () => {
    const updatedSurveyList = [];
    const sortedArray = [...surveyQuestions]; // 원래 배열을 변경하지 않고 새로운 배열을 생성합니다.

    sortedArray.sort((a, b) => {
      return Number(a.questionNumber) - Number(b.questionNumber); // questionNumber를 기준으로 오름차순 정렬합니다.
    });

    sortedArray.map((q) => {
      if (Number(q.id.substring(15)) + 1 == Number(q.nextQuestionNumber)) {
        return {
          ...q,
          id: "KEA-KakaoBeans-" + q.questionNumber,
          nextQuestionNumber: q.questionNumber + 1,
        };
      } else {
        return q;
      }
    });

    sortedArray.map((q, index) => {
      updatedSurveyList.push({
        value: q.questionNumber,
        label: q.questionNumber,
      });
      if (index == sortedArray.length - 1) {
        return {
          ...q,
          finalQuestion: true,
          nextQuestionNumber: "0",
        };
      }
    });
    updatedSurveyList.push({ value: "0", label: "제출하기" });
    setQuestionList(updatedSurveyList);
    setSurveyQuestions(sortedArray);
  };

  useEffect(() => {
    reDefineSurveyQuestion();
  }, []);

  useEffect(() => {
    redrawNodeAndEdge();

    console.log("Node!!");
    console.log(nodes);
    console.log("Edge!!");
    console.log(edges);
    console.log("SurveyQuestions!!");
    console.log(surveyQuestions);
    console.log("QuestionList!!");
    console.log(questionList);
  }, [surveyQuestions]);

  //로직 추가
  const addLogic = () => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const updatedCounts = [...count];
    let updatedLogics: {
      nextQuestionNumber: any;
      conditionOfQuestionAnswers?: string[];
    };

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

    updatedQuestions[questionIndex - 1] = updatedQuestion;
    setSurveyQuestions(updatedQuestions);
    setCount(updatedCounts);
  };

  //로직->조건 변경
  const ConditionChange = (i: number, index2: number, value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const selNodeNumber = Number(Number(selNode) - 1);
    const targetLogic = updatedQuestions[selNodeNumber].logics[i];
    targetLogic.conditionOfQuestionAnswers[index2] = value;

    setSurveyQuestions(updatedQuestions);
  };

  //다음 질문 수정
  const NextQuestionChange = (i: number, value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;

    updatedQuestions[questionIndex].logics[i].nextQuestionNumber = value;
    setSurveyQuestions(updatedQuestions);
  };

  //기본 이동 설정
  const NoLogicChangeNext = (value: string) => {
    const updatedQuestions = JSON.parse(JSON.stringify(surveyQuestions));
    const questionIndex = Number(selNode) - 1;
    let updatedNodes = JSON.parse(JSON.stringify(nodes));

    const originValue = updatedQuestions[questionIndex].nextQuestionNumber;
    const originNextValue = String(Number(selNode) + 1);
    const originNode = nodes.find((node) => Number(node.id) == Number(value));
    const submitUpperNodeYAxis =
      updatedNodes[surveyQuestions.length - 1].position.y;
    const targetUpperNode = nodes.find(
      (node) => Number(node.id) == Number(value) - 1
    );
    const targetUpperNodeYAxis = targetUpperNode?.position.y;

    updatedQuestions[questionIndex].nextQuestionNumber = value;
    setSurveyQuestions(updatedQuestions);

    //선택한 값이 기존 값과 다를때만 Node, Edge 변경
    // if (value != originValue) {
    //   if (Number(value) == 0) {
    //     updatedNodes.forEach((node: Node) => {
    //       if (Number(node.id) == Number(selNode)) {
    //         node.position.x = node.position.x - 100;
    //         node.position.y = submitUpperNodeYAxis;
    //       } else if (Number(node.id) != 0) {
    //         node.position.x = node.position.x + 100;
    //       }
    //     });
    //   } else if (value == originNextValue && originNode != undefined) {
    //     updatedNodes[questionIndex].position.x = originNode.position.x;
    //     updatedNodes[questionIndex].position.y =
    //       updatedNodes[questionIndex + 1].position.y - 100;
    //   } else if (
    //     (targetUpperNode != null || targetUpperNode != undefined) &&
    //     targetUpperNodeYAxis != null
    //   ) {
    //     updatedNodes.forEach((node: Node) => {
    //       if (Number(node.id) == Number(selNode)) {
    //         node.position.x = node.position.x - 100;
    //         node.position.y = targetUpperNodeYAxis;
    //       } else if (Number(node.id) != 0 && Number(node.id) < Number(value)) {
    //         node.position.x = node.position.x + 100;
    //       }
    //     });
    //   }
    // }
  };

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
                              {"conditionOfQuestionAnswers" in item &&
                              item.conditionOfQuestionAnswers != null &&
                              Array.isArray(item.conditionOfQuestionAnswers) ? (
                                <>
                                  {item.conditionOfQuestionAnswers.length >
                                    0 && (
                                    <ConditionSection>
                                      {[
                                        ...Array(
                                          parseInt(
                                            String(select.numberOfAnswerChoices)
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
                </LogicDiv>
              )}
          </div>
        )}
      </SideBar>
    </div>
  );
};
