import styled from "@emotion/styled";

export const CreateModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 4rem;
  z-index: 1000;
`;

export const TitleInput = (): React.CSSProperties => ({
  border: 0,
  fontSize: 25,
  height: "10%",
  fontWeight: "650",
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
  border: 0,
  marginLeft: "10px",
  color: "grey",
});

export const SubjectiveInput = (): React.CSSProperties => ({
  marginTop: "20px",
  height: "200px",
});

export const MinMaxRange = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
