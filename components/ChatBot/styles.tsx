import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding-top: 7rem;
  position: fixed;
  right: 0;
`;

export const Container = styled.div`
  font-size: 1rem;
  width: 15rem;
  height: 35rem;
  border: 2px solid black;
  border-radius: 10px;
  position: relative;
  animation: slide-out 1s ease-in-out;

  @keyframes slide-out {
    from {
      right: -650px;
    }
    to {
      right: 0;
    }
  }
`;

export const FalseContainer = styled.div`
  font-size: 1rem;
  width: 15rem;
  height: 35rem;
  border: 2px solid black;
  border-radius: 10px;
  position: absolute;
  right: 500px;
  transition: 2s;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
