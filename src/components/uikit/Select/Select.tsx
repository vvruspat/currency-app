import { useCallback, useContext } from "react";
import { IconButton } from "..";
import { MODALS, ModalsContext } from "../../Modals/Modals";
import { SelectOptionProps } from "./SelectOption/SelectOption";
import { ReactComponent as Down16Icon } from "./assets/Down16Icon.svg";

import "./Select.css";

export type SelectorOptionValue = SelectOptionProps;

export type SelectorOption = {
  key: string;
  value: SelectorOptionValue;
};

type SelectorProps = {
  value: SelectorOption;
  options: SelectorOption[];

  onSelect?: (value: SelectorOption) => void;
};

export const Select = ({ value, options, onSelect }: SelectorProps) => {
  const { setModal } = useContext(ModalsContext);

  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);

  const onIconButtonClick = useCallback(() => {
    setModal({
      modal: MODALS.SELECT_MODAL,
      props: { options, onSelect, onClose },
    });
  }, [setModal, options, onSelect, onClose]);

  return (
    <IconButton icon={Down16Icon} onClick={onIconButtonClick}>
      {value}
    </IconButton>
  );
};
