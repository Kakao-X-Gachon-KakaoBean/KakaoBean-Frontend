import React from "react";
import { useRecoilValue } from "recoil";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  QuestionTitleDiv,
  TableDiv,
  Wrapper,
} from "@components/SurveyResponseDetailTable/styles";
import { selectedNodeState } from "../../States/SurveyState";
import { movies } from "./data";
import DataRow from "./type";

const columns: TableColumn<DataRow>[] = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Director",
    selector: (row) => row.director,
    sortable: true,
  },
  {
    name: "Runtime",
    selector: (row) => row.runtime,
    sortable: true,
  },
];
const SurveyResponseDetailTable = () => {
  const selectedNode = useRecoilValue(selectedNodeState);

  return (
    <Wrapper>
      <QuestionTitleDiv>
        {/*id: {selectedNode.id}*/}
        {selectedNode.data.label
          ? selectedNode.data.label
          : "질문을 선택해주세요"}
      </QuestionTitleDiv>
      <TableDiv>
        <DataTable columns={columns} data={movies} pagination />
      </TableDiv>
    </Wrapper>
  );
};

export default SurveyResponseDetailTable;
