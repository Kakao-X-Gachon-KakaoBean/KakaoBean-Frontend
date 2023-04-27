import styled from "@emotion/styled";

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

export const getQuestionsListStyle = (
  isDraggingOver: boolean
): React.CSSProperties => ({
  borderRadius: 10,
  border: "1px solid",
  borderColor: "D3D3D3",
  background: isDraggingOver ? "white" : "white",
  padding: `50px 100px 50px 100px`,
});

export const QuestionTypeListDiv = styled.div`
  position: fixed;
  left: 4rem;
  top: 10rem;
  padding-right: 1rem;
  margin: 0 auto;
`;

export const QuestionsListDiv = styled.div`
  width: 70rem;
  padding-top: 10rem;
  margin-left: 20rem;
`;

export const LogicDiv = styled.div`
  width: 70rem;
  margin-left: 20rem;
  padding-top: 10rem;
`;
