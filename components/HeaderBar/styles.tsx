import styled from "@emotion/styled";

export const Bar = styled.div`
  background-color: #f4ebeb;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const MainBar = styled.div`
  padding: 0.5rem 0.5rem;

  & span a {
    text-decoration: none;
    color: inherit;
  }
`;

export const TopMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 0.5fr;
  align-items: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

  & span {
    margin-left: 1rem;
    cursor: pointer;
  }
`;

export const LeftMenu = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: gray;
`;

export const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;

  & span {
    color: gray;
    font-size: 1.3rem;

    & span {
      display: flex;
      flex-direction: column;
    }
  }
`;
