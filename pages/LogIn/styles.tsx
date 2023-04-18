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
  font-weight: 300;
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
  box-shadow: 0 4px 4px 0 #00000040;
  border: 1px solid #969696;
  border-radius: 12px;
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
    color: #969696;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 32rem;
  font-size: 1rem;
  margin-top: 0.8rem;
  & span {
    padding: 0.5rem;
    color: #343434;
    & a {
      text-decoration: none;
      color: inherit;
    }
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
  background-color: #8cafa3;
  box-shadow: 0 4px 4px 0 #00000040;
  color: white;
  border-radius: 10px;
  outline: none;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  &:hover {
    background-color: #969696;
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
  background: #fff;
  font-size: 1.3rem;
  box-sizing: border-box;
  width: 32rem;
  height: 4rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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
  background: #ebeca8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const Img = styled.img`
  width: 2rem;
  height: 2rem;
  float: left;
  margin-right: 0.4rem;
`;
