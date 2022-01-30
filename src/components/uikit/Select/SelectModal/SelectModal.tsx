import { SelectorOption } from "../Select";
import { Modal, ModalProps } from "../../Modal";
import { Input } from "../..";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import FlipMove from "react-flip-move";
import { SelectOption } from "../SelectOption/SelectOption";
import { ModalsContext } from "../../../Modals/Modals";
import "./SelectModal.css";

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
  const [optionsList, setOptionsList] = useState(options ?? []);
  const { setModal } = useContext(ModalsContext);

  const onSelectOptionClick = useCallback(
    (option: SelectorOption) => {
      setModal(null);
      onChoose?.(option);
    },
    [setModal, onChoose]
  );

  useEffect(() => {
    if (options) {
      if (!searchValue) {
        setOptionsList(options);
      } else {
        const filteredOptions = options?.filter(
          (option) =>
            option.value.content
              ?.toString()
              .toLowerCase()
              .indexOf(searchValue.toLowerCase()) !== -1
        );

        setOptionsList(filteredOptions);
      }
    }
  }, [options, searchValue]);

  return (
    <Modal
      {...modalProps}
      header={
        <Input
          value={searchValue}
          className="select-modal-filter-input"
          placeholder="Search"
          data-testid="select-modal-filter-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      }
    >
      <FlipMove
        duration={350}
        easing="ease-out"
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {optionsList?.map((option: SelectorOption) => {
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
