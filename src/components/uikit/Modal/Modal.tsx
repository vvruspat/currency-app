import { ReactNode, useCallback } from "react";
import cn from "classnames";
import { useSwipeable } from "react-swipeable";
import { IconButton, Caption } from "../";
import { ReactComponent as Cross16Icon } from "./assets/Cross16Icon.svg";

import "./Modal.css";

export type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  header?: ReactNode;
  show: boolean;
  onClose?: () => void;
};

export const Modal = ({
  header,
  show,
  className,
  onClose,
  children,
  ...htmlProps
}: ModalProps) => {
  const onSwipedDown = useCallback(
    (eventData) => {
      onClose?.();
    },
    [onClose]
  );

  const swipeHandlers = useSwipeable({
    onSwipedDown,
    delta: 100,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
  });

  return (
    <>
      <div
        className={cn("modal-overlay", {
          "modal-overlay-show": show,
          "modal-overlay-hide": !show,
        })}
        onClick={() => onClose?.()}
      ></div>
      <div
        className={cn("modal", { "modal-show": show }, className)}
        {...htmlProps}
        {...swipeHandlers}
      >
        {header && (
          <header className="modal-header">
            <div className="modal-header-content">
              <Caption>{header}</Caption>
            </div>
            <IconButton
              className="modal-header-close-button"
              onClick={() => onClose?.()}
              icon={<Cross16Icon />}
            >
              Close
            </IconButton>
          </header>
        )}
        <section className="modal-content">{children}</section>
      </div>
    </>
  );
};
