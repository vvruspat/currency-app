import cn from "classnames";

import "./Button.css";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  mode?: "primary" | "secondary";
  stretched?: boolean;
};

export const Button = ({
  className,
  stretched = false,
  mode = "primary",
  children,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "button",
        `${mode}-button`,
        { "stretched-button": stretched },
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
