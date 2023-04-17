import React, { useCallback, useState } from "react";
import { Input } from "antd";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
  Background,
  MiniMap,
  Controls,
} from "react-flow-renderer";
import { RightSide, SideBar, Wrapper } from "@pages/Product/styles";

const initialNodes = [
  { id: "1", position: { x: 400, y: 100 }, data: { label: "Submit" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Product() {
  const [input, setInput] = useState("0");

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };

  return (
    <Wrapper>
      <SideBar>
        <Input onChange={onChangeInput}></Input>
        <text>응답에 따라 로직 구성</text>
      </SideBar>
      <RightSide>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          elementsSelectable={false}
          nodesConnectable={false}
          nodesDraggable={false}
        >
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </RightSide>
    </Wrapper>
  );
}
