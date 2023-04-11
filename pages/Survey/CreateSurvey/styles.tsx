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
  width: 250,
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
  padding: 90,
  width: 650,
});

// component style
export const CreateSurveyDiv = styled.div`
  display: flex;
`;

export const QuestionTypeListDiv = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
`;

export const QuestionsListDiv = styled.div`
  position: absolute;
  top: 20%;
  right: 30%;
`;
