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
  CompleteResult,
  GoingResult,
  LeftResult,
  PieContainer,
  PieDescription,
  PieHeading,
  PieLangCircle,
  PieLangColorBox,
  PieLangColorBoxWrapper,
  PieLangText,
  PieLeft,
  PieRatioWrapper,
  PieRight,
  PieTitle,
  ResponseResult,
  ResultSection,
  RightResult,
  SectionWrapper,
  StatisticSection,
  SurveyBody,
  SurveyBodyChart,
  SurveyBodyResult,
  SurveyHeader,
  SurveySection,
  SurveyVertical,
  ViewSection,
  Wrapper,
} from "@pages/Product/styles";
import { Vertical } from "@pages/LogIn/styles";
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
      <Header>Product</Header>
      <SectionWrapper>
        <ViewSection>
          <ResponseResult>
            <div>생성일</div>
            <div>2022-05-05</div>
          </ResponseResult>
          <GoingResult>
            <div>응답 수</div>
            <div>13</div>
          </GoingResult>
          <CompleteResult>
            <div>완료 수</div>
            <div>9</div>
          </CompleteResult>
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
            <SurveyVertical></SurveyVertical>
            <SurveyBodyResult>
              <div>1번 50%</div>
              <div>2번 50%</div>
              <div>3번 50%</div>
            </SurveyBodyResult>
          </SurveyBody>
        </SurveySection>
        <SurveySection>
          <SurveyHeader>주관식</SurveyHeader>
          <SurveyBody>
            <SurveyBodyResult>결과</SurveyBodyResult>
          </SurveyBody>
        </SurveySection>
        <SurveySection>
          <SurveyHeader>선형 배율</SurveyHeader>
          <SurveyBody>
            <SurveyBodyChart>차트</SurveyBodyChart>
            <SurveyBodyResult>결과</SurveyBodyResult>
          </SurveyBody>
        </SurveySection>
      </SectionWrapper>
    </Wrapper>
  );
};

export default Product;
