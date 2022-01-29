import { ReactComponent as Chart16Icon } from "./assets/Chart16Icon.svg";
import "./ExchangeRate.css";

type ExchangeRateProps = {
  from: string;
  to: string;
};

export const ExchangeRate = ({ from, to }: ExchangeRateProps) => {
  return (
    <div className="exchange-rate">
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
      }).format(1.56765)}
    </div>
  );
};
