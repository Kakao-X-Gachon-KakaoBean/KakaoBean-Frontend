import styled from "@emotion/styled";

export const Wrapper = styled.div<{ sideBar: boolean }>`
  font-weight: 400;
  display: flex;
  justify-content: flex-end;

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
    font-size: 1.7rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.4);
  }
`;
