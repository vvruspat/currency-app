import {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import NumberFormat from "react-number-format";
import { Balance } from "../Balance/Balance";
import { BalanceSkeleton } from "../Balance/BalanceSkeleton";
import { MODALS } from "../Modals/Modals";
import { Select, SelectorOption } from "../uikit/Select";
import "./CurrencyInput.css";

export enum CurrencyDirection {
  IN = "in",
  OUT = "out",
}

type CurrencyInputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  options: SelectorOption[];
  balance: number;
  amount: number;
  error: string | undefined;
  onCurrencyAmountChange: (amount: number) => void;
  onCurrencyChange: (option: SelectorOption) => void;
  direction: CurrencyDirection;
  modalNav: MODALS;
};

export const CurrencyInput = ({
  options,
  onCurrencyAmountChange,
  onCurrencyChange,
  balance,
  amount,
  error,
  direction,
  modalNav,
  ...divProps
}: CurrencyInputProps) => {
  const [currency, setCurrency] = useState<SelectorOption>(
    options[0] ?? undefined
  );

  const onAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // This replace will not work properly with locales like that 123.456,79 (it's de-DE)
      // But here I use only en-US locale
      const cleanedValue = value
        .replace(/[^0-9.]/g, "")
        .replace(/([\d]+)(\.)$/, "$1.00");
      const newAmount = Math.abs(parseFloat(Number(cleanedValue).toFixed(2)));

      onCurrencyAmountChange(newAmount);
    },
    [onCurrencyAmountChange]
  );

  useEffect(() => {
    onCurrencyChange(currency);
  }, [currency, onCurrencyChange]);

  return (
    <div className="currency-input" {...divProps}>
      <div className="currency-input-controls">
        <Select
          options={options}
          value={currency}
          onChoose={(v) => setCurrency(v)}
          modalNav={modalNav}
        />
        <NumberFormat
          className="amount-input"
          value={direction === CurrencyDirection.OUT ? -amount : amount}
          onChange={onAmountChange}
          inputMode="decimal"
          autoFocus={false}
          thousandSeparator={true}
          thousandsGroupStyle="thousand"
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
      <div className="currency-input-info">
        {currency ? (
          <Balance
            balance={balance}
            currency={currency.key}
            className="currency-input-balance"
          />
        ) : (
          <BalanceSkeleton />
        )}
        {error && <div className="currency-input-error">{error}</div>}
      </div>
    </div>
  );
};
