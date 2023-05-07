import styled from "@emotion/styled";
import { Button } from "antd";

export const QuestionBox = styled.div`
  height: 100vh;
  width: 100%;
  color: black;
  text-align: center;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.div`
  font-size: 30px;
  font-weight: 650;
`;

export const Explanation = styled.div`
  border: 0;
  font-size: 20px;
  font-weight: 450;
  margin-bottom: 10px;
`;

export const ChoiceBtn = styled(Button)`
  border: 0;
  border-radius: 10px;
  width: 300px;
  color: black;
  text-align: left;
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? "Cyan" : "#f5f5f5"};
`;

export const MultipleQuestionDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
