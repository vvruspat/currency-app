type BalanceSkeletronProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const BalanceSkeleton = ({ ...divProps }: BalanceSkeletronProps) => {
  return (
    <div {...divProps}>
      Balance: <div className="skeleton"></div>
    </div>
  );
};
