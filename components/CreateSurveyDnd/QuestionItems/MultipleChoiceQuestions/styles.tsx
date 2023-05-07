import styled from "@emotion/styled";

export const TitleInput = (): React.CSSProperties => ({
  border: 0,
  fontSize: 25,
  fontWeight: "650",
  marginBottom: "3px",
});

export const ExplainInput = (): React.CSSProperties => ({
  border: 0,
  fontSize: 15,
  fontWeight: "450",
  marginBottom: "10px",
});

export const MultipleQuestionDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

export const MultipleOptionInput = (): React.CSSProperties => ({
  border: 0,
  borderRadius: "10px",
  backgroundColor: "#f5f5f5",
});

export const AddOption = (): React.CSSProperties => ({
  border: 0,
  marginTop: "13px",
  color: "grey",
});

export const DeleteOption = (): React.CSSProperties => ({
  border: "none",
  marginLeft: "10px",
  color: "grey",
  boxShadow: "none",
});
