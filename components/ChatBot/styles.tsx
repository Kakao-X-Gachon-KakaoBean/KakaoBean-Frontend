import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding-top: 8rem;
  position: fixed;
  right: 0;
`;

export const Container = styled.div`
  font-size: 1rem;
  width: 15rem;
  height: 30rem;
  border: 2px solid black;
  border-radius: 10px;
  position: relative;
  animation-name: move;

  @keyframes move {
    from {
      right: -100px;
    }
  }
  to {
    right: 0;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
