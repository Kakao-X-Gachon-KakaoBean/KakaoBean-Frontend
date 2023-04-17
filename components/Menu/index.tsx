import React, { FC, useCallback } from "react";
import { CreateModal } from "@components/Menu/styles";
import { Props } from "@components/Menu/type";

const Menu: FC<Props> = ({ children, show, onCloseModal, closeButton }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div>
      <CreateModal>
        <div>{children}</div>
      </CreateModal>
    </div>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
