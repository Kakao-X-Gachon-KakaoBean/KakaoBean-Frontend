import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;
export const Header = styled.div`
  font-size: 4em;
  font-weight: 800;
  margin-bottom: 0.8rem;
  line-height: 77px;
  letter-spacing: 0.1em;
  text-align: center;
`;
export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Label = styled.div`
  margin-bottom: 0.8rem;

  & span {
    text-align: left;
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
    width: 7rem;
  }
`;
export const Input = styled.input`
  color: #969696;
  background-color: #ffffff;
  position: relative;
  box-sizing: border-box;
  //box-shadow: 0 4px 4px 0 #00000040;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  width: 32rem;
  height: 4rem;
  outline: none;
  font-size: 1.3rem;
  padding: 10px 15px 12px;
  margin-top: 0.6rem;
  :focus {
    border: 1px solid gray;
  }
  ::placeholder {
    font-size: 1.3rem;
    font-weight: 200;
    color: #858d93;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30rem;
  font-size: 1rem;
  padding: 3rem 0;
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15rem;
    color: #858d93;

    & a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

export const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  width: 7rem;
  height: 1.6rem;
  background-color: white;
  border: none;
  font-size: 1rem;
  color: #858d93;
`;

export const Line = styled.div`
  width: 34rem;
  display: flex;
  align-items: center;
  color: #6c747a;
  font-size: 1rem;
  margin: 8px 0;

  ::before {
    content: "";
    flex-grow: 1;
    margin: 0 1rem;
    background-color: #6c747a;
    height: 1px;
    font-size: 0;
    line-height: 0;
  }

  ::after {
    content: "";
    flex-grow: 1;
    margin: 0 1rem;
    background-color: #6c747a;
    height: 1px;
    font-size: 0;
    line-height: 0;
  }
`;

export const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  width: 32rem;
  height: 4rem;
  background: #f1f3f5;
  border-radius: 8px;
  color: #b8c0c5;
  outline: none;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  &:hover {
    background-color: #039ba1;
    border: none;
  }
`;

export const SocialLogin = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const GoogleBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 32rem;
  height: 4rem;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
  text-decoration: none;
  color: black;
`;

export const KakaoBtn = styled.a`
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  box-sizing: border-box;
  text-decoration: none;
  width: 32rem;
  height: 4rem;
  background: #ffeb3b;
  border: 1px solid #e6e8eb;
  border-radius: 8px;
`;

export const Img = styled.img`
  width: 2rem;
  height: 2rem;
  float: left;
  margin-right: 0.4rem;
`;
