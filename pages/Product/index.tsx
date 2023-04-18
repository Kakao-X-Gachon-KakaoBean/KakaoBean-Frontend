import React, { useCallback, useEffect, useState } from "react";
import { Input } from "antd";
import ReactFlow, {
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  Background,
  Controls,
} from "react-flow-renderer";
import { RightSide, SideBar, Wrapper } from "@pages/Product/styles";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Submit" },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Product() {
  const [input, setInput] = useState("0");
  const [id, setId] = useState("1");
  const [x, setX] = useState(400);
  const [y, setY] = useState(100);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const inputChange = useCallback(() => {
    setId(id + 1);
    setY(y + 100);

    const newNode: Node = {
      id: id,
      type: "input",
      data: { label: "New One" },
      position: { x: x, y: y },
    };
    setNodes([...nodes, newNode]);
    console.log(nodes);
  }, [nodes, input]);

  // useEffect(() => {
  //   setId(id + 1);
  //   setY(y + 100);
  //
  //   const newNode: Node = {
  //     id: id,
  //     type: "input",
  //     data: { label: "New One" },
  //     position: { x: x, y: y },
  //   };
  //   setNodes([...nodes, newNode]);
  //   console.log(nodes);
  // }, [input]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputChange();
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
