import { SelectorOption } from "../Select";
import { Modal, ModalProps } from "../../Modal";
import { Input } from "../..";
import { ChangeEvent, useState } from "react";
import FlipMove from "react-flip-move";
import { SelectOption } from "../SelectOption/SelectOption";

export type SelectModalProps = ModalProps & {
  options?: SelectorOption[];
  onSelect?: (value: SelectorOption) => void;
};

export const SelectModal = ({
  options,
  onSelect,
  ...modalProps
}: SelectModalProps) => {
  const [searchValue, setSearchValue] = useState("");

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
        {options?.map((option: SelectorOption) => (
          <SelectOption
            onClick={() => onSelect?.(option)}
            {...option.value}
            key={option.key}
          />
        ))}
      </FlipMove>
    </Modal>
  );
};
