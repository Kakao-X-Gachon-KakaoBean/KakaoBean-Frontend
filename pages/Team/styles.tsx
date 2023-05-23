import styled from "@emotion/styled";

export const ButtonBox = styled.div`
  width: 55vw;
  gap: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: none;
  padding-bottom: 1rem;
  margin-left: 1rem;
  position: absolute;
  bottom: 2rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  padding: 0.5rem;
  border: none;
  gap: 10px;
  background-color: Cyan;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;

  :hover {
    transform: scale(1.2);
    transition-duration: 0.2s;
  }

  ${(props) =>
    props.disabled &&
    `
    display: none;
  `}
`;

export const SpaceBetween = styled.div`
  margin-top: 3vh;
`;
export const ModifiedButton = styled(Button)`
  width: 7rem;
  height: 2rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  background-color: blue;
`;
