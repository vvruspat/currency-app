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

  onChoose?: (value: SelectorOption) => void;
};

export const Select = ({ value, ...props }: SelectorProps) => {
  const { setModal } = useContext(ModalsContext);

  const onIconButtonClick = useCallback(() => {
    setModal(MODALS.SELECT_MODAL);
  }, [setModal]);

  return (
    <>
      <IconButton
        icon={<Down16Icon />}
        align="right"
        onClick={onIconButtonClick}
      >
        {value.value.content}
      </IconButton>
      <SelectModal {...props} nav={MODALS.SELECT_MODAL} />
    </>
  );
};
