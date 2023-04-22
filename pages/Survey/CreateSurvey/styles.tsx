import styled from "@emotion/styled";

// component style
export const CreateSurveyDiv = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.3fr;

  min-height: 100vh;
  margin-top: -2rem;
`;

export const ChatBtn = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: fixed;
  bottom: 0;
  right: 0;
`;

export const FalseContainer = styled.div`
  font-size: 1rem;
  width: 15rem;
  height: 35rem;
  border: 2px solid black;
  border-radius: 10px;
  position: absolute;
  right: 0;
  animation: slide-in 1s ease-in-out;
  animation-fill-mode: forwards;

  @keyframes slide-in {
    from {
      right: 0;
    }
    to {
      right: -650px;
    }
  }
`;

export const DialogButton = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: green;
  color: white;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  &:hover {
    transform: translateY(-1px);
  }
`;
