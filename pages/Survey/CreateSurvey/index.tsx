import React, { useCallback, useState } from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import { ChatBtn, CreateSurveyDiv } from "@pages/Survey/CreateSurvey/styles";
import ChatBot from "@components/ChatBot";
import Menu from "@components/Menu";

const CreateSurvey = (): JSX.Element => {
  const [chatBotModal, setChatBotModal] = useState(false);

  const onCloseChatBotModal = useCallback(() => {
    setChatBotModal((prev) => !prev);
  }, []);
  return (
    <CreateSurveyDiv>
      <CreateSurveyDnd />
      <ChatBtn type="button" onClick={onCloseChatBotModal}>
        챗봇 열어라
      </ChatBtn>
      {chatBotModal && (
        <Menu show={chatBotModal} onCloseModal={onCloseChatBotModal}>
          <ChatBot onCloseCheckChatBotModal={onCloseChatBotModal} />
        </Menu>
      )}
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
