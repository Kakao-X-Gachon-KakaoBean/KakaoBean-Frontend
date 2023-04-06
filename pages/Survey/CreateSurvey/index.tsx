import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { atom, useRecoilState } from 'recoil';

interface QuestionTypeItem {
    id: string;
    type: string;
    content: string;
}
interface QuestionsItem {
    id: string;
    type: string;
    content: string;
}
const countState = atom({
    key: 'countQuestions',
    default: 10,
})

const getQuestionType = (): QuestionTypeItem[] => [
    {
        id: "0",
        type: "객관식",
        content: "객관식"
    },
    {
        id: "1",
        type: "주관식",
        content: "주관식"
    },
    {
        id: "2",
        type: "찬반형",
        content: "찬반형"
    }
];

const getQuestions = (count: number): QuestionsItem[] =>
    Array.from({ length: count }, (_, k) => k).map((k) => ({
        id: `item-${k}`,
        type: `undefined`,
        content: `item ${k}`,
    }));


const reorderQuestionType = (list: QuestionTypeItem[], startIndex: number, endIndex: number): QuestionTypeItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const reorderQuestions = (list: QuestionsItem[], startIndex: number, endIndex: number): QuestionsItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


// dnd style
const getQuestionTypeItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});

const getQuestionTypeListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
});

const getQuestionsItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
    userSelect: 'none',
    padding: 20,
    margin: `0 0 10px 0`,

    background: isDragging ? "green" : "white",

    ...draggableStyle
})

const getQuestionsListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? 'blue' : 'darkgrey',
    padding: 10,
    width: 350,
})



const CreateSurvey = (): JSX.Element => {
    const [questionTypeItems, setQuestionTypeItems] = useState<QuestionTypeItem[]>(getQuestionType());

    const [countQuestion, setCountQuestion] = useRecoilState(countState);
    const [questionItems, setQuestionItems] = useState<QuestionsItem[]>(getQuestions(countQuestion));
    

    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === "questionType") {
            const newItems1 = reorderQuestionType(
                questionTypeItems,
                result.source.index,
                result.destination.index
            );
            setQuestionTypeItems(newItems1);
            if (result.destination.droppableId === "questions") {
                setCountQuestion(countQuestion + 1);
                console.log(result);
                // detination의 index-1 과 index+1 사이에 source의 index에 해당하는 값의 양식을 넣어야 한다.
            }
        }
        if (result.source.droppableId === "questions") {
            const newItems2 = reorderQuestions(
                questionItems,
                result.source.index,
                result.destination.index
            )
            setQuestionItems(newItems2);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
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
                </div>
                <div style={{ flex: 1 }}>
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
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}

export default CreateSurvey;
