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

export const getQuestionsItemNoneSelectedStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  borderRadius: 10,
  userSelect: "none",
  padding: 20,
  margin: `0 0 15px 0`,
  boxShadow: `0px 2px 4px rgba(0,0,0,0.3)`,
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

export const getQuestionsItemSelectedStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  borderRadius: 10,
  userSelect: "none",
  padding: 20,
  margin: `0 0 15px 0`,
  boxShadow: `0 0 1rem rgba(0,0,255,0.3)`,
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});

export const getQuestionsListStyle = (
  isDraggingOver: boolean
): React.CSSProperties => ({
  borderRadius: 10,
  border: "1px solid",
  borderColor: "D3D3D3",
  background: isDraggingOver ? "white" : "white",
  padding: `50px 70px 50px 70px`,
});

export const SidebarNoneSelectedQuestion = styled(Button)`
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
export const SidebarSelectedQuestion = styled(Button)`
  display: flex;
  width: 12.3rem;
  height: 3rem;
  margin-top: 0.2rem;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 0.4rem;
  background-color: rgba(0, 0, 200, 0.03);
  box-shadow: 1px 3px 1px rgb(0, 0, 200, 0.3);
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

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const QuestionsAndType = styled.div`
  display: flex;
  position: fixed;
  left: 4rem;
  top: 8rem;
  margin: 0 auto;
  height: 50%;
  overflow-y: auto;
  z-index: 5;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidebarQuestions = styled.div`
  display: flex;
  width: 13rem;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

export const QuestionTypeListDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 10rem;
  position: fixed;
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 8rem;
  bottom: 2rem;
  margin-top: 1rem;
  z-index: 10;
`;

export const QuestionsListDiv = styled.div`
  padding-top: 10rem;
  width: 50%;
`;

export const LogicDiv = styled.div`
  padding-top: 10rem;
  width: 60%;
`;
