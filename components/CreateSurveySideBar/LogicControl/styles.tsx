import styled from "@emotion/styled";

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

export const LogicBody = styled.div`
  padding: 1rem;
  border: 1px solid black;
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
