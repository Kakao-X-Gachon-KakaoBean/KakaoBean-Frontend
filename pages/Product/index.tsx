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
} from "recharts";
import { Wrapper } from "@components/MainComponent/DNDText/styles";
import { Header } from "@components/MyInfo/styles";
import {
  CompleteResult,
  GoingResult,
  LeftResult,
  ResponseResult,
  ResultSection,
  RightResult,
  SectionWrapper,
  StatisticSection,
  SurveySection,
  ViewSection,
} from "@pages/Product/styles";
const Product = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data2 = [
    { name: "10대", value: 2 },
    { name: "20대", value: 6 },
    { name: "30대", value: 3 },
    { name: "40대", value: 2 },
    { name: "50대", value: 2 },
    { name: "60", value: 1 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
            <div>응답 수</div>
            <div>13</div>
          </ResponseResult>
          <GoingResult>
            <div>진행 중</div>
            <div>4</div>
          </GoingResult>
          <CompleteResult>
            <div>완료 수</div>
            <div>9</div>
          </CompleteResult>
        </ViewSection>
        <StatisticSection>
          <LeftResult>
            <LineChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </LeftResult>
          <RightResult>
            <PieChart width={400} height={400}>
              <Pie
                data={data2}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </RightResult>
        </StatisticSection>
        <ResultSection>세 번째 바</ResultSection>
        <SurveySection>네 번째 바</SurveySection>
      </SectionWrapper>
      {/*<LineChart*/}
      {/*  width={730}*/}
      {/*  height={250}*/}
      {/*  data={data}*/}
      {/*  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}*/}
      {/*>*/}
      {/*  <CartesianGrid strokeDasharray="3 3" />*/}
      {/*  <XAxis dataKey="name" />*/}
      {/*  <YAxis />*/}
      {/*  <Tooltip />*/}
      {/*  <Legend />*/}
      {/*  <Line type="monotone" dataKey="pv" stroke="#8884d8" />*/}
      {/*  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
      {/*</LineChart>*/}

      {/*<PieChart width={400} height={400}>*/}
      {/*  <Pie*/}
      {/*    data={data2}*/}
      {/*    cx="50%"*/}
      {/*    cy="50%"*/}
      {/*    labelLine={false}*/}
      {/*    label={renderCustomizedLabel}*/}
      {/*    outerRadius={80}*/}
      {/*    fill="#8884d8"*/}
      {/*    dataKey="value"*/}
      {/*  >*/}
      {/*    {data.map((entry, index) => (*/}
      {/*      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />*/}
      {/*    ))}*/}
      {/*  </Pie>*/}
      {/*</PieChart>*/}
    </Wrapper>
  );
};

export default Product;
