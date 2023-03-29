import styled from "@emotion/styled";

export const Header = styled.div`
  font-size: 4em;
  font-weight: 500;
  margin-bottom: 0.8rem;
  line-height: 77px;
  letter-spacing: 0.1em;
  text-align: center;
`;

export const SubHeader = styled.div`
  font-weight: 400;
  font-size: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;
  color: #343434;
  margin-bottom: 1rem;

  & div {
    color: #343434;
    & a {
      text-decoration: none;
      color: inherit;
    }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
export const Input = styled.input`
  color: #969696;
  background-color: #ffffff;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 4px 4px 0 #00000040;
  border: 1px solid #969696;
  border-radius: 12px;
  width: 32rem;
  height: 3.5rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-top: 0.9rem;
  margin-bottom: 0.3rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1.3rem;
    font-weight: 200;
    color: #969696;
  }
`;

export const CheckBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2rem;
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
