import {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
} from "react";
import { Balance } from "../Balance/Balance";
import { BalanceSkeleton } from "../Balance/BalanceSkeleton";
import { MODALS } from "../Modals/Modals";
import { Input } from "../uikit";
import { Select, SelectorOption } from "../uikit/Select";
import "./CurrencyInput.css";
import { usePreviousFormatedAmount } from "./utils/usePreviousFormatedAmount";

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
  const [formatedAmount, setFormatedAmount] = useState("0.00");
  const prevFormatedAmount = usePreviousFormatedAmount(formatedAmount);
  const [caretePosition, setCaretePosition] = useState(0);
  const amountInputRef = useRef<HTMLInputElement>(null);

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

  const onAmounKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // We need this conditions to control the caret position in Desktop & to avoid point deletion on every platforms
      if (
        e.key === "Backspace" &&
        amountInputRef.current?.selectionStart ===
          formatedAmount.indexOf(".") + 1
      ) {
        e.preventDefault();
        e.stopPropagation();
        amountInputRef.current.selectionStart--;
        amountInputRef.current.selectionEnd =
          amountInputRef.current.selectionStart;
      } else if (
        e.key === "Delete" &&
        amountInputRef.current?.selectionStart ===
          formatedAmount.indexOf(".") - 1
      ) {
        e.preventDefault();
        e.stopPropagation();
        amountInputRef.current.selectionStart++;
        amountInputRef.current.selectionEnd =
          amountInputRef.current.selectionStart;
      } else if (e.key === "ArrowRight" && amountInputRef.current) {
        e.preventDefault();
        e.stopPropagation();
        amountInputRef.current.selectionStart =
          (amountInputRef.current.selectionStart ?? 0) + 1;
        amountInputRef.current.selectionEnd =
          amountInputRef.current.selectionStart;
      } else if (e.key === "ArrowLeft" && amountInputRef.current) {
        e.preventDefault();
        e.stopPropagation();
        amountInputRef.current.selectionStart =
          (amountInputRef.current.selectionStart ?? 1) - 1;
        amountInputRef.current.selectionEnd =
          amountInputRef.current.selectionStart;
      } else {
        if (amountInputRef.current) {
          setCaretePosition(amountInputRef.current.selectionStart || 0);
        }
      }
    },
    [formatedAmount]
  );

  useEffect(() => {
    onCurrencyChange(currency);
  }, [currency, onCurrencyChange]);

  // Formating amount to currency view
  useEffect(() => {
    let amountFormated = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(
      amount ? (direction === CurrencyDirection.IN ? +amount : -amount) : 0
    );

    setFormatedAmount(amountFormated);
  }, [amount, direction]);

  // If input has been focused, this code calculates carete shift
  useEffect(() => {
    if (
      amountInputRef.current &&
      amountInputRef.current === document.activeElement
    ) {
      const newCaretePosition =
        caretePosition +
        (formatedAmount.length -
          (prevFormatedAmount?.length ?? formatedAmount.length));

      amountInputRef.current.selectionStart = newCaretePosition;
      amountInputRef.current.selectionEnd = newCaretePosition;
    }
  }, [caretePosition, formatedAmount.length, prevFormatedAmount]);

  return (
    <div className="currency-input" {...divProps}>
      <div className="currency-input-controls">
        <Select
          options={options}
          value={currency}
          onChoose={(v) => setCurrency(v)}
          modalNav={modalNav}
        />
        <Input
          value={formatedAmount}
          align="right"
          onChange={onAmountChange}
          onKeyDown={onAmounKeyDown}
          ref={amountInputRef}
          autoFocus={false}
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
