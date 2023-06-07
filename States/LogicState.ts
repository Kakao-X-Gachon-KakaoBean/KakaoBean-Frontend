import { atom } from "recoil";
import { Edge, Node } from "react-flow-renderer";

export const SelNodeState = atom<string>({
  key: "selNode",
  default: "",
});

export const NodeState = atom<Node[]>({
  key: "nodes",
  default: [
    {
      id: "0",
      type: "input",
      data: { label: "Submit", nextQ: "0" },
      position: { x: 400, y: 0 },
    },
  ],
});

export const EdgeState = atom<Edge[]>({
  key: "edges",
  default: [{ id: "e1-2", source: "1", target: "2" }],
});

export const LogicCountState = atom<number[]>({
  key: "count",
  default: [0],
});

export const QuestionList = atom<any[]>({
  key: "QuestionList",
  default: [],
});
