import cn from "classnames";
import "./Title.css";

type TitleProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Title = ({ className, children, ...htmlProps }: TitleProps) => {
  return (
    <div className={cn("title", className)} {...htmlProps}>
      {children}
    </div>
  );
};
