// export type allChat = RecommendedChatTitle[] | userChat;

export interface RecommendedChatTitle {
  id: number;
  title: string;
  checked: boolean;
}

export interface answerSet {
  index: number;
  answer: RecommendedChatTitle[];
}

export interface userChat {
  index: number;
  message: string;
}

// export interface allChat {
//   index: number;
//   question: userChat;
//   answer: RecommendedChatTitle[];
// }

// {if ((titleSet[index] !== null) && (titleSet[index] !== undefined)) {
//           return (
//             <div>
//             {/*---------------추천된 설문 박스--------------- */}
//               <ResponsesDiv>
//               {/*---------------설문 버튼 여러개 생성 map--------------- */}
//                 {answerSet[index].answer.map((item, indexOfGptMessage) => {
//                 return (
//                     <div
//                         style={{marginTop: "1rem"}}
//                         key={indexOfGptMessage}
//                     >
//                       {/*---------------설문 제목 별 버튼--------------- */}
//                       <ChatTitleButton
//                           type={item.checked ? "primary" : "default"}
//                           onClick={() =>
//                               handleChatTitleClick(index, indexOfGptMessage)
//                           }
//                       >
//                         {item.title}
//                       </ChatTitleButton>
//                       {/*---------------설문 제목 별 버튼--------------- */}
//                     </div>
//                 );
//               })}
//               {/*---------------설문 버튼 여러개 생성 map--------------- */}
//
//               {/*---------------설문 생성 버튼--------------- */}
//               <CreateQuestionsBtnDiv>
//                 <Button
//                     type={"primary"}
//                     onClick={SubmitQuestion}
//                     loading={submitBtnLoadings[0]}
//                 >
//                   질문 생성하기
//                 </Button>
//               </CreateQuestionsBtnDiv>
//               {/*---------------설문 생성 버튼--------------- */}
//             </ResponsesDiv>
//             {/*---------------추천된 설문 박스////--------------- */}
//           </div>
//       );
//     }
//   }
// ).reverse()}
