import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  QuestionTypeItem,
  QuestionsItem,
  getQuestionType,
  getQuestions,
} from "@components/CreateSurveyDnd/type";
import {
  countState,
  MultiState,
  RangeState,
  SubjectState,
} from "../../States/SurveyState";
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

  const [questions, setQuestions] = useState<
    Array<MultipleQuestion | SubjectiveQuestion | RangeBarQuestion>
  >([]);

  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [questionItems, setQuestionItems] = useState<QuestionsItem[]>(
    getQuestions()
  );
  const Multi = useRecoilValue(MultiState);
  const Range = useRecoilValue(RangeState);
  const Subject = useRecoilValue(SubjectState);

  function ResetFn() {
    useResetRecoilState(MultiState);
    useResetRecoilState(RangeState);
    useResetRecoilState(SubjectState);
  }

  console.log(countState);
  console.log(Multi);
  console.log(Range);
  console.log(Subject);

  // 질문 리스트 순서 바꾸기
  const reorderQuestions = (
    list: QuestionsItem[],
    startIndex: number,
    endIndex: number
  ): QuestionsItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // 새로운 질문 추가
  const reorderAddQuestions = (
    list: QuestionsItem[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const add = {
      id: `add-${countQuestion}`,
      type: questionTypeItems[startIndex].content,
      content: questionTypeItems[startIndex].content,
    };
    result.splice(endIndex, 0, add);
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
      ResetFn();
    }
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
                      {item.type === "객관식" && <MultipleChoiceQuestions />}
                      {item.type === "주관식" && <SubjectiveQuestions />}
                      {item.type === "선형배율" && <RangeBarQuestions />}
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
