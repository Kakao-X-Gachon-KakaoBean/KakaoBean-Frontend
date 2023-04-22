import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  QuestionTypeItem,
  QuestionsItem,
  getQuestionType,
  getQuestions,
} from "@components/CreateSurveyDnd/type";
import { countState } from "../../States/SurveyState";
import { MultipleQuestion } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import {
  getQuestionTypeItemStyle,
  getQuestionTypeListStyle,
  getQuestionsItemStyle,
  getQuestionsListStyle,
  QuestionTypeListDiv,
  QuestionsListDiv,
} from "@components/CreateSurveyDnd/styles";
import { MultipleChoiceQuestions } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions";
import { SubjectiveQuestions } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions";
import { RangeBarQuestions } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions";

const CreateSurveyDnd = (): JSX.Element => {
  const [questionTypeItems, setQuestionTypeItems] = useState<
    QuestionTypeItem[]
  >(getQuestionType());

  type QuestionTypes =
    | QuestionsItem
    | MultipleQuestion
    | SubjectiveQuestion
    | RangeBarQuestion;
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [questionItems, setQuestionItems] = useState<QuestionTypes[]>([]);

  // 질문 리스트 순서 바꾸기
  const reorderQuestions = (
    list: QuestionTypes[],
    startIndex: number,
    endIndex: number
  ): (
    | QuestionsItem
    | MultipleQuestion
    | SubjectiveQuestion
    | RangeBarQuestion
  )[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // 새로운 질문 추가
  const reorderAddQuestions = (
    list: QuestionTypes[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const addMultiple = {
      id: `KEA-KakaoBeans-${countQuestion}`,
      type: "MULTIPLE",
      title: "",
      explanation: "",
      questionNumber: "0",
      numberOfAnswerChoices: 0,
      answers: [""],
      logics: [""],
    };
    const addSubjective = {
      id: `KEA-KakaoBeans-${countQuestion}`,
      type: "ESSAY",
      title: "",
      explanation: "",
      questionNumber: "0",
    };
    const addRangeBar = {
      id: `KEA-KakaoBeans-${countQuestion}`,
      type: "RANGE",
      title: "",
      explanation: "",
      questionNumber: "0",
      value: 0,
      min: 0,
      max: 5,
    };
    if (questionTypeItems[startIndex].content === "객관식") {
      result.splice(endIndex, 0, addMultiple);
    } else if (questionTypeItems[startIndex].content === "주관식") {
      result.splice(endIndex, 0, addSubjective);
    } else if (questionTypeItems[startIndex].content === "선형배율") {
      result.splice(endIndex, 0, addRangeBar);
    }
    return result;
  };

  // 드래그 종료 시
  const onDragEnd = (result: DropResult): void => {
    // Droppable 밖에서 Drop 되었을 시에 제자리
    if (!result.destination) {
      return;
    }

    // 질문 유형 리스트 내의 컴포넌트를 drag
    if (result.source.droppableId === "questionType") {
      // 질문 리스트의 Droppable로  drop
      if (result.destination.droppableId === "questions") {
        setCountQuestion(countQuestion + 1);
        const newItems1 = reorderAddQuestions(
          questionItems,
          result.source.index,
          result.destination.index
        );
        setQuestionItems(newItems1);
      }
    }

    // 질문 유형 내의 컴포넌트를 drag
    if (result.source.droppableId === "questions") {
      const newItems2 = reorderQuestions(
        questionItems,
        result.source.index,
        result.destination.index
      );
      setQuestionItems(newItems2);
    }

    setQuestionItems((prevState) => {
      return prevState.map((item, index) => {
        return {
          ...item,
          questionNumber: index.toString(),
        };
      });
    });
  };

  useEffect(() => {
    console.log(questionItems);
  }, [questionItems]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <QuestionTypeListDiv>
        <Droppable droppableId="questionType" isDropDisabled={true}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getQuestionTypeListStyle(snapshot.isDraggingOver)}
            >
              {questionTypeItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getQuestionTypeItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </QuestionTypeListDiv>
      <QuestionsListDiv>
        <Droppable droppableId="questions" isDropDisabled={false}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getQuestionsListStyle(snapshot.isDraggingOver)}
            >
              {questionItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getQuestionsItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.type === "MULTIPLE" && <MultipleChoiceQuestions />}
                      {item.type === "ESSAY" && <SubjectiveQuestions />}
                      {item.type === "RANGE" && <RangeBarQuestions />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </QuestionsListDiv>
    </DragDropContext>
  );
};

export default CreateSurveyDnd;
