import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import {
  DetailDiv,
  QuestionTitleDiv,
  TableDiv,
  Wrapper,
} from "@components/SurveyResponseDetailTable/styles";
import {
  selectedNodeAnswerState,
  selectedNodeState,
} from "../../States/SurveyState";
// import { movies } from "./data";
import DataRow from "./type";

const columns: TableColumn<DataRow>[] = [
  {
    name: "이름",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "이메일",
    selector: (row) => row.mail,
    sortable: true,
  },
  {
    name: "성별",
    selector: (row) => row.gender,
    sortable: true,
  },
  {
    name: "나이",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "응답",
    selector: (row) =>
      row.answer.length < 20 ? row.answer : row.answer.slice(0, 19) + "...",
    sortable: true,
  },
];
const SurveyResponseDetailTable = () => {
  const selectedNode = useRecoilValue(selectedNodeState);
  const [selectedNodeAnswer, setSelectedNodeAnswer] = useRecoilState(
    selectedNodeAnswerState
  );
  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return (
      <DetailDiv>
        <Typography>
          <Title level={2}>사용자 응답</Title>
          <Paragraph copyable>{data.answer}</Paragraph>
        </Typography>
      </DetailDiv>
    );
  };
  return (
    <Wrapper>
      <QuestionTitleDiv>
        {/*id: {selectedNode.id}*/}
        {selectedNode.data.label
          ? selectedNode.data.label
          : "질문을 선택해주세요"}
      </QuestionTitleDiv>
      <TableDiv>
        <DataTable
          columns={columns}
          data={selectedNodeAnswer}
          pagination
          paginationPerPage={15}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </TableDiv>
    </Wrapper>
  );
};

export default SurveyResponseDetailTable;
