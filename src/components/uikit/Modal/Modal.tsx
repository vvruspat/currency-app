import cn from "classnames";
import { ReactNode } from "react";

import "./Modal.css";
import { ReactComponent as CrossIcon } from "./assets/cross.svg";
import { IconButton } from "../";

type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: ReactNode;
  show: boolean;
  onClose: () => void;
};

export const Modal = ({
  header,
  show,
  className,
  onClose,
  children,
  ...htmlProps
}: ModalProps) => {
  return (
    <div
      className={cn("modal", { "modal-show": show }, className)}
      {...htmlProps}
    >
      {header && (
        <header className="modal-header">
          <div className="modal-header-content">{header}</div>
          <IconButton
            className="modal-header-close-button"
            onClick={() => onClose()}
            icon={<CrossIcon />}
          />
        </header>
      )}
      <section className="modal-content">{children}</section>
    </div>
  );
};
