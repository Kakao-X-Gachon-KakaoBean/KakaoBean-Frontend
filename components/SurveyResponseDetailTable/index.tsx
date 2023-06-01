import React, { useEffect, useState } from "react";
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
import { selectedNodeState } from "../../States/SurveyState";
import DataRow from "./type";
import {
  incomingResponses,
  QuestionResponse,
} from "../../pages/Survey/SurveyResponseDetail/type";

const columns: TableColumn<DataRow>[] = [
  {
    name: "설문 제목",
    selector: (row) => (row.title ? row.title : ""),
    sortable: true,
  },
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
    selector: (row) => {
      let answer = row.answer;
      if (answer) {
        if (typeof answer == "number") {
          answer = answer.toString();
        } else if (typeof answer == "object") {
          answer = answer.join(", ");
        }
        if (typeof answer == "string" && answer.length > 20) {
          return answer.slice(0, 19) + "...";
        } else {
          return answer;
        }
      }
      return "응답이 없습니다.";
    },
    sortable: true,
  },
];

interface SurveyResponseDetailTableProps {
  responses: incomingResponses[];
}
const SurveyResponseDetailTable = ({
  responses,
}: SurveyResponseDetailTableProps) => {
  const selectedNode = useRecoilValue(selectedNodeState);
  const [responseData, setResponseData] = useState<DataRow[]>([]);
  console.log(responses);
  useEffect(() => {
    setResponseData([]);
    const initialResponse: DataRow[] = [];
    responses.forEach((user, userIndex) => {
      user.questionResponses.forEach((userResponse, userResponseIndex) => {
        if (userResponse.questionId.toString() == selectedNode.id) {
          const newResponse = {
            title: userResponse.title,
            name: user.name,
            mail: user.email,
            gender: user.gender,
            age: user.age,
            answer:
              userResponse.type == "MULTIPLE" && userResponse.answers
                ? userResponse.answers.join(", ")
                : userResponse.answer
                ? userResponse.answer.toString()
                : "",
          };
          initialResponse.push(newResponse);
        } else if (selectedNode.id == "submit") {
          const allResponse = {
            title: userResponse.title,
            name: user.name,
            mail: user.email,
            gender: user.gender,
            age: user.age,
            answer:
              userResponse.type == "MULTIPLE" && userResponse.answers
                ? userResponse.answers.join(", ")
                : userResponse.answer
                ? userResponse.answer.toString()
                : "",
          };
          initialResponse.push(allResponse);
        }
      });
    });
    setResponseData(initialResponse);
  }, [selectedNode]);
  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return (
      <DetailDiv>
        <Typography>
          <Title level={4}>사용자 응답</Title>
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
          data={responseData}
          pagination
          paginationPerPage={15}
          defaultSortFieldId={1}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </TableDiv>
    </Wrapper>
  );
};

export default SurveyResponseDetailTable;
