import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;

  width: 25vw;
  min-width: 400px;
  height: 30vh;
  min-height: 180px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  transform: translate(-50%, -50%);
  animation-duration: 0.3s;
  animation-name: "fadeIn";
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
  }

  & > form > button {
    border: none;
    background-color: inherit;

    position: absolute;
    top: 1rem;
    right: 1rem;

    font-size: 2rem;
  }
`;

export const InputKey = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const EmailInput = styled.input`
  color: #969696;
  background-color: #ffffff;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 4px 4px 0 #00000040;
  border: 1px solid #969696;
  border-radius: 12px;
  width: 20rem;
  height: 3rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-bottom: 0.5rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1.1rem;
    font-weight: 300;
    color: #969696;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Header = styled.header`
  font-size: 1.3rem;
  font-weight: bold;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2.3rem;
  background-color: #8cafa3;
  box-shadow: 0 4px 4px 0 #00000040;
  color: white;
  border-radius: 10px;
  outline: none;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  margin-bottom: 0.3rem;
  &:hover {
    background-color: #969696;
    border: none;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  width: 20rem;
  height: 2rem;
  outline: none;
  font-size: 1rem;
`;
