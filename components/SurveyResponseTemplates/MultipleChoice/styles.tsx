import styled from "@emotion/styled";
import { Button } from "antd";

export const ChoiceBtn = styled(Button)`
  border: 0;
  border-radius: 10px;
  width: 50vw;
  height: 4vh;
  color: black;
  text-align: left;
  font-size: 100%;
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? "Cyan" : "#f5f5f5"};
`;

export const MultipleQuestionDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
