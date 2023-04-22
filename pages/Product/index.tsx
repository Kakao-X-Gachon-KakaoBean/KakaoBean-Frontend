import React, { useCallback, useEffect, useState } from "react";
import { Button } from "antd";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { Logic } from "@pages/Product/type";
import { RightSide, SideBar, Wrapper } from "@pages/Product/styles";
import { Select, Space } from "antd";

import { useRecoilState } from "recoil";
import { countState } from "../../States/SurveyState";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "input",
    data: { label: "Submit" },
    position: { x: 400, y: 0 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
//추가 예정
const defaultViewport = { x: 400, y: 0, zoom: 1.5 };
let id_num = 1;
let QuestionList: any[] = [];
let multiPossible = true;

export default function Product() {
  const [input, setInput] = useState("0");
  const [id, setId] = useState("1");
  const [x, setX] = useState(400);
  const [y, setY] = useState(100);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selNode, setSelNode] = useState<string>();

  const [logics, setLogics] = useState<Logic[]>([
    {
      id: "0",
      logics: [{ conditionOfQuestionAnswers: [], nextQuestionNumber: "0" }],
    },
  ]);

  const [count, setCount] = useState<number[]>([0]);

  const addLogic = () => {
    const updatedLogics = [...logics];
    const updatedCounts = [...count];

    //처음 추가 하는 경우
    if (count[Number(selNode)] == 0) {
      if (selNode == String(id_num - 1)) {
        updatedLogics[Number(selNode)] = {
          id: String(selNode),
          logics: [
            { conditionOfQuestionAnswers: ["0"], nextQuestionNumber: "0" },
          ],
        };
      } else {
        updatedLogics[Number(selNode)] = {
          id: String(selNode),
          logics: [
            {
              conditionOfQuestionAnswers: ["0"],
              nextQuestionNumber: String(Number(selNode) + 1),
            },
          ],
        };
      }
    }
    //처음 추가하는게 아닌경우
    else {
      if (selNode == String(id_num - 1)) {
        updatedLogics[Number(selNode)] = {
          ...updatedLogics[Number(selNode)],
          logics: [
            ...updatedLogics[Number(selNode)].logics,
            { conditionOfQuestionAnswers: ["0"], nextQuestionNumber: "0" },
          ],
        };
      } else {
        updatedLogics[Number(selNode)] = {
          ...updatedLogics[Number(selNode)],
          logics: [
            ...updatedLogics[Number(selNode)].logics,
            {
              conditionOfQuestionAnswers: ["0"],
              nextQuestionNumber: String(Number(selNode) + 1),
            },
          ],
        };
      }
    }

    updatedCounts[Number(selNode)] = count[Number(selNode)] + 1;

    setLogics(updatedLogics);
    setCount(updatedCounts);
  };

  const onNodeClick = useCallback(
    (event) => {
      const targetId = Object.values(event.currentTarget.dataset.id);
      setSelNode(String(targetId));
      //console.log(count);
    },
    [selNode]
  );

  useEffect(() => {
    let i = 0;
    const newNodeTuple: Node[] = [];
    const newEdgeTuple: Edge[] = [];
    let yaxis = 0;

    // 여기서 i < ? 숫자 바꾸면 그 갯수만큼 생성
    for (i; i < 3; i++) {
      let newNode, newEdge;
      if (i == 0) {
        newNode = {
          id: String(id_num),
          type: "input",
          data: { label: String(id_num) },
          position: { x: x, y: yaxis },
        };
      } else {
        newNode = {
          id: String(id_num),
          data: { label: String(id_num) },
          position: { x: x, y: yaxis },
        };
      }

      newEdge = {
        id: "e" + String(id_num) + "-" + String(id_num + 1),
        source: String(id_num),
        target: String(id_num + 1),
      };

      const newLogic: Logic = {
        id: String(id_num),
        logics: [
          {
            conditionOfQuestionAnswers: [],
            nextQuestionNumber: "",
          },
        ],
      };

      setCount((prevCount) => [...prevCount, 0]);
      setLogics((prevLogic) => [...prevLogic, newLogic]);
      newNodeTuple.push(newNode);
      newEdgeTuple.push(newEdge);
      QuestionList.push({ value: id_num, label: id_num });

      id_num += 1;
      yaxis += 100;
    }

    const submitNode = {
      id: "0",
      type: "output",
      data: { label: "submit" },
      position: { x: x, y: yaxis },
    };

    const submitEdge = {
      id: "e_submit",
      source: String(id_num - 1),
      target: "0",
    };

    newNodeTuple.push(submitNode);
    newEdgeTuple.push(submitEdge);

    setNodes(newNodeTuple);
    setEdges(newEdgeTuple);
  }, []);

  const ConditionChange = (i: number, value: string) => {
    const updatedLogics = [...logics];
    const selNodeNumber = Number(selNode);
    const targetLogic = updatedLogics[selNodeNumber].logics[i];
    const isInitialValue = targetLogic.conditionOfQuestionAnswers[0] === "0";

    if (multiPossible) {
      if (isInitialValue) {
        targetLogic.conditionOfQuestionAnswers = [value];
      } else {
        if (!targetLogic.conditionOfQuestionAnswers.includes(value)) {
          targetLogic.conditionOfQuestionAnswers.push(value);
        }
      }
    }
    // 중복 허용되지 않을 때 처리
    else {
      const updatedLogics = logics.map((logic, index) => {
        if (index !== Number(selNode)) {
          return logic;
        } else {
          const updatedLogic = {
            id: logic.id,
            logics: logic.logics.map((condition, conditionIndex) => {
              if (conditionIndex !== i) {
                return condition;
              } else {
                return {
                  conditionOfQuestionAnswers: [value],
                  nextQuestionNumber: condition.nextQuestionNumber,
                };
              }
            }),
          };
          return updatedLogic;
        }
      });
    }

    setLogics(updatedLogics);
  };

  const NextQuestionChange = (i: number, value: string) => {
    const updatedLogics = [...logics];
    let updatedEdges = [...edges];
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value,
      source: String(selNode),
      target: String(value),
    };

    updatedLogics[Number(selNode)].logics[i].nextQuestionNumber = value;
    setLogics(updatedLogics);

    if (i == 0) {
      updatedEdges = edges.filter((edge) => edge.source !== selNode);
    }
    updatedEdges.push(newEdge);
    setEdges(updatedEdges);

    console.log(edges);
  };

  return (
    <Wrapper>
      <SideBar>
        {selNode === undefined || selNode === "0" ? (
          <div>질문을 선택해 주세요</div>
        ) : (
          <div>
            <div>질문 {selNode}</div>
            <Button
              onClick={(e) => {
                addLogic();
              }}
            >
              로직 추가 하기
            </Button>
            {count[Number(selNode)] > 0 ? (
              <>
                {logics[Number(selNode)].logics.map((logic, i) => (
                  <div key={i}>
                    <div>로직 {i + 1}</div>
                    {multiPossible ? (
                      <div>
                        조건 :
                        <Select
                          defaultValue={logic.conditionOfQuestionAnswers[0]}
                          style={{ width: 120 }}
                          onChange={(e) => ConditionChange(i, e)}
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                        <Select
                          defaultValue={logic.conditionOfQuestionAnswers[1]}
                          style={{ width: 120 }}
                          onChange={(e) => ConditionChange(i, e)}
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                      </div>
                    ) : (
                      <div>
                        조건 :
                        <Select
                          defaultValue={logic.conditionOfQuestionAnswers[0]}
                          style={{ width: 120 }}
                          onChange={(e) => ConditionChange(i, e)}
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                          ]}
                        />
                      </div>
                    )}
                    <div>
                      다음질문 :
                      <Select
                        defaultValue={logic.nextQuestionNumber}
                        style={{ width: 120 }}
                        onChange={(e) => NextQuestionChange(i, e)}
                        options={QuestionList}
                      />
                    </div>
                    {/*<div>{JSON.stringify(logic)}</div>*/}
                  </div>
                ))}
                <div>{JSON.stringify(logics[Number(selNode)])}</div>
              </>
            ) : (
              <div>로직이 없습니다.</div>
            )}
          </div>
        )}
      </SideBar>
      <RightSide>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            elementsSelectable={true}
            nodesConnectable={false}
            nodesDraggable={true}
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Background gap={30} size={1} />
          </ReactFlow>
        </ReactFlowProvider>
      </RightSide>
    </Wrapper>
  );
}
