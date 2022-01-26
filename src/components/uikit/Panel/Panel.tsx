import cn from "classnames";

import "./Panel.css";

type PanelProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Panel = ({ className, children, ...htmlProps }: PanelProps) => {
  return (
    <section className={cn("panel", className)} {...htmlProps}>
      <div className="panel-content">{children}</div>
    </section>
  );
};
