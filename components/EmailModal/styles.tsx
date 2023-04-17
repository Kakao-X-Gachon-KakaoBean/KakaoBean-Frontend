import styled from "@emotion/styled";

export const Wrapper = styled.div`
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;

  background-color: white;

  width: 50vw;
  min-width: 400px;
  height: 50vh;
  min-height: 180px;

  margin: 20vh auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

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
  align-items: flex-start;
  margin: 0 auto;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Header = styled.header`
  font-size: 1rem;
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
