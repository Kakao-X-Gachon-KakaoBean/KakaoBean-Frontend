import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;

  min-height: 100vh;

  margin-top: -2rem;

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
  font-weight: bolder;
  padding-top: 15rem;
  padding-right: 1rem;
  background-color: #f2f2f2;

  @media screen and (max-width: 769px) {
    order: 1;
    margin: 0;
    padding-left: 2rem;
  }
`;

export const RightSide = styled.section`
  padding-top: 10rem;
  padding-bottom: 1rem;

  @media screen and (max-width: 769px) {
    padding: 0;
  }
`;
