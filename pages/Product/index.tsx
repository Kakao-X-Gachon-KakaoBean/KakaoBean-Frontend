import React, { useCallback, useEffect, useState } from "react";
import { Input } from "antd";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
  Background,
  Controls,
} from "react-flow-renderer";
import { RightSide, SideBar, Wrapper } from "@pages/Product/styles";

const initialNodes: Node[] = [
  {
    id: "0",
    type: "input",
    data: { label: "Submit" },
    position: { x: 400, y: 0 },
  },
];
const tuple: Node[] = initialNodes;

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Product() {
  const [input, setInput] = useState("0");
  const [id, setId] = useState("1");
  const [x, setX] = useState(400);
  const [y, setY] = useState(100);
  const [nodes, setNodes, onNodesChange] = useNodesState(tuple);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    let i = 0;
    const newNodeTuple: Node[] = [];
    const newEdgeTuple: Edge[] = [];
    let id_num = 1;
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

      newNodeTuple.push(newNode);
      newEdgeTuple.push(newEdge);
      id_num += 1;
      yaxis += 100;
    }

    const submitNode = {
      id: String(id_num),
      type: "output",
      data: { label: "submit" },
      position: { x: x, y: yaxis },
    };

    const submitEdge = {
      id: "e_submit",
      source: String(id_num),
      target: "0",
    };

    newNodeTuple.push(submitNode);
    newEdgeTuple.push(submitEdge);

    setNodes(newNodeTuple);
    setEdges(newEdgeTuple);
    //console.log(newNodeTuple);
    //console.log(newEdgeTuple);
  }, []);

  return (
    <Wrapper>
      <SideBar>
        <div>응답에 따라 로직 구성</div>
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
