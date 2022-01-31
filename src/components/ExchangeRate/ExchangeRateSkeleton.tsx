import { ReactComponent as Chart16Icon } from "./assets/Chart16Icon.svg";
import "./ExchangeRate.css";

type ExchangeRateSkeletonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const ExchangeRateSkeleton = ({
  ...divProps
}: ExchangeRateSkeletonProps) => {
  return (
    <div className="exchange-rate" {...divProps}>
      <Chart16Icon className="exchange-rate-chart-icon" />
      <div className="exchange-rate-data skeleton"></div>
    </div>
  );
};
