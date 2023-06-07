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

export const CreateQuestionBtn = styled(Button)`
  background-color: #02ce48ff;
  color: white;
  font-weight: 700;

  &:hover {
    border-color: #77d398 !important;
    color: white !important;
  }
`;

/* 안내 Card 스타일 */
export const Card = styled.div`
  width: 100%;
  height: 23%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

export const Tools = styled.div`
  display: flex;
  align-items: center;
  padding: 9px;
`;

export const Circle = styled.div`
  padding: 0 4px;
`;

export const Box = styled.div`
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
`;

export const RedBox = styled(Box)`
  background-color: #ff605c;
`;

export const YellowBox = styled(Box)`
  background-color: #ffbd44;
`;

export const GreenBox = styled(Box)`
  background-color: #00ca4e;
`;

export const GuideDiv = styled.div`
  padding: 0 2rem 0 2rem;
`;
