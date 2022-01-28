import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import cn from "classnames";
import { useSwipeable } from "react-swipeable";
import { IconButton, Caption } from "../";
import { ReactComponent as Cross16Icon } from "./assets/Cross16Icon.svg";

import "./Modal.css";
import { MODALS, ModalsContext } from "../../Modals/Modals";

export type ModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  nav: MODALS;
  header?: ReactNode;
  onClose?: () => void;
};

export const Modal = ({
  nav,
  header,
  className,
  onClose,
  children,
  ...htmlProps
}: ModalProps) => {
  const [show, setShow] = useState(false);
  const { modal, setModal } = useContext(ModalsContext);

  const close = useCallback(() => {
    setModal(null);
    onClose?.();
  }, [onClose, setModal]);

  const onSwipedDown = useCallback(
    (eventData) => {
      close();
    },
    [close]
  );

  const swipeHandlers = useSwipeable({
    onSwipedDown,
    delta: 100,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
  });

  useEffect(() => {
    setShow(modal === nav);
  }, [modal, nav]);

  return (
    <>
      <div
        className={cn("modal-overlay", {
          "modal-overlay-show": show,
          "modal-overlay-hide": !show,
        })}
        onClick={() => close()}
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
              onClick={() => close()}
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
