import { SelectorOption } from "../Select";
import { Modal, ModalProps } from "../../Modal";
import { Input } from "../..";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import FlipMove from "react-flip-move";
import { SelectOption } from "../SelectOption/SelectOption";
import { ModalsContext } from "../../../Modals/Modals";

export type SelectModalProps = ModalProps & {
  options?: SelectorOption[];
  onChoose?: (value: SelectorOption) => void;
};

export const SelectModal = ({
  options,
  onChoose,
  ...modalProps
}: SelectModalProps) => {
  const [searchValue, setSearchValue] = useState("");
  const { setModal } = useContext(ModalsContext);

  const onSelectOptionClick = useCallback(
    (option: SelectorOption) => {
      setModal(null);
      onChoose?.(option);
    },
    [setModal, onChoose]
  );

  return (
    <Modal
      {...modalProps}
      header={
        <Input
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      }
    >
      <FlipMove duration={750} easing="ease-out">
        {options?.map((option: SelectorOption) => {
          return (
            <SelectOption
              onClick={() => onSelectOptionClick(option)}
              {...option.value}
              key={option.key}
            />
          );
        })}
      </FlipMove>
    </Modal>
  );
};
