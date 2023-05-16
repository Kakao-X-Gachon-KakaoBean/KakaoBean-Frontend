import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Bar = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 75px;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

export const MainBar = styled.div`
  padding: 0.5rem 0.5rem;
  align-items: center;
  & span a {
    text-decoration: none;
    color: inherit;
  }
`;

export const TopMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 4rem 0.2rem 4rem;
  & span {
    margin-left: 1rem;
    cursor: pointer;
  }
`;

export const LeftMenu = styled.div`
  color: black;
`;

export const Img = styled.img`
  width: 4rem;
  height: 4rem;
`;
const shadowAnimation = keyframes`
  from {
    text-shadow: none;
  }

  to {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;
export const RightMenu = styled.div`
  display: flex;

  & span {
    color: black;
    font-size: 1.3rem;

    & span {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Links = styled.span`
  transition: all 0.2s ease-in-out;

  &:hover {
    animation: ${shadowAnimation} 0.5s ease-in-out forwards;
  }
`;
export const Header = styled.div`
  font-size: 3em;
  font-weight: 800;
  line-height: 77px;
  letter-spacing: 0.1em;
  text-align: center;
`;
