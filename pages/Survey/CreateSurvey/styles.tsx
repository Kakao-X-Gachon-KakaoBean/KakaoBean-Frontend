import styled from "@emotion/styled";

// dnd styles
export const getQuestionTypeItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});

export const getQuestionTypeListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
});

export const getQuestionsItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
    userSelect: 'none',
    padding: 20,
    margin: `0 0 10px 0`,
    background: isDragging ? "green" : "white",

    ...draggableStyle
})

export const getQuestionsListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? 'skyblue' : 'darkgrey',
    padding: 90,
    width: 450,
})


// component style
export const CreateSurveyDiv = styled.div`
    display: flex;
`;

export const QuestionTypeListDiv = styled.div`
    flex: 1;
`;

export const QuestionsListDiv = styled.div`
    flex: 1;
`;