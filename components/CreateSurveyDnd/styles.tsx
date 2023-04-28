import styled from "@emotion/styled";
import { Button } from "antd";

// dnd styles
export const getQuestionTypeItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  userSelect: "none",
  padding: 16,
  borderRadius: 10,
  margin: `0 0 8px 0`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 200,
  boxShadow: `0px 2px 4px rgba(0,0,0,0.3)`,
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

export const getQuestionTypeListStyle = (
  isDraggingOver: boolean
): React.CSSProperties => ({
  borderRadius: 10,
  background: isDraggingOver ? "white" : "white",
  padding: 8,
});

export const getQuestionsItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  borderRadius: 10,
  userSelect: "none",
  padding: 20,
  margin: `0 0 10px 0`,
  boxShadow: `0px 2px 4px rgba(0,0,0,0.3)`,
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

export const SidebarQuestion = styled(Button)`
  display: flex;
  width: 12.3rem;
  height: 3rem;
  margin-top: 0.2rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.3);
`;

export const SidebarQuestionTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.2rem;
`;

export const SidebarQuestionDelete = styled.div`
  margin-left: 0.1rem;
  flex-wrap: wrap;
`;

export const getQuestionsListStyle = (
  isDraggingOver: boolean
): React.CSSProperties => ({
  borderRadius: 10,
  border: "1px solid",
  borderColor: "D3D3D3",
  background: isDraggingOver ? "white" : "white",
  padding: `50px 100px 50px 100px`,
});

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
export const QuestionsAndType = styled.div`
  display: flex;
  flex: 1;
  position: fixed;
  left: 4rem;
  top: 10rem;
  padding-right: 1rem;
  margin: 0 auto;
  height: 30rem;
  overflow-y: scroll;
  z-index: 1;
  background-color: white;
`;

export const SidebarQuestions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 13rem;
`;

export const QuestionTypeListDiv = styled.div`
  display: flex;
  position: fixed;
  bottom: 5rem;
  margin-top: 1rem;
`;

export const QuestionsListDiv = styled.div`
  flex-grow: 1;
  padding-top: 10rem;
  margin-left: 33rem;
`;

export const LogicDiv = styled.div`
  flex-grow: 1;
  padding-top: 10rem;
  margin-left: 33rem;
`;
