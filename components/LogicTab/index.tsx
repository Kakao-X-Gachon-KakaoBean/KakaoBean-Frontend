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
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeClick}
          fitView
        >
          <Controls />
          <Background gap={30} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
