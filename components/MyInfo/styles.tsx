import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding-top: 2%;
  padding-left: 10%;
`;

export const Header = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-left: 1rem;
  line-height: 77px;
  letter-spacing: 0.1em;
  font-family: "Pretendard-Regular";
`;
export const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const InfoSection = styled.div`
  width: 20rem;
  height: 5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
  padding: 4rem 3rem 4rem 3rem;
  margin-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

export const SectionHeader = styled.div`
  width: 30%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  font-size: 1.4rem;
`;
export const SectionBody = styled.div`
  background-color: white;
  width: 70%;
  height: 2.5rem;
  border-radius: 10px;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  color: dimgrey;
`;
