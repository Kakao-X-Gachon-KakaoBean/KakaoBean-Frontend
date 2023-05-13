import styled from "@emotion/styled";

// component style

export const Wrapper = styled.div`
  /* 웹 브라우저 (1390px 이상) */
  @media screen and (min-width: 1390px) {
    background-color: black;
    z-index: 10;
  }
`;

export const CreateSurveyDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
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
