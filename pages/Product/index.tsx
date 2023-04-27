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
import { Select } from "antd";

import { useRecoilState } from "recoil";
import { countState } from "../../States/SurveyState";
import { target } from "react-chatbot-kit/build/webpack.config";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "input",
    data: { label: "Submit", nextQ: "0" },
    position: { x: 400, y: 0 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

// 노드 아이디
let id_num = 1;
// 질문 목록
let QuestionList: any[] = [];

export default function Product() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // 현재 선택한 노드
  const [selNode, setSelNode] = useState<string>();

  const [logics, setLogics] = useState<Logic[]>([
    {
      id: "0",
      logics: [{ conditionOfQuestionAnswers: [], nextQuestionNumber: "0" }],
    },
  ]);

  //로직 개수 count
  const [count, setCount] = useState<number[]>([0]);
  //로직 조건 개수 count
  const [isMultiCondition, setIsMultiCondition] = useState<number[]>([0]);

  //로직 추가하기
  const addLogic = () => {
    const updatedLogics = [...logics];
    const updatedCounts = [...count];

    //처음 추가 하는 경우
    if (count[Number(selNode)] == 0) {
      //마지막 질문일 경우 next질문 0 (제출하기)
      if (selNode == String(id_num - 1)) {
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
      if (selNode == String(id_num - 1)) {
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

  //조건 추가 하기
  const addCondition = (i: number) => {
    const updatedLogics = [...logics];
    const updateMultiCondition = [...isMultiCondition];
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

  //노드 클릭하면 selNode에다가 아이디 넣어주기
  const onNodeClick = useCallback(
    (event) => {
      const targetId = Object.values(event.currentTarget.dataset.id);
      setSelNode(String(targetId));
      //console.log(targetId);
      //console.log(nodes);
    },
    [selNode]
  );

  //처음 실행될때 node, edge, logic, count, 멀티 로직 count 초기화
  useEffect(() => {
    let i = 0;
    const newNodeTuple: Node[] = [];
    const newEdgeTuple: Edge[] = [];
    let yaxis = 0;

    // 여기서 i < ? 숫자 바꾸면 그 갯수만큼 생성
    for (i; i < 5; i++) {
      let newNode, newEdge;
      if (i == 0) {
        newNode = {
          id: String(id_num),
          type: "input",
          data: { label: String(id_num), nextQ: String(id_num + 1) },
          position: { x: 400, y: yaxis },
        };
      } else {
        newNode = {
          id: String(id_num),
          data: { label: String(id_num), nextQ: String(id_num + 1) },
          position: { x: 400, y: yaxis },
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
      setIsMultiCondition((prevVal) => [...prevVal, 1]);
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
      position: { x: 400, y: yaxis },
    };

    const submitEdge = {
      id: "e_submit",
      source: String(id_num - 1),
      target: "0",
    };

    newNodeTuple.push(submitNode);
    newEdgeTuple.push(submitEdge);
    QuestionList.push({ value: 0, label: "제출하기" });

    console.log(newNodeTuple);
    setNodes(newNodeTuple);
    setEdges(newEdgeTuple);
  }, []);

  //로직->조건 변경시 호출. node위치 및 edge 변경 필요
  const ConditionChange = (i: number, index: number, value: string) => {
    const updatedLogics = [...logics];
    const selNodeNumber = Number(selNode);
    const targetLogic = updatedLogics[selNodeNumber].logics[i];

    targetLogic.conditionOfQuestionAnswers[index] = value;

    setLogics(updatedLogics);
    //console.log(logics[selNodeNumber].logics[i]);
  };

  //다음 질문 수정될때 node, edge 바뀜
  const NextQuestionChange = (i: number, value: string) => {
    const updatedLogics = [...logics];
    let updatedEdges = [...edges];
    let updatedNodes = [...nodes];
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
      updatedNodes.forEach((node) => {
        if (Number(node.id) > Number(selNode)) {
          node.position.x = rootXAxis + 100;
        }
      });
    } else if (value != updatedNodes[Number(selNode) - 1].data.nextQ) {
      updatedNodes.forEach((node) => {
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
    updatedEdges = updatedEdges.filter((edge) => {
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
    let updatedEdges = [...edges];
    let updatedNodes = [...nodes];
    const newEdge: Edge = {
      id: "e" + selNode + "-" + value,
      source: String(selNode),
      target: String(value),
    };

    updatedEdges = edges.filter(
      (edge) =>
        edge.source === selNode && edge.target === String(Number(selNode) + 1)
    );

    updatedNodes[Number(selNode) - 1].data.nextQ = value;

    let flag = updatedNodes.find((node) => node.id === selNode);

    if (selNode && flag) {
      const selNodeY = flag.position.y;
      updatedNodes.forEach((node) => {
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
    <Wrapper>
      <SideBar>
        {selNode === undefined || selNode === "0" ? (
          <div>질문을 선택해 주세요</div>
        ) : (
          <div>
            <div>질문 {selNode}</div>
            <div>
              이동하기
              <Select
                value={nodes[Number(selNode) - 1].data.nextQ}
                style={{ width: 120 }}
                onChange={NoLogicChangeNext}
                options={QuestionList}
              />
            </div>

            <Button onClick={addLogic}>로직 추가 하기</Button>
            {count[Number(selNode)] > 0 ? (
              <>
                {logics[Number(selNode)].logics.map((logic, i) => (
                  <div key={i}>
                    <div>로직 {i + 1}</div>
                    <div>
                      조건 :
                      <div>
                        {isMultiCondition[Number(selNode)] > 0 ? (
                          <>
                            {logic.conditionOfQuestionAnswers.map(
                              (condition, index) => (
                                <Select
                                  key={index}
                                  value={
                                    logics[Number(selNode)].logics[i]
                                      .conditionOfQuestionAnswers[index]
                                  }
                                  style={{ width: 120 }}
                                  onChange={(e) => ConditionChange(i, index, e)}
                                  options={[
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                    { value: "4", label: "4" },
                                  ]}
                                />
                              )
                            )}
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      와 같다면
                      <br />
                      <Button
                        onClick={(e) => {
                          addCondition(i);
                        }}
                      >
                        조건 추가 하기
                      </Button>
                    </div>
                    <div>
                      이동 :
                      <Select
                        value={logic.nextQuestionNumber}
                        style={{ width: 120 }}
                        onChange={(e) => NextQuestionChange(i, e)}
                        options={QuestionList}
                      />
                    </div>
                  </div>
                ))}
                <div>{JSON.stringify(logics[Number(selNode)])}</div>
              </>
            ) : (
              <div></div>
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
