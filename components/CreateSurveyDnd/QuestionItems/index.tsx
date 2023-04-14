import React, { useState } from "react";
import { Input, Button } from "antd";

export const multipleChoiceQuestion = () => {
  interface Question {
    title: string;
    options: string[];
  }
  const [question, setQuestion] = useState<Question>({
    title: "",
    options: [""],
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, title: event.target.value });
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = event.target.value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...question.options, ""];
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <div>
      <Input
        value={question.title}
        onChange={handleTitleChange}
        placeholder={"제목을 입력하세요"}
      />
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <Input
            value={option}
            onChange={(event) => handleOptionChange(event, optionIndex)}
          />
        </div>
      ))}
      <Button onClick={handleAddOption}>+</Button>
    </div>
  );
};
export const subjectiveQuestion = () => {
  return <div>주관식 문제입니다.</div>;
};

export const rangeBarQuestion = () => {
  return <div>선형배율 문제입니다.</div>;
};
