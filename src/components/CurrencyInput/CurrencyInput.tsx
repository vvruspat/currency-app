import {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
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

export const CurrencyInput = ({
  options,
  onCurrencyAmountChange,
  onCurrencyChange,
  balance,
  amount,
  error,
  direction,
  modalNav,
}: {
  options: SelectorOption[];
  balance: number;
  amount: number;
  error: string | undefined;
  onCurrencyAmountChange: (amount: number) => void;
  onCurrencyChange: (option: SelectorOption) => void;
  direction: CurrencyDirection;
  modalNav: MODALS;
}) => {
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

  useEffect(() => {
    let amountFormated = new Intl.NumberFormat("en-US").format(
      amount ? (direction === CurrencyDirection.IN ? +amount : -amount) : 0
    );

    if (amountFormated.indexOf(".") === -1) {
      amountFormated += ".00";
    } else if (amountFormated.indexOf(".") === amountFormated.length - 2) {
      amountFormated += "0";
    }

    setFormatedAmount(amountFormated);
  }, [amount, direction]);

  useEffect(() => {
    if (amountInputRef.current) {
      const newCaretePosition =
        caretePosition +
        (formatedAmount.length -
          (prevFormatedAmount?.length ?? formatedAmount.length));

      amountInputRef.current.selectionStart = newCaretePosition;
      amountInputRef.current.selectionEnd = newCaretePosition;
    }
  }, [caretePosition, formatedAmount.length, prevFormatedAmount]);

  return (
    <div className="currency-input">
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
