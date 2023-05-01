import styled from "@emotion/styled";

export const DialogButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: rgba(64, 207, 255, 0.8);
  color: white;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;

  &:hover {
    transform: translateY(-1px);
  }
`;
