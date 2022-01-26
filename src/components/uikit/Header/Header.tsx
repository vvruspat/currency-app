import cn from "classnames";
import { Title } from "../";
import "./Header.css";

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Header = ({ className, children, ...htmlProps }: HeaderProps) => {
  return (
    <header className={cn("header", className)} {...htmlProps}>
      <Title>{children}</Title>
    </header>
  );
};
