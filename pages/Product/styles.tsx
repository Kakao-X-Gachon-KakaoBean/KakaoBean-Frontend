import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;

  min-height: 70vh;

  & a {
    text-decoration: none;
    color: inherit;
  }

  .selected {
    color: black;
  }

  @media screen and (max-width: 769px) {
    display: flex;
    flex-direction: column;
  }
`;

export const SideBar = styled.section`
  padding-top: 5rem;
  padding-right: 1rem;
  width: 13rem;
  margin: 0 auto;

  @media screen and (max-width: 769px) {
    order: 1;
    margin: 0;
    padding-left: 2rem;
  }
`;

export const RightSide = styled.section`
  padding-top: 5rem;
  padding-bottom: 1rem;
  padding-right: 10rem;

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

export const LogicBottom = styled.div`
  padding: 1rem;
  border: 1px solid black;
`;
