import React, { useState } from "react";
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
  countState,
  getQuestionType,
  getQuestions,
} from "@pages/Survey/CreateSurvey/type";
import {
  getQuestionTypeItemStyle,
  getQuestionTypeListStyle,
  getQuestionsItemStyle,
  getQuestionsListStyle,
  CreateSurveyDiv,
  QuestionTypeListDiv,
  QuestionsListDiv,
} from "@pages/Survey/CreateSurvey/styles";

const CreateSurvey = (): JSX.Element => {
  const [questionTypeItems, setQuestionTypeItems] = useState<
    QuestionTypeItem[]
  >(getQuestionType());

  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [questionItems, setQuestionItems] = useState<QuestionsItem[]>(
    getQuestions()
  );

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
    console.log(countState);
    const add = {
      id: `add-${countQuestion}`,
      type: questionTypeItems[startIndex].content,
      content: questionTypeItems[startIndex].content,
    };
    result.splice(endIndex, 0, add);
    return result;
  };

  const multipleChoiceQuestion = (index: number) => {
    return <div>Q.{index} 객관식 문제입니다.</div>;
  };
  const subjectiveQuestion = (index: number) => {
    return <div>Q.{index} 주관식 문제입니다.</div>;
  };

  const alternativeQuestion = (index: number) => {
    return <div>Q.{index} 양자택일 문제입니다.</div>;
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
  };

  return (
    <CreateSurveyDiv>
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
                        {item.content === "객관식" &&
                          multipleChoiceQuestion(index)}
                        {item.content === "주관식" && subjectiveQuestion(index)}
                        {item.content === "찬반형" &&
                          alternativeQuestion(index)}
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
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
