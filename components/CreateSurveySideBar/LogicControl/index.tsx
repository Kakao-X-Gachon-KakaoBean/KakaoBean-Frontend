import React, { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "react-flow-renderer";
import { Logic } from "@components/CreateSurveySideBar/LogicControl/type";
import {
  ConditionSection,
  LogicBody,
  LogicBottom,
  SelectSection,
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
  LogicState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../../States/LogicState";
import { questionsState } from "../../../States/SurveyState";
import { update } from "autosize";

export const LogicControl = () => {
  // 전체 질문
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState);

  const [nodes, setNodes] = useRecoilState(NodeState);
  const [edges, setEdges] = useRecoilState(EdgeState);
  // 현재 선택한 노드
  const selNode = useRecoilValue(SelNodeState);
  const idNum = useRecoilValue(IdNumState);
  const [logics, setLogics] = useRecoilState(LogicState);

  //로직 개수 count
  const [count, setCount] = useRecoilState(LogicCountState);
  //로직 조건 개수 count
  const [isMultiCondition, setIsMultiCondition] =
    useRecoilState(MultiConditionState);
  const questionList = useRecoilValue(QuestionList);

  useEffect(() => {
    console.log("전체 질문 정보: ", surveyQuestions);
  }, [surveyQuestions]);
  //로직 추가하기
  const addLogic = () => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    const updatedCounts = [...count];

    //처음 추가 하는 경우
    if (count[Number(selNode)] == 0) {
      //마지막 질문일 경우 next질문 0 (제출하기)
      if (selNode == String(idNum - 1)) {
        updatedLogics[Number(selNode)] = {
          id: String(selNode),
          logics: [
            { conditionOfQuestionAnswers: [""], nextQuestionNumber: "0" },
          ],
        };
      }
      //마지막 질문 아닌경우 next질문 다음 번호
      else {
        updatedLogics[Number(selNode)] = {
          id: String(selNode),
          logics: [
            {
              conditionOfQuestionAnswers: [""],
              nextQuestionNumber: String(Number(selNode) + 1),
            },
          ],
        };
      }
    }
    //처음 추가하는게 아닌경우 기존 로직에다가 추가
    else {
      //마지막 질문일 경우 next질문 0 (제출하기)
      if (selNode == String(idNum - 1)) {
        updatedLogics[Number(selNode)] = {
          ...updatedLogics[Number(selNode)],
          logics: [
            ...updatedLogics[Number(selNode)].logics,
            { conditionOfQuestionAnswers: [""], nextQuestionNumber: "0" },
          ],
        };
      }
      //마지막 질문 아닌경우 next질문 다음 번호
      else {
        updatedLogics[Number(selNode)] = {
          ...updatedLogics[Number(selNode)],
          logics: [
            ...updatedLogics[Number(selNode)].logics,
            {
              conditionOfQuestionAnswers: [""],
              nextQuestionNumber: String(Number(selNode) + 1),
            },
          ],
        };
      }
    }

    //로직 개수 count에 ++
    updatedCounts[Number(selNode)] = updatedCounts[Number(selNode)] + 1;

    setLogics(updatedLogics);
    setCount(updatedCounts);
  };

  //로직 삭제
  const DeleteLogic = (i: number, value: string) => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));

    const newEdge: Edge = {
      id: "e" + selNode + "-" + value + "-animated",
      source: String(selNode),
      target: String(value),
      animated: true,
    };

    const originValue =
      updatedLogics[Number(selNode)].logics[i].nextQuestionNumber;
    const rootXAxis = updatedNodes[Number(selNode) - 1].position.x;

    updatedLogics[Number(selNode)].logics[i].nextQuestionNumber = "" + value;
    setLogics(updatedLogics);

    //변경이 필요한 노드들의 위치를 수정

    if (value == "0") {
      updatedNodes.forEach((node: Node) => {
        if (Number(node.id) > Number(selNode)) {
          node.position.x = rootXAxis + 100;
        }
      });
    } else if (value != updatedNodes[Number(selNode) - 1].data.nextQ) {
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
    if (value != updatedNodes[Number(selNode) - 1].data.nextQ) {
      updatedEdges.push(newEdge);
    }

    setEdges(updatedEdges);
    setNodes(updatedNodes);

    const updatedCounts = [...count];
    updatedLogics[Number(selNode)].logics.splice(i, 1);
    updatedCounts[Number(selNode)] = updatedCounts[Number(selNode)] - 1;
    setLogics(updatedLogics);
    setCount(updatedCounts);
  };

  //조건 추가 하기가
  const addCondition = (i: number) => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    const updateMultiCondition = JSON.parse(JSON.stringify(isMultiCondition));
    const times = updateMultiCondition[Number(selNode)] + 1;

    const originList =
      updatedLogics[Number(selNode)].logics[i].conditionOfQuestionAnswers;
    originList.push("");

    updatedLogics[Number(selNode)] = {
      ...updatedLogics[Number(selNode)],
      logics: [
        ...updatedLogics[Number(selNode)].logics,
        {
          conditionOfQuestionAnswers: originList,
          nextQuestionNumber: String(Number(selNode) + 1),
        },
      ],
    };

    updateMultiCondition[Number(selNode)] = times;
    setIsMultiCondition(updateMultiCondition);
  };

  //로직->조건 변경시 호출. node위치 및 edge 변경 필요
  const ConditionChange = (i: number, index: number, value: string) => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    const selNodeNumber = Number(selNode);
    const targetLogic = updatedLogics[selNodeNumber].logics[i];

    targetLogic.conditionOfQuestionAnswers[index] = value;

    setLogics(updatedLogics);
  };

  //조건 삭제
  const DeleteCondition = (i: number, index: number) => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    const selNodeNumber = Number(selNode);
    const targetLogic = updatedLogics[selNodeNumber].logics[i];
    console.log(targetLogic);

    targetLogic.conditionOfQuestionAnswers.splice(index, 1);
    setLogics(updatedLogics);
  };

  //다음 질문 수정될때 node, edge 바뀜
  const NextQuestionChange = (i: number, value: string) => {
    const updatedLogics = JSON.parse(JSON.stringify(logics));
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value + "-animated",
      source: String(selNode),
      target: String(value),
      animated: true,
    };

    const originValue =
      updatedLogics[Number(selNode)].logics[i].nextQuestionNumber;
    const rootXAxis = updatedNodes[Number(selNode) - 1].position.x;

    updatedLogics[Number(selNode)].logics[i].nextQuestionNumber = "" + value;
    setLogics(updatedLogics);

    //변경이 필요한 노드들의 위치를 수정

    if (value == "0") {
      updatedNodes.forEach((node: Node) => {
        if (Number(node.id) > Number(selNode)) {
          node.position.x = rootXAxis + 100;
        }
      });
    } else if (value != updatedNodes[Number(selNode) - 1].data.nextQ) {
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
    if (value != updatedNodes[Number(selNode) - 1].data.nextQ) {
      updatedEdges.push(newEdge);
    }

    setEdges(updatedEdges);
    setNodes(updatedNodes);
  };

  //로직 설정 안하고 다음 질문 설정할때 호출 -> 생성이랑 합친 후 node위치 및 edge 수정 필요
  const NoLogicChangeNext = (value: string) => {
    let updatedEdges = JSON.parse(JSON.stringify(edges));
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value,
      source: String(selNode),
      target: String(value),
    };

    updatedEdges = edges.filter(
      (edge: Edge) =>
        edge.source === selNode && edge.target === String(Number(selNode) + 1)
    );

    updatedNodes[Number(selNode) - 1].data.nextQ = value;

    let flag = updatedNodes.find((node: Node) => node.id === selNode);

    if (selNode && flag) {
      const selNodeY = flag.position.y;
      updatedNodes.forEach((node: Node) => {
        if (node.id < selNode && node.id > value) {
          node.position.x = node.position.x + 100;
          node.position.y = selNodeY;
        }
        if (node.id >= value) {
          node.position.x = node.position.x + 50;
        }
      });
    }

    updatedEdges.push(newEdge);
    setEdges(updatedEdges);
    setNodes(updatedNodes);
  };

  return (
    <div>
      <SideBar>
        {selNode === undefined || selNode === "0" ? (
          <div>질문을 선택해 주세요</div>
        ) : (
          <div>
            <div>질문 {selNode}</div>
            <div>
              이동하기
              {/*<Select*/}
              {/*  value={nodes[Number(selNode) - 1].data.nextQ}*/}
              {/*  style={{ width: 120 }}*/}
              {/*  onChange={NoLogicChangeNext}*/}
              {/*  options={questionList}*/}
              {/*/>*/}
            </div>
            <Button onClick={addLogic}>로직 추가 하기</Button>
            {count[Number(selNode)] > 0 ? (
              <>
                {logics[Number(selNode)].logics.map((logic, i) => (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>로직 {i + 1}</Typography>
                      <Button
                        onClick={(e: any) => {
                          DeleteLogic(i, e);
                        }}
                        style={DeleteOption()}
                      >
                        X
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      <LogicBody>
                        조건 :
                        <SelectSection>
                          {isMultiCondition[Number(selNode)] > 0 ? (
                            <>
                              {logic.conditionOfQuestionAnswers.map(
                                (condition, index) => (
                                  <ConditionSection>
                                    <Select
                                      key={index}
                                      value={
                                        logics[Number(selNode)].logics[i]
                                          .conditionOfQuestionAnswers[index]
                                      }
                                      style={{ width: 120 }}
                                      onChange={(e) =>
                                        ConditionChange(i, index, e)
                                      }
                                      options={[
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" },
                                        { value: "4", label: "4" },
                                      ]}
                                    />
                                    <Button
                                      onClick={() => {
                                        DeleteCondition(i, index);
                                      }}
                                      style={DeleteOption()}
                                    >
                                      X
                                    </Button>
                                  </ConditionSection>
                                )
                              )}
                            </>
                          ) : (
                            <div></div>
                          )}
                        </SelectSection>
                        와 같다면
                        <br />
                        <Button
                          onClick={() => {
                            addCondition(i);
                          }}
                        >
                          조건 추가 하기
                        </Button>
                      </LogicBody>
                      <LogicBottom>
                        이동 :
                        <Select
                          value={logic.nextQuestionNumber}
                          style={{ width: 120 }}
                          onChange={(e) => NextQuestionChange(i, e)}
                          options={questionList}
                        />
                      </LogicBottom>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <div>{JSON.stringify(logics[Number(selNode)])}</div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </SideBar>
    </div>
  );
};
