type BalanceProps = {
  balance: number;
  currency: string;
  locale?: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Balance = ({
  balance,
  currency,
  locale = "en-US",
  ...divProps
}: BalanceProps) => {
  return (
    <div {...divProps}>
      Balance:{" "}
      {new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(balance)}
    </div>
  );
};
