import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 9rem;
  padding-bottom: 9rem;
  background-color: #fbf9f9ff;
`;

export const CopySection = styled.div`
  width: 100%;
  border: 1px solid white;
  background-color: white;
  display: grid;
  grid-template-columns: 5fr 0.1fr;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }

  &:active {
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;
export const ViewSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  grid-column-gap: 1rem;
  margin: 0 auto;
`;

export const ResponseResult = styled.div`
  text-align: center;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 1rem;

  & > div:first-child {
  }

  & > div:last-child {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div:first-child {
      font-size: 1.5rem;
      font-weight: 600;
    }

    & > div:last-child {
      font-size: 1rem;
      color: gray;
    }
  }
`;
export const GoingResult = styled(ResponseResult)``;
export const TitleResult = styled(ResponseResult)``;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;
export const DetailButton = styled(Link)`
  display: flex;
  width: 45%;
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  transition: background-color 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-width: 0;

  &:hover {
    background-color: rgba(0, 88, 255, 0.7);
    color: white;
  }
`;

export const CloseSurveyButton = styled.button`
  width: 45%;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  transition: background-color 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-width: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 88, 255, 0.7);
    color: white;
  }
`;

export const SectionWrapper = styled.div`
  width: 90%;
  display: grid;
  justify-content: center;
  grid-template-rows: 0.5fr 1fr 4fr;
  grid-row-gap: 1.4rem;
  margin: 0 auto;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: gray;
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
export const RightResult = styled(LeftResult)``;

export const PieContainer = styled.div`
  background: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

export const PieLeft = styled.div`
  margin-left: 1rem;
  margin-top: 0.8rem;
`;
export const PieRight = styled.div`
  display: flex;
`;

export const PieHeading = styled.div`
  margin-bottom: 10px;
`;

export const PieTitle = styled.h5`
  font-size: 1.1rem;
`;

export const PieDescription = styled.span`
  font-size: 1rem;
`;

export const PieRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const PieLangColorBox = styled.div<{ props: any }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 7px;
  background-color: ${({ props }) => props};
`;

export const PieLangColorBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const PieLangCircle = styled.span`
  font-size: 9px;
  margin-right: 7px;
  border-radius: 50%;
`;
export const PieLangText = styled.span`
  font-size: 15px;
  margin-right: 7px;
`;

export const ResultSection = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`;
export const SurveySection = styled.div`
  width: 100%;
  height: 18rem;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const SurveyShortSection = styled.div`
  width: 100%;
  height: 18rem;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const SurveyHeader = styled.div`
  width: 100%;
  height: 4.5rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;

  & div:first-child {
    font-weight: bold;
  }
  & div:last-child {
    font-size: 1rem;
    color: #bc9595;
  }
`;
export const SurveyBody = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.01fr 1fr;
`;

export const SurveyShortBody = styled.div`
  flex: 1;
`;
export const SurveyBodyChart = styled.div`
  width: 100%;
`;

export const SurveyBodySummary = styled.div`
  padding: 1rem;
`;

export const SurveyVertical = styled.div`
  border-left: 1px solid #e4e4e4;
  height: 80%;
  margin: auto 0;
`;
export const SurveyBodyResult = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-size: 1.2rem;
    border-bottom: 0.5rem;
  }
`;
