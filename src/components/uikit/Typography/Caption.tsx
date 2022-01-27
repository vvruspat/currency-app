import cn from "classnames";
import "./Caption.css";

type CaptionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Caption = ({
  className,
  children,
  ...htmlProps
}: CaptionProps) => {
  return (
    <div className={cn("caption", className)} {...htmlProps}>
      {children}
    </div>
  );
};
