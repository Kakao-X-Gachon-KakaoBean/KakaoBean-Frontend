import styled from "@emotion/styled";

export const Wrapper = styled.div`
  margin-top: 7rem;
  padding: 3rem;
  background-color: black;
  color: white;
  flex-direction: column;
  display: flex;
`;

export const CorTextDiv = styled.div`
  flex-direction: row;
  align-items: baseline;
  display: flex;
  margin-bottom: 2rem;
  margin-left: 5rem;
`;

export const BeanText = styled.div`
  font-size: 30px;
`;

export const CorText = styled.div`
  margin-left: 10px;
  font-size: 20px;
`;

export const TextDiv = styled.div`
  flex-direction: row;
  display: flex;
  margin-left: 5rem;
  justify-content: space-between;
  padding-right: 5rem;
`;

export const IndexDiv = styled.div`
  flex-direction: column;
  display: flex;
  padding-bottom: 1rem;
  &:last-child {
    margin-left: 2rem;
  }
`;

export const Indexes = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  color: #92989f;
`;

export const Detail = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const LongText = styled.div`
  font-size: 18px;
`;
