import React, { useCallback, useState } from "react";
import {
  SelectModal,
  SelectModalProps,
} from "../uikit/Select/SelectModal/SelectModal";

export const ModalsContext = React.createContext<{
  setModal: (modal: ModalsProps | null) => void;
}>({
  setModal: (modal: ModalsProps | null) => {},
});

export enum MODALS {
  SELECT_MODAL = "select-modal",
  ERROR_MODAL = "error-modal",
  EXCHANGE_SUCCESS_MODAL = "exchange-success-modal",
}

// TODO: render and start modals from the component where it need

type ModalsProps = {
  modal: MODALS.SELECT_MODAL;
  props: SelectModalProps;
};
// | { modal: MODALS.ERROR_MODAL; props: /*ErrorModalProps*/ {} }
// | {
//     modal: MODALS.EXCHANGE_SUCCESS_MODAL;
//     props: /*ExchangeSuccessModalProps*/ {};
//   };

type ModalsRootProps = {};

export const ModalsRoot: React.FC<ModalsRootProps> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ModalsProps | null>(null);

  const setModal = useCallback((modal: ModalsProps | null) => {
    setCurrentModal(modal);
  }, []);

  return (
    <ModalsContext.Provider value={{ setModal }}>
      {children}
      {/* <ErrorModal
        {...currentModalProps}
        show={currentModal === MODALS.ERROR_MODAL}
      /> */}
      <SelectModal
        {...currentModal?.props}
        show={currentModal?.modal === MODALS.SELECT_MODAL}
      />
      {/* <ExchangeSuccessModal
        {...currentModalProps}
        show={currentModal === MODALS.EXCHANGE_SUCCESS_MODAL}
      /> */}
    </ModalsContext.Provider>
  );
};
