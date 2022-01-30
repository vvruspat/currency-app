import { useCallback, useContext } from "react";
import { IconButton } from "..";
import { MODALS, ModalsContext } from "../../Modals/Modals";
import { SelectOptionProps } from "./SelectOption/SelectOption";
import { ReactComponent as Down16Icon } from "./assets/Down16Icon.svg";
import { SelectModal } from "./SelectModal/SelectModal";

import "./Select.css";

export type SelectorOptionValue = SelectOptionProps;

export type SelectorOption = {
  key: string;
  value: SelectorOptionValue;
};

type SelectorProps = {
  value: SelectorOption;
  options: SelectorOption[];
  modalNav: MODALS;

  onChoose?: (value: SelectorOption) => void;
};

export const Select = ({ value, modalNav, ...props }: SelectorProps) => {
  const { setModal } = useContext(ModalsContext);

  const onIconButtonClick = useCallback(() => {
    setModal(modalNav);
  }, [modalNav, setModal]);

  return (
    <div data-testid="select-test">
      <IconButton
        icon={<Down16Icon />}
        align="right"
        onClick={onIconButtonClick}
        data-testid="select-buton"
      >
        {value ? value.value.content : <div className="skeleton"></div>}
      </IconButton>
      <SelectModal data-testid="select-modal" {...props} nav={modalNav} />
    </div>
  );
};
