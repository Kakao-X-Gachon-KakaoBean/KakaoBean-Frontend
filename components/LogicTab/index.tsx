import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelNodeState, NodeState, EdgeState } from "../../States/LogicState";
import { currentTabState } from "../../States/SurveyState";

export default function LogicTab() {
  const nodes = useRecoilValue(NodeState);
  const edges = useRecoilValue(EdgeState);

  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  // 현재 선택한 노드
  const [selNode, setSelNode] = useRecoilState(SelNodeState);
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

  //노드 클릭하면 selNode에다가 아이디 넣어주기
  const onNodeClick = useCallback(
    (event: any) => {
      if (Number(Object.values(event.currentTarget.dataset.id)) == 0) {
        setSelNode("0");
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
    setCurrentTab("LogicControl");
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
