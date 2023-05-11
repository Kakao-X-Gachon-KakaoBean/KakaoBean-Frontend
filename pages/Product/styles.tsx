import styled from "@emotion/styled";

export const Wrapper = styled.div``;
export const ViewSection = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  margin: 0 auto;
`;

export const ResponseResult = styled.div`
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #ede1e1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  & > div:first-child {
  }

  & > div:last-child {
    font-size: 2rem;
    font-weight: bold;
  }
`;
export const GoingResult = styled(ResponseResult)``;
export const CompleteResult = styled(ResponseResult)``;

export const SectionWrapper = styled.div`
  width: 90%;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr 2fr;
  grid-row-gap: 1rem;
  margin: 0 auto;
`;

export const StatisticSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1rem;
  margin: 0 auto;
`;

export const LeftResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ede1e1;
  border-radius: 10px;
`;
export const RightResult = styled(LeftResult)``;

export const ResultSection = styled.div`
  width: 90%;
  background-color: #ffffff;
  border: 1px solid #ede1e1;
`;
export const SurveySection = styled.div`
  width: 90%;
  background-color: #ffffff;
  border: 1px solid #ede1e1;
`;
