import styled from "@emotion/styled";

export const DialogButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: black;
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
