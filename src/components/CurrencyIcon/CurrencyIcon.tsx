import cn from "classnames";
import "./CurrencyIcon.css";

type CurrencyIconProps = {
  currency: string;
};

export const CurrencyIcon = ({ currency }: CurrencyIconProps) => {
  return (
    <div className={cn("currency-icon", `currency-icon-${currency}`)}></div>
  );
};
