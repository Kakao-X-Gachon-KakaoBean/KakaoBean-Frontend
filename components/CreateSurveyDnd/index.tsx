import React, { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  QuestionTypeItem,
  QuestionsItem,
  getQuestionType,
  getQuestions,
} from "@components/CreateSurveyDnd/type";
import {
  countState,
  createSurveyOptionState,
  selectedQuestionState,
} from "../../States/SurveyState";
import {
  MultipleQuestion,
  Logic,
} from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
import { SubjectiveQuestion } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions/type";
import { RangeBarQuestion } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions/type";
import {
  getQuestionTypeItemStyle,
  getQuestionTypeListStyle,
  getQuestionsListStyle,
  QuestionTypeListDiv,
  QuestionsListDiv,
  LogicDiv,
  QuestionsAndType,
  Wrapper,
  SidebarQuestions,
  SidebarQuestionTitle,
  SidebarQuestionDelete,
  SidebarSelectedQuestion,
  SidebarNoneSelectedQuestion,
  getQuestionsItemSelectedStyle,
  getQuestionsItemNoneSelectedStyle,
} from "@components/CreateSurveyDnd/styles";
import { MultipleChoiceQuestions } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions";
import { SubjectiveQuestions } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions";
import { RangeBarQuestions } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions";
import Product from "@pages/Product";
import { Button, Input } from "antd";
import { Link, Element } from "react-scroll";

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
  const [selectedQuestion, setSelectedQuestion] = useRecoilState(
    selectedQuestionState
  );
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [questionItems, setQuestionItems] = useState<QuestionTypes[]>([]);
  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  const isEmptyTitle = (title: string) => {
    return title === "" || title === "제목 없음";
  };

  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);

  // 하위컴포넌트에서 값 받고 적용
  const handleQuestionChange = (
    updatedQuestion: MultipleQuestion | SubjectiveQuestion | RangeBarQuestion,
    index: number
  ) => {
    const newQuestionItems = [...questionItems];
    newQuestionItems[index] = updatedQuestion;
    setQuestionItems(() => newQuestionItems);

    // 값이 변하면 selectedRecoil 업데이트
    newQuestionItems.map((item, index) => {
      if ("id" in selectedQuestion) {
        if (item.id === selectedQuestion.id) {
          setSelectedQuestion(() => item);
        }
      }
    });
  };

  // recoilValue가 변하면 questionItems 업데이트
  useEffect(() => {
    questionItems.map((item, index) => {
      if ("id" in selectedQuestion) {
        if (item.id === selectedQuestion.id) {
          const newQuestionItems = [...questionItems];
          newQuestionItems[index] = selectedQuestion;
          setQuestionItems(() => newQuestionItems);
        }
      }
    });
  }, [selectedQuestion]);

  const handleQuestionClick = (
    clickedQuestion: QuestionTypes,
    index: number
  ) => {
    setSelectedQuestion(() => clickedQuestion);
  };

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
      questionNumber: "",
      finalQuestion: false,
      nextQuestionNumber: "0",
      numberOfAnswerChoices: 1,
      answers: [""],
      logics: [],
    };
    const addSubjective = {
      id: `KEA-KakaoBeans-${countQuestion}`,
      type: "ESSAY",
      title: "",
      explanation: "",
      questionNumber: "0",
      finalQuestion: false,
      nextQuestionNumber: "0",
    };
    const addRangeBar = {
      id: `KEA-KakaoBeans-${countQuestion}`,
      type: "RANGE",
      title: "",
      explanation: "",
      questionNumber: "0",
      finalQuestion: false,
      nextQuestionNumber: "0",
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
    //테스트

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
        setQuestionItems(() => newItems1);
      }
    }

    // 질문 유형 내의 컴포넌트를 drag
    if (result.source.droppableId === "questions") {
      const newItems2 = reorderQuestions(
        questionItems,
        result.source.index,
        result.destination.index
      );
      setQuestionItems(() => newItems2);
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
    console.log("id 확인용 json", questionItems);
    const updatedQuestions = questionItems.map((item) => {
      if ("id" in item) {
        const { id, ...rest } = item;
        return rest;
      } else if ("value" in item) {
        const { value, ...rest } = item as RangeBarQuestion;
        return rest;
      }
      return item;
    });
    setQuestions(() => updatedQuestions as QuestionTypes[]);
  }, [questionItems]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <QuestionsAndType>
          <SidebarQuestions>
            <Input
              size="large"
              placeholder="설문 제목"
              bordered={false}
              style={{ fontWeight: "bold" }}
              onChange={(event) => {
                setSurveyTitle(event.target.value);
              }}
            />
            <div style={{ height: "3rem", marginTop: "2rem" }}>전체 문항</div>
            {questionItems.map((item, index) => {
              const SidebarQuestion =
                selectedQuestion.id === item.id
                  ? SidebarSelectedQuestion
                  : SidebarNoneSelectedQuestion;
              return (
                <Link to={item.id} smooth={true} key={index} offset={-220}>
                  <SidebarQuestion
                    onClick={() => {
                      if (
                        item.type == "MULTIPLE" ||
                        item.type == "ESSAY" ||
                        item.type == "RANGE"
                      ) {
                        handleQuestionClick(item, index);
                      }
                    }}
                    style={
                      "title" in item
                        ? {
                            color: isEmptyTitle(item.title) ? "gray" : "black",
                          }
                        : { color: "black" }
                    }
                  >
                    <SidebarQuestionTitle>
                      Q.{index + 1 + " "}
                      {"title" in item
                        ? item.title == ""
                          ? "제목 없음"
                          : item.title
                        : "제목 타입 없음"}
                    </SidebarQuestionTitle>
                    <SidebarQuestionDelete
                      onClick={() => {
                        const newQuestionItems = [
                          ...questionItems.slice(0, index),
                          ...questionItems.slice(index + 1),
                        ];
                        setQuestionItems(newQuestionItems);
                      }}
                    >
                      X
                    </SidebarQuestionDelete>
                  </SidebarQuestion>
                </Link>
              );
            })}
          </SidebarQuestions>
          <QuestionTypeListDiv>
            <Droppable droppableId="questionType" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getQuestionTypeListStyle(snapshot.isDraggingOver)}
                >
                  {questionTypeItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
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
        </QuestionsAndType>
        {viewLogic === "logic" ? (
          <LogicDiv>
            <Product />
          </LogicDiv>
        ) : (
          <QuestionsListDiv>
            <Droppable droppableId="questions" isDropDisabled={false}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getQuestionsListStyle(snapshot.isDraggingOver)}
                >
                  {questionItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Element name={item.id}>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={
                              item.id === selectedQuestion.id
                                ? getQuestionsItemSelectedStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )
                                : getQuestionsItemNoneSelectedStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )
                            }
                          >
                            {item.type === "MULTIPLE" && (
                              <MultipleChoiceQuestions
                                id={item.id}
                                question={item as MultipleQuestion}
                                onChange={(updatedQuestion) =>
                                  handleQuestionChange(updatedQuestion, index)
                                }
                              />
                            )}
                            {item.type === "ESSAY" && "title" in item && (
                              <SubjectiveQuestions
                                id={item.id}
                                question={item as SubjectiveQuestion}
                                onChange={(updatedQuestion) =>
                                  handleQuestionChange(updatedQuestion, index)
                                }
                              />
                            )}
                            {item.type === "RANGE" && (
                              <RangeBarQuestions
                                id={item.id}
                                question={item as RangeBarQuestion}
                                onChange={(updatedQuestion) =>
                                  handleQuestionChange(updatedQuestion, index)
                                }
                              />
                            )}
                          </div>
                        </Element>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {questionItems.length >= 1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <Button type={"primary"}>설문 생성하기</Button>
              </div>
            ) : (
              <div></div>
            )}
          </QuestionsListDiv>
        )}
      </Wrapper>
    </DragDropContext>
  );
};

export default CreateSurveyDnd;
