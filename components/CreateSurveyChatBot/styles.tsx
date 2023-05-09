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
  border-radius: 5px;
  padding: 0 0 5% 7%;
  margin-top: 4%;
  background-color: rgba(166, 164, 164, 0.15);
`;

export const ChatTitleButton = styled(Button)`
  max-width: 90%;
  white-space: normal;
  word-break: break-all;
`;

export const CreateQuestionsBtnDiv = styled.div`
  display: flex;
  margin-top: 3%;
`;
