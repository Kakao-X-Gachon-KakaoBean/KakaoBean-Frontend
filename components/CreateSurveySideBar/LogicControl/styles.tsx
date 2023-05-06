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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;
