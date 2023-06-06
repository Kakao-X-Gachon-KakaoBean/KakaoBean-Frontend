import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, #dfecff 30%, white 80%);
`;

export const TextDiv = styled.div`
  justify-content: center;
  margin-bottom: 5%;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export const StartButton = styled.button`
  width: 9rem;
  height: 3rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-width: 0;
  border-radius: 16px;
  background-color: rgba(0, 12, 30, 0.8);
  transition: background-color 0.3s;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background-color: rgba(0, 12, 30, 0.4);
  }
`;

export const Text = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
`;
