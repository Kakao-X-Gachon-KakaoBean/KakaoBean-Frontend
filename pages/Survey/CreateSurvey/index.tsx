import React, { useCallback, useState } from "react";
import CreateSurveyDnd from "@components/CreateSurveyDnd";

import {
  CreateSurveyDiv,
  DialogButton,
} from "@pages/Survey/CreateSurvey/styles";
import Modal from "@components/Modal";

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
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>모달 열렸어!</Modal>
      )}
      <DialogButton onClick={onClickToggleModal}>모달</DialogButton>
    </CreateSurveyDiv>
  );
};

export default CreateSurvey;
