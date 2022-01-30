import React, { useCallback, useState } from "react";

export const ModalsContext = React.createContext<{
  setModal: (modal: MODALS | null) => void;
  modal: MODALS | null;
}>({
  setModal: (modal: MODALS | null) => {},
  modal: null,
});

export enum MODALS {
  SELECT_CURRENCY_FROM_MODAL = "select-currency-from-modal",
  SELECT_CURRENCY_TO_MODAL = "select-currency-to-modal",
  ERROR_MODAL = "error-modal",
  EXCHANGE_SUCCESS_MODAL = "exchange-success-modal",
}

type ModalsRootProps = {};

export const ModalsRoot: React.FC<ModalsRootProps> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<MODALS | null>(null);

  const setModal = useCallback((modal: MODALS | null) => {
    setCurrentModal(modal);
  }, []);

  return (
    <ModalsContext.Provider value={{ setModal, modal: currentModal }}>
      {children}
    </ModalsContext.Provider>
  );
};
