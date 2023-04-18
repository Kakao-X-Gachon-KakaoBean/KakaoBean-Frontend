import React, { useCallback, useEffect, useState } from "react";
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
import { Node } from "./type";
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Product() {
  const [input, setInput] = useState("0");
  const [id, setId] = useState(1);
  const [x, setX] = useState(400);
  const [y, setY] = useState(100);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([
    { id: "1", position: { x: 400, y: 100 }, data: { label: "Submit" } },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const inputChange = useCallback(() => {
    setId(id + 1);
    setY(y + 100);
    const newNode = [
      {
        id: id,
        position: { x: x, y: y },
        data: { label: "New One" },
      },
    ];
    setNodes([...nodes, newNode]);
  }, [input]);

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
          <Background gap={30} size={1} />
        </ReactFlow>
      </RightSide>
    </Wrapper>
  );
}
