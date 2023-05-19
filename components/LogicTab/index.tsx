import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
} from "react-flow-renderer";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { SelNodeState, NodeState, EdgeState } from "../../States/LogicState";

export default function LogicTab() {
  const nodes = useRecoilValue(NodeState);
  const edges = useRecoilValue(EdgeState);

  // 현재 선택한 노드
  const [selNode, setSelNode] = useRecoilState(SelNodeState);

  //노드 클릭하면 selNode에다가 아이디 넣어주기
  const onNodeClick = useCallback(
    (event) => {
      if (Number(Object.values(event.currentTarget.dataset.id)) == 0) {
        setSelNode("0");
        //console.log("submit button");
      } else {
        const nodes = Object.values(event.currentTarget.parentNode.childNodes);
        const clickedIndex = nodes.indexOf(event.currentTarget);
        setSelNode(String(clickedIndex + 1));
        console.log(clickedIndex + 1);
      }
    },
    [setSelNode]
  );

  useEffect(() => {
    setSelNode("0");
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        elementsSelectable={true}
        nodesConnectable={false}
        nodesDraggable={true}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeClick}
      >
        <Controls />
        <Background gap={30} size={1} />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
