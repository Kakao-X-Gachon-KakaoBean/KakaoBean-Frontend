import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { Header } from "@components/MyInfo/styles";
import {
  GoingResult,
  LeftResult,
  PieContainer,
  PieDescription,
  PieHeading,
  PieLangColorBox,
  PieLangColorBoxWrapper,
  PieLangText,
  PieLeft,
  PieRatioWrapper,
  PieRight,
  PieTitle,
  ResponseResult,
  TitleResult,
  RightResult,
  SectionWrapper,
  StatisticSection,
  SurveyBody,
  SurveyBodyChart,
  SurveyBodyResult,
  SurveyBodySummary,
  SurveyHeader,
  SurveySection,
  SurveyShortSection,
  SurveyShortBody,
  SurveyVertical,
  ViewSection,
  Wrapper,
} from "@pages/Product/styles";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderBar from "@components/HeaderBar";
const Product = () => {
  const data = [
    {
      name: "10대",
      인원수: 10,
    },
    {
      name: "20대",
      인원수: 20,
    },
    {
      name: "30대",
      인원수: 30,
    },
    {
      name: "40대",
      인원수: 3,
    },
    {
      name: "50대",
      인원수: 3,
    },
    {
      name: "60대",
      인원수: 5,
    },
    {
      name: "알수 없음",
      인원수: 8,
    },
  ];

  const data2 = [
    { name: "남자", value: 40 },
    { name: "여자", value: 55 },
    { name: "알수없음", value: 5 },
  ];

  const COLORS = [
    "#0088FE",
    "#FF8042",
    "#FFBB28",
    "#00C49F",
    "#ba4c4c",
    "#98cdd6",
  ];

  interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PropsWithChildren<CustomizedLabelProps>) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Wrapper>
      <HeaderBar />
      <SectionWrapper>
        <ViewSection>
          <TitleResult>
            <div>설문 제목</div>
            <div>내가 만든 설문</div>
          </TitleResult>
          <ResponseResult>
            <div>생성일</div>
            <div>2022-05-05</div>
          </ResponseResult>
          <GoingResult>
            <div>응답 수</div>
            <div>13</div>
          </GoingResult>
        </ViewSection>
        <StatisticSection>
          <LeftResult>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="인원수" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </LeftResult>
          <RightResult>
            <PieContainer>
              <PieLeft>
                <PieHeading>
                  <PieTitle>설문 연령 비율</PieTitle>
                  <PieDescription>해당 설문 기준</PieDescription>
                </PieHeading>
                <PieRatioWrapper>
                  {data2 &&
                    data2.map((it, idx) => (
                      <PieLangColorBoxWrapper key={`${it.name}-${it.value}`}>
                        <PieLangColorBox props={COLORS[idx]} />
                        <div>
                          <PieLangText>{it.name}</PieLangText>
                          <PieLangText>{it.value}%</PieLangText>
                        </div>
                      </PieLangColorBoxWrapper>
                    ))}
                </PieRatioWrapper>
              </PieLeft>
              <PieRight>
                <PieChart width={300} height={300}>
                  <Pie
                    data={data2}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data2.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </PieRight>
            </PieContainer>
          </RightResult>
        </StatisticSection>

        {/*객관식, 선형배율일시*/}
        <SurveySection>
          <SurveyHeader>객관식</SurveyHeader>
          <SurveyBody>
            <SurveyBodyChart>
              <PieChart width={300} height={200}>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={30}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </SurveyBodyChart>
            <SurveyBodySummary>몇번</SurveyBodySummary>
            <SurveyVertical></SurveyVertical>
            <SurveyBodyResult>
              <div>1번 50%</div>
              <div>2번 50%</div>
              <div>3번 50%</div>
            </SurveyBodyResult>
          </SurveyBody>
        </SurveySection>

        {/*주관식일시*/}
        <SurveyShortSection>
          <SurveyHeader>주관식</SurveyHeader>
          <SurveyShortBody>
            <SurveyBodyResult>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>설문 답변</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>얍</Typography>
                  <Typography>얍</Typography>
                  <Typography>얍</Typography>
                </AccordionDetails>
              </Accordion>
            </SurveyBodyResult>
          </SurveyShortBody>
        </SurveyShortSection>

        {/*객관식, 선형배율일시*/}
        <SurveySection>
          <SurveyHeader>선형 배율</SurveyHeader>
          <SurveyBody>
            <SurveyBodyChart>
              <PieChart width={300} height={200}>
                <Pie
                  data={data2}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={30}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data2.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </SurveyBodyChart>
            <SurveyBodySummary>몇번</SurveyBodySummary>
            <SurveyVertical></SurveyVertical>
            <SurveyBodyResult>
              <div>1번 50%</div>
              <div>2번 50%</div>
              <div>3번 50%</div>
            </SurveyBodyResult>
          </SurveyBody>
        </SurveySection>
      </SectionWrapper>
    </Wrapper>
  );
};

export default Product;
