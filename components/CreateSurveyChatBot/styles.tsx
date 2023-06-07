import styled from "@emotion/styled";
import { Button } from "antd";

export const DialogButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: black;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const ResponsesDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 0 0 5% 7%;
  margin-top: 4%;
  background-color: #e5e5eaff;
`;

export const QuestionDiv = styled.div`
  color: white;
  width: 50%;
  margin-top: 4%;
  padding: 0 7% 0 7%;
  border-radius: 15px;
  background-color: #1086feff;
  align-self: flex-end;
`;

export const ChatTitleButton = styled(Button)`
  max-width: 90%;
  height: auto;
  white-space: normal;
  word-break: break-word;
`;

export const CreateQuestionsBtnDiv = styled.div`
  display: flex;
  margin-top: 3%;
`;
