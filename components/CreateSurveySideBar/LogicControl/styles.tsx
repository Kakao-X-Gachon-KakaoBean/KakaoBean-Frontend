import styled from "@emotion/styled";

export const Wrapper = styled.div``;

export const SideBar = styled.div`
  display: flex;
  flex: 1;
  position: fixed;
  width: 17rem;
  height: 80%;
  background-color: white;
  overflow-y: auto;

  @media screen and (max-width: 769px) {
    order: 1;
    margin: 0;
    padding-left: 2rem;
  }
`;

export const LogicTab = styled.section`
  padding-top: 5rem;
  padding-bottom: 1rem;
  padding-right: 5rem;

  @media screen and (max-width: 769px) {
    padding: 0;
  }
`;

export const LogicSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 12rem;
  height: 3rem;
  padding: 1rem;
  border: 1px solid black;
`;

export const LogicBody = styled.div`
  padding: 1rem;
  border: 1px solid black;
`;

export const SelectSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const ConditionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LogicBottom = styled.div`
  padding: 1rem;
  border: 1px solid black;
`;
