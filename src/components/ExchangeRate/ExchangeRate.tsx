import { ReactComponent as Chart16Icon } from "./assets/Chart16Icon.svg";
import "./ExchangeRate.css";

type ExchangeRateProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  from: string;
  to: string;
  rate: number;
};

export const ExchangeRate = ({
  from,
  to,
  rate,
  ...divProps
}: ExchangeRateProps) => {
  return (
    <div className="exchange-rate" {...divProps}>
      <Chart16Icon className="exchange-rate-chart-icon" />
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: from,
      }).format(1)}{" "}
      ={" "}
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: to,
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      }).format(rate)}
    </div>
  );
};
