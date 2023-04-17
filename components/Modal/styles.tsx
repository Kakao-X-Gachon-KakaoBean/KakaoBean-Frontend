import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DialogBox = styled.dialog`
  width: 20rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
`;
