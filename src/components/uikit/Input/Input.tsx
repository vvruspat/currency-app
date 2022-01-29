import cn from "classnames";
import { forwardRef } from "react";
import "./Input.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  align?: "left" | "right" | "center";
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ align = "left", className, ...inputProps }: InputProps, ref) => {
    return (
      <input
        className={cn("input", `input-align-${align}`, className)}
        {...inputProps}
        ref={ref}
      />
    );
  }
);
