import React, { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import {
  QuestionTypeItem,
  getQuestionType,
} from "@components/CreateSurveyDnd/type";
import {
  countState,
  createSurveyOptionState,
  selectedQuestionState,
  questionsState,
} from "../../States/SurveyState";
import { MultipleQuestion } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions/type";
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
  LeftSideBackDiv,
} from "@components/CreateSurveyDnd/styles";
import { MultipleChoiceQuestions } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions";
import { SubjectiveQuestions } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions";
import { RangeBarQuestions } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions";
import { Button, Input, Modal } from "antd";
import LogicTab from "@components/LogicTab";
import { Link, Element } from "react-scroll";
import { SelNodeState } from "../../States/LogicState";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CreateSurveyDnd = (): JSX.Element => {
  const [selNode, setSelNode] = useRecoilState(SelNodeState);

  const [questionTypeItems, setQuestionTypeItems] = useState<
    QuestionTypeItem[]
  >(getQuestionType());

  type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [selectedQuestion, setSelectedQuestion] = useRecoilState(
    selectedQuestionState
  );

  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [surveyId, setSurveyId] = useState("");
  // const [surveyQuestions, setSurveyQuestions] = useState<QuestionTypes[]>([]); // id, value 포함 전체 질문
  const [questions, setQuestions] = useState<QuestionTypes[]>([]); // id, value 제거 전체 질문
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState); // 전체 질문 recoil
  const isEmptyTitle = (title: string) => {
    return title === "" || title === "제목 없음";
  };

  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  // 하위컴포넌트에서 값 받고 적용
  const handleQuestionChange = (
    updatedQuestion: MultipleQuestion | SubjectiveQuestion | RangeBarQuestion,
    index: number
  ) => {
    const newQuestionItems = [...surveyQuestions];
    newQuestionItems[index] = updatedQuestion;
    setSurveyQuestions(() => newQuestionItems);

    // 값이 변하면 selectedRecoil 업데이트
    newQuestionItems.map((item) => {
      if ("id" in selectedQuestion) {
        if (item.id === selectedQuestion.id) {
          setSelectedQuestion(() => item);
        }
      }
    });
  };

  // recoilValue가 변하면 surveyQuestions 업데이트
  useEffect(() => {
    surveyQuestions.map((item, index) => {
      if ("id" in selectedQuestion) {
        if (item.id === selectedQuestion.id) {
          const newQuestionItems = [...surveyQuestions];
          newQuestionItems[index] = selectedQuestion;
          setSurveyQuestions(() => newQuestionItems);
        }
      }
    });
  }, [selectedQuestion]);

  const handleQuestionClick = (
    clickedQuestion: QuestionTypes,
    index: number
  ) => {
    setSelectedQuestion(() => clickedQuestion);
    setSelNode(String(index + 1));
  };

  // 질문 리스트 순서 바꾸기
  const reorderQuestions = (
    list: QuestionTypes[],
    startIndex: number,
    endIndex: number
  ): (MultipleQuestion | SubjectiveQuestion | RangeBarQuestion)[] => {
    const result = JSON.parse(JSON.stringify(list)) as QuestionTypes[];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((question, index) => ({
      ...(question as QuestionTypes),
      questionNumber: list[index].questionNumber,
      nextQuestionNumber: list[index].nextQuestionNumber,
    }));
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
      min: 0,
      max: 5,
    };
    if (questionTypeItems[startIndex].content === "객관식") {
      result.splice(endIndex, 0, {
        ...addMultiple,
      });
    } else if (questionTypeItems[startIndex].content === "주관식") {
      result.splice(endIndex, 0, {
        ...addSubjective,
      });
    } else if (questionTypeItems[startIndex].content === "선형배율") {
      result.splice(endIndex, 0, {
        ...addRangeBar,
      });
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
          surveyQuestions,
          result.source.index,
          result.destination.index
        );
        setSurveyQuestions(() => newItems1);
        setSurveyQuestions((prevState) => {
          return prevState.map((item, index) => {
            const nextNumber =
              item.nextQuestionNumber === "0" ||
              item.questionNumber === index.toString()
                ? (index + 2).toString()
                : item.nextQuestionNumber;
            return {
              ...item,
              questionNumber: (index + 1).toString(),
              nextQuestionNumber: nextNumber,
            };
          });
        });
      }
    }

    // 질문 유형 내의 컴포넌트를 drag
    if (result.source.droppableId === "questions") {
      const newItems2 = reorderQuestions(
        surveyQuestions,
        result.source.index,
        result.destination.index
      );
      setSurveyQuestions(() => newItems2);
    }
  };

  useEffect(() => {
    setSurveyQuestions(() => surveyQuestions);

    const updatedQuestions = surveyQuestions.map((item, index) => {
      if ("id" in item) {
        const { id, ...rest } = item;
        const updatedItem = Object.assign({}, item, {
          questionNumber: (index + 1).toString(),
        });
        item = updatedItem;
        if (
          index == surveyQuestions.length - 1 &&
          "finalQuestion" in item &&
          "nextQuestionNumber"
        ) {
          const updatedItem = Object.assign({}, item, {
            finalQuestion: true,
            nextQuestionNumber: "0",
          });
          item = updatedItem;
        }
      }
      return item;
    });
    setQuestions(() => updatedQuestions as QuestionTypes[]);
  }, [surveyQuestions]);

  const onClickSurveyDelete = (index: number) => {
    const newQuestionItems = [
      ...surveyQuestions.slice(0, index),
      ...surveyQuestions.slice(index + 1),
    ];

    const updatedSurveyQuestions = newQuestionItems.map((q, index) => {
      if (Number(q.questionNumber) + 1 == Number(q.nextQuestionNumber)) {
        return {
          ...q,
          questionNumber: String(index + 1),
          nextQuestionNumber: String(index + 2),
        };
      } else {
        return {
          ...q,
          questionNumber: String(index + 1),
        };
      }
    });

    setSurveyQuestions(updatedSurveyQuestions);
  };

  const mutation = useMutation<
    QuestionTypes[],
    AxiosError,
    {
      surveyTitle: string;
      questions: any;
    }
  >(
    "createSurvey",
    (data) =>
      axios
        .post("http://localhost:8080/surveys", data, {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => response.data),
    {
      onMutate() {},
      onSuccess(returnData: any) {
        setIsModalOpen(true);
        setSurveyId(returnData?.surveyId);
      },
      onError(error) {
        alert("양식을 알맞게 작성해주세요");
      },
    }
  );

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (surveyTitle && questions) {
        mutation.mutate({
          surveyTitle,
          questions: questions,
        });
      }
    },
    [surveyTitle, surveyQuestions, mutation]
  );

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <LeftSideBackDiv>
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
              {surveyQuestions.map((item, index) => {
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
                              color: isEmptyTitle(item.title)
                                ? "gray"
                                : "black",
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
                      {viewLogic !== "logic" ? (
                        <SidebarQuestionDelete
                          onClick={() => {
                            onClickSurveyDelete(index);
                          }}
                        >
                          X
                        </SidebarQuestionDelete>
                      ) : (
                        <div></div>
                      )}
                    </SidebarQuestion>
                  </Link>
                );
              })}
            </SidebarQuestions>
            {viewLogic === "logic" ? (
              <QuestionTypeListDiv></QuestionTypeListDiv>
            ) : (
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
            )}
          </QuestionsAndType>
        </LeftSideBackDiv>
        {viewLogic === "logic" ? (
          <LogicDiv>
            <LogicTab />
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
                  {surveyQuestions.map((item, index) => (
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
            {surveyQuestions.length >= 1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <Button type={"primary"} onClick={onSubmit}>
                  설문 생성하기
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </QuestionsListDiv>
        )}
        <Modal
          title="Cocoa"
          open={isModalOpen}
          onCancel={handleOk}
          footer={[
            <CopyToClipboard text={`http://localhost:3000/surveys/${surveyId}`}>
              <Button type="primary">링크 복사하기</Button>
            </CopyToClipboard>,
          ]}
          centered
        >
          <p>{`http://localhost:3000/surveys/${surveyId}`}</p>
        </Modal>
      </DragDropContext>
    </Wrapper>
  );
};

export default CreateSurveyDnd;
