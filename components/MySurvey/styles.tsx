import styled from "@emotion/styled";

export const SurveyHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-left: 1rem;
  line-height: 77px;
  letter-spacing: 0.1em;
  font-family: "Pretendard-Regular";
`;

export const CreateSurveyContainer = styled.div`
  width: 15rem;
  height: 10rem;
  margin-left: 2rem;

  padding: 1rem 0;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafbfc;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
  cursor: pointer;

  @media (max-width: 769px) {
    max-width: 50%;
    min-width: 50%;
  }

  &:hover {
    background-color: #f7e8e8;
  }
`;
export const SurveyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-row-gap: 2rem;
  @media (max-width: 769px) {
    display: flex;
    flex-direction: column;
  }

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

export const SurveyBox = styled.div`
  width: 75%;
  min-height: 10rem;
  max-height: 15rem;

  margin: 0 auto;
  padding: 1rem 0;
  border-radius: 10px;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fafbfc;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 10px;
  cursor: pointer;

  @media (max-width: 769px) {
    max-width: 50%;
    min-width: 50%;
  }

  &:hover {
    background-color: #f7e8e8;
  }
`;

export const SurveyInfo = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
export const SurveyTitle = styled.div`
  font-size: 1.2rem;
`;
export const SurveyResult = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 1;
`;
