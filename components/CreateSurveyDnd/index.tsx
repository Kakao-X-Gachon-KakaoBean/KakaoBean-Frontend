import React, { FormEvent, useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
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
} from "@components/CreateSurveyDnd/styles";
import { MultipleChoiceQuestions } from "@components/CreateSurveyDnd/QuestionItems/MultipleChoiceQuestions";
import { SubjectiveQuestions } from "@components/CreateSurveyDnd/QuestionItems/SubjectiveQuestions";
import { RangeBarQuestions } from "@components/CreateSurveyDnd/QuestionItems/RangeBarQuestions";
import { Button, Input } from "antd";
import LogicTab from "@components/LogicTab";
import { Link, Element } from "react-scroll";
import {
  SelNodeState,
  IdNumState,
  NodeState,
  EdgeState,
  LogicCountState,
  MultiConditionState,
  QuestionList,
} from "../../States/LogicState";
import { Edge, Node } from "react-flow-renderer";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

const CreateSurveyDnd = (): JSX.Element => {
  const [nodes, setNodes] = useRecoilState(NodeState);
  const [edges, setEdges] = useRecoilState(EdgeState);
  // 현재 선택한 노드
  const [selNode, setSelNode] = useRecoilState(SelNodeState);
  const [idNum, setIdNum] = useRecoilState(IdNumState);

  //로직 개수 count
  const [count, setCount] = useRecoilState(LogicCountState);
  //로직 조건 개수 count
  const [isMultiCondition, setIsMultiCondition] =
    useRecoilState(MultiConditionState);
  const [questionList, setQuestionList] = useRecoilState(QuestionList);

  const [questionTypeItems, setQuestionTypeItems] = useState<
    QuestionTypeItem[]
  >(getQuestionType());

  type QuestionTypes = MultipleQuestion | SubjectiveQuestion | RangeBarQuestion;
  const [countQuestion, setCountQuestion] = useRecoilState(countState);
  const [selectedQuestion, setSelectedQuestion] = useRecoilState(
    selectedQuestionState
  );
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  // const [surveyQuestions, setSurveyQuestions] = useState<QuestionTypes[]>([]); // id, value 포함 전체 질문
  const [questions, setQuestions] = useState<QuestionTypes[]>([]); // id, value 제거 전체 질문
  const [surveyQuestions, setSurveyQuestions] = useRecoilState(questionsState); // 전체 질문 recoil
  const isEmptyTitle = (title: string) => {
    return title === "" || title === "제목 없음";
  };

  const [viewLogic, setViewLogic] = useRecoilState(createSurveyOptionState);

  // 하위컴포넌트에서 값 받고 적용
  const handleQuestionChange = (
    updatedQuestion: MultipleQuestion | SubjectiveQuestion | RangeBarQuestion,
    index: number
  ) => {
    const newQuestionItems = [...surveyQuestions];
    newQuestionItems[index] = updatedQuestion;
    setSurveyQuestions(() => newQuestionItems);

    // 값이 변하면 selectedRecoil 업데이트
    newQuestionItems.map((item, index) => {
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

  // useEffect(() => {
  //   console.log("questions:", questions);
  // }, [questions]);
  //
  // useEffect(() => {
  //   console.log("surveyQuestions:", surveyQuestions);
  // }, [surveyQuestions]);

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

  //설문 추가될때 마다 node, edge, logic, count, 멀티 로직 count 초기화
  useEffect(() => {
    let i = 0;
    const newNodeTuple: Node[] = [];
    const newEdgeTuple: Edge[] = [];
    const newQuestionTuple: any[] = [];
    setIdNum(1);
    let yaxis = 30;
    let newNode, newEdge;

    // 여기서 i < ? 숫자 바꾸면 그 갯수만큼 생성
    for (i = 0; i < surveyQuestions.length; i++) {
      if (i == 0) {
        newNode = {
          id: String(i + 1),
          type: "input",
          data: {
            label:
              surveyQuestions[i].title !== ""
                ? surveyQuestions[i].title
                : "제목 없음",
          },
          position: { x: 500, y: yaxis },
        };
      } else {
        if (i == surveyQuestions.length - 1) {
          newNode = {
            id: String(i + 1),
            data: {
              label:
                surveyQuestions[i].title !== ""
                  ? surveyQuestions[i].title
                  : "제목 없음",
            },
            position: { x: 500, y: yaxis },
          };
        } else {
          newNode = {
            id: String(i + 1),
            data: {
              label:
                surveyQuestions[i].title !== ""
                  ? surveyQuestions[i].title
                  : "제목 없음",
            },
            position: { x: 500, y: yaxis },
          };
        }
      }

      newEdge = {
        id: "e" + String(i + 1) + "-" + String(i + 2),
        source: String(i + 1),
        target: String(i + 2),
      };

      setCount((prevCount) => [...prevCount, 0]);
      setIsMultiCondition((prevVal) => [...prevVal, 1]);
      newNodeTuple.push(newNode);
      newEdgeTuple.push(newEdge);
      newQuestionTuple.push({ value: String(i + 1), label: String(i + 1) });

      setIdNum(idNum + 1);
      yaxis += 100;
    }

    const submitNode = {
      id: "0",
      type: "output",
      data: { label: "submit" },
      position: { x: 500, y: yaxis },
    };

    const submitEdge = {
      id: "e_submit",
      source: String(i),
      target: "0",
    };

    newNodeTuple.push(submitNode);
    newEdgeTuple.push(submitEdge);
    newQuestionTuple.push({ value: "0", label: "제출하기" });

    console.log(newNodeTuple);
    setNodes(newNodeTuple);
    setEdges(newEdgeTuple);
    setQuestionList(newQuestionTuple);
  }, [surveyQuestions.length]);

  useEffect(() => {
    let i = 0;
    let yaxis = 30;
    let updatedNodes = JSON.parse(JSON.stringify(nodes));
    updatedNodes.pop();
    for (i; i < surveyQuestions.length; i++) {
      if (updatedNodes[i]) {
        updatedNodes[i].data.label =
          surveyQuestions[i].title !== ""
            ? surveyQuestions[i].title
            : "제목 없음";
        yaxis = yaxis + 100;
      }
    }

    const submitNode = {
      id: "0",
      type: "output",
      data: { label: "submit" },
      position: { x: 500, y: yaxis },
    };

    updatedNodes.push(submitNode);

    setNodes(updatedNodes);
    //setEdges(newEdgeTuple);
    //setQuestionList(newQuestionTuple);
  }, [surveyQuestions.map((question) => question.title).join("")]);

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
      onSuccess() {
        alert("성공");
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
                          ...surveyQuestions.slice(0, index),
                          ...surveyQuestions.slice(index + 1),
                        ];
                        setSurveyQuestions(newQuestionItems);
                      }}
                    >
                      X
                    </SidebarQuestionDelete>
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
      </Wrapper>
    </DragDropContext>
  );
};

export default CreateSurveyDnd;
