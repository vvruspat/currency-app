import cn from "classnames";
import { ReactNode } from "react";

import "./IconButton.css";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: ReactNode;
};

export const IconButton = ({
  className,
  icon,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button className={cn("icon-button", className)} {...buttonProps}>
      {icon}
    </button>
  );
};
