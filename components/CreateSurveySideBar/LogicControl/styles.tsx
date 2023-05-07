import styled from "@emotion/styled";
import { Select, Button } from "antd";

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
`;

export const SideBar = styled.div`
  display: flex;
  flex: 1;
  position: fixed;
  width: 17rem;
  height: 80%;
  background-color: white;
  overflow-y: auto;
  margin-top: 2rem;
  justify-content: center;

  @media screen and (max-width: 769px) {
    order: 1;
    margin: 0;
    padding-left: 2rem;
  }
`;

export const QuestionNumDiv = styled.div`
  display: flex;
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;
export const DefaultMoveDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15rem;
`;

export const LogicDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 15rem;
`;

export const OptionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 13px;
  width: 100%;
  color: gray;
  font-weight: bold;
`;

export const AddLogicButton = styled(Button)`
  border: none;
  box-shadow: none;
`;

export const LogicBody = styled.div`
  padding: 1rem;
  border-radius: 7px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AccordionDiv = styled.div`
  width: 100%;
`;
export const AccordionSummaryDiv = styled.div`
  display: flex;
  flex-display: row;
  justify-content: center;
  align-items: center;
`;

export const LogicBodyHeader = styled.div`
  width: 10rem;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
`;

export const ConditionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const LogicBottom = styled.div`
  padding: 1rem;
  border-radius: 7px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
