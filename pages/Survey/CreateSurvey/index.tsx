import React, { useCallback, useState } from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import {
  CreateSurveyDiv,
  DialogButton,
} from "@pages/Survey/CreateSurvey/styles";
import Modal from "@components/Modal";
import Chatbot from "react-chatbot-kit";
import CreateSurveySideBar from "@components/CreateSurveySideBar";

const CreateSurvey = (): JSX.Element => {
  const [chatBotModal, setChatBotModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const onCloseModal = useCallback(() => {
    setModal((prev) => !prev);
  }, []);

  const onCloseChatBotModal = useCallback(() => {
    setChatBotModal((prev: boolean) => !prev);
  }, []);

  return (
    <CreateSurveyDiv>
      <CreateSurveyDnd />
      <CreateSurveySideBar />
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>모달 열렸어!</Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>모달</DialogButton>
      {/*<Chatbot*/}
      {/*  config={config}*/}
      {/*  messageParser={MessageParser}*/}
      {/*  actionProvider={ActionProvider}*/}
      {/*/>*/}
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
