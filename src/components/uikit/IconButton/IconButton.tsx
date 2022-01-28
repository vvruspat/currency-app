import cn from "classnames";
import { ReactNode } from "react";

import "./IconButton.css";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode;
  width?: number;
  height?: number;
  align?: "left" | "right";
};

export const IconButton = ({
  className,
  icon,
  children,
  align = "left",
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "icon-button",
        { "icon-right": align === "right" },
        className
      )}
      {...buttonProps}
    >
      <div className="icon-button-icon">{icon}</div>
      {children && <div className="icon-button-text">{children}</div>}
    </button>
  );
};
