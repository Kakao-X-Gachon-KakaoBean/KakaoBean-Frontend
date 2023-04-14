import React, { FC, FormEvent, useCallback, useState } from "react";
import {
  CloseBtn,
  Container,
  FalseContainer,
  Wrapper,
} from "@components/ChatBot/styles";
import axios from "axios";
import { ChatBotModal } from "@components/ChatBot/type";

const ChatBot: FC<ChatBotModal> = ({ show, onCloseCheckChatBotModal }) => {
  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  console.log(show);
  return (
    <Wrapper onClick={stopPropagation}>
      {show ? (
        <Container>
          챗봇임 ㅋ
          {/*<CloseBtn onClick={onCloseCheckChatBotModal}>X</CloseBtn>*/}
        </Container>
      ) : (
        <FalseContainer>
          챗봇임 ㅋ
          {/*<CloseBtn onClick={onCloseCheckChatBotModal}>X</CloseBtn>*/}
        </FalseContainer>
      )}
    </Wrapper>
  );
};

export default ChatBot;
