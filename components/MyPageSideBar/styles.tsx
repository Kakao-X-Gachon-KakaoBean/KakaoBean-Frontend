import styled from "@emotion/styled";

export const Wrapper = styled.div<{ sideBar: boolean }>`
  font-weight: 400;

  @media (max-width: 769px) {
    display: none;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 0.5rem;

  & span {
    margin-top: 0.5rem;
    color: rgba(0, 0, 0, 0.4);
  }
`;
