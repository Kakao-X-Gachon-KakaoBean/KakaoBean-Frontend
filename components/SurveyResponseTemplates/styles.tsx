import styled from "@emotion/styled";

export const QuestionBox = styled.div`
  height: 80vh;
  width: 100%;
  color: black;
  text-align: left;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  //display: grid; /* 그리드로 변경 */
  //grid-template-columns: 1fr auto 1fr; /* 3개의 행 설정 */
  //grid-column-gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  border: 0;
  width: 50vw;
  font-size: 30px;
  font-weight: 650;
  margin-bottom: 3px;
`;

export const Explanation = styled.div`
  border: 0;
  width: 50vw;
  font-size: 20px;
  font-weight: 450;
  margin-bottom: 10px;
`;
