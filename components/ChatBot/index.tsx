import React, { FC, FormEvent, useCallback, useState } from "react";
import { CloseBtn, Container, Wrapper } from "@components/ChatBot/styles";
import axios from "axios";
import { ChatBotModal } from "@components/ChatBot/type";

const ChatBot: FC<ChatBotModal> = ({ onCloseCheckChatBotModal }) => {
  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <Wrapper onClick={stopPropagation}>
      <Container>
        챗봇임 ㅋ{/*<CloseBtn onClick={onCloseCheckChatBotModal}>X</CloseBtn>*/}
      </Container>
    </Wrapper>
  );
};

export default ChatBot;
