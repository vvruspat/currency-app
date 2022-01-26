import cn from "classnames";
import "./Input.css";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  align?: "left" | "right" | "center";
};

export const Input = ({
  align = "left",
  className,
  ...inputProps
}: InputProps) => {
  return (
    <input
      className={cn("input", `input-align-${align}`, className)}
      {...inputProps}
    />
  );
};
