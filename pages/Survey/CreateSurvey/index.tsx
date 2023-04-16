import React, { useCallback, useState } from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import {
  ChatBtn,
  CreateSurveyDiv,
  Container,
  FalseContainer,
} from "@pages/Survey/CreateSurvey/styles";
import Menu from "@components/Menu";

const CreateSurvey = (): JSX.Element => {
  const [chatBotModal, setChatBotModal] = useState(false);

  const onCloseChatBotModal = useCallback(() => {
    setChatBotModal((prev: boolean) => !prev);
  }, []);

  const stopPropagation = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <CreateSurveyDiv>
      <CreateSurveyDnd />
      <Menu show={chatBotModal} onCloseModal={onCloseChatBotModal}>
        <div>
          {chatBotModal ? (
            <Container>챗봇 영역</Container>
          ) : (
            <FalseContainer>챗봇 영역</FalseContainer>
          )}
        </div>
      </Menu>
      <ChatBtn type="button" onClick={onCloseChatBotModal}>
        챗봇 열어라
      </ChatBtn>
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
