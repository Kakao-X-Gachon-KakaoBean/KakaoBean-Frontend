import { atom } from "recoil";
import { Edge, Node } from "react-flow-renderer";
import { Logic } from "@components/LogicTab/type";

export const SelNodeState = atom<string>({
  key: "selNode",
  default: "",
});

export const IdNumState = atom<number>({
  key: "id_num",
  default: 1,
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

export const LogicState = atom<Logic[]>({
  key: "logics",
  default: [
    {
      id: "0",
      logics: [{ conditionOfQuestionAnswers: [], nextQuestionNumber: "0" }],
    },
  ],
});

export const LogicCountState = atom<number[]>({
  key: "count",
  default: [0],
});

export const MultiConditionState = atom<number[]>({
  key: "isMultiCondition",
  default: [0],
});

export const QuestionList = atom<any[]>({
  key: "QuestionList",
  default: [],
});
