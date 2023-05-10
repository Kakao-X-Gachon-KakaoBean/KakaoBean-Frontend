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
export const SurveyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(18rem, 1fr));
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
  flex-direction: column;
  align-items: center;
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

export const SurveyInfo = styled.div``;
export const SurveyTitle = styled.div``;
export const SurveyResult = styled.div``;
