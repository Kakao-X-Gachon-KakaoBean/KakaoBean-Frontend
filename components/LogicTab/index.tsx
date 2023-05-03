import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Logic } from "@components/LogicTab/type";
import {
  SelNodeState,
  IdNumState,
  NodeState,
  EdgeState,
  LogicState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../States/LogicState";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "input",
    data: { label: "Submit", nextQ: "0" },
    position: { x: 400, y: 0 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function LogicTab() {
  const nodes = useRecoilValue(NodeState);
  const edges = useRecoilValue(EdgeState);
  useEffect(() => {
    // console.log(nodes);
    // console.log(edges);
  }, []);

  // 현재 선택한 노드
  const [selNode, setSelNode] = useRecoilState(SelNodeState);

  //노드 클릭하면 selNode에다가 아이디 넣어주기
  const onNodeClick = useCallback(
    (event) => {
      const targetId = Object.values(event.currentTarget.dataset.id);
      setSelNode(String(targetId));
      console.log(targetId);
      //console.log(nodes);
    },
    [selNode]
  );

  useEffect(() => {
    setSelNode("0");
  }, []);

  return (
    <div>
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
    </div>
  );
}
