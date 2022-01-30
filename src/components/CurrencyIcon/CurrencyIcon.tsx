import cn from "classnames";
import "./CurrencyIcon.css";

type CurrencyIconProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  currency: string;
};

export const CurrencyIcon = ({ currency, ...divProps }: CurrencyIconProps) => {
  return (
    <div
      className={cn("currency-icon", `currency-icon-${currency}`)}
      {...divProps}
    ></div>
  );
};
