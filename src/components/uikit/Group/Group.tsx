import cn from "classnames";

import "./Group.css";

type GroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Group = ({ className, children, ...htmlProps }: GroupProps) => {
  return (
    <section className={cn("group", className)} {...htmlProps}>
      {children}
    </section>
  );
};
