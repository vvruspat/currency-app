import {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { Balance } from "../Balance/Balance";
import { Input } from "../uikit";
import { Select, SelectorOption } from "../uikit/Select";
import "./CurrencyInput.css";
import { usePreviousFormatedAmount } from "./utils/usePreviousFormatedAmount";

const options: SelectorOption[] = [
  {
    key: "RUB",
    value: {
      icon: "₽",
      description: "Russian rubble",
      content: "RUB",
    },
  },
  {
    key: "EUR",
    value: {
      icon: "Е",
      description: "Euro",
      content: "EUR",
    },
  },
  {
    key: "USD",
    value: {
      icon: "$",
      description: "US Dollar",
      content: "USD",
    },
  },
  {
    key: "GBR",
    value: {
      icon: "G",
      description: "UK",
      content: "RUB",
    },
  },
  {
    key: "UAH",
    value: {
      icon: "U",
      description: "Ukranian grivna",
      content: "UAH",
    },
  },
];

export enum CurrencyDirection {
  IN = "in",
  OUT = "out",
}

export const CurrencyInput = ({
  availableBalances,
  direction,
}: {
  availableBalances?: any; // TODO: change
  direction: CurrencyDirection;
}) => {
  const [currency, setCurrency] = useState<SelectorOption>(options[0]);
  const [amount, setAmount] = useState(0);
  const [formatedAmount, setFormatedAmount] = useState("0.00");
  const prevFormatedAmount = usePreviousFormatedAmount(formatedAmount);
  const [caretePosition, setCaretePosition] = useState(0);
  const [error, setError] = useState<string | undefined>("Any kind of error");
  const amountInputRef = useRef<HTMLInputElement>(null);

  const onAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Such replace will not work properly with locales like that 123.456,79 (it's de-DE)
    // But here I use only en-US locale
    const cleanedValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/([\d]+)(\.)$/, "$1.00");
    setAmount(Math.abs(parseFloat(Number(cleanedValue).toFixed(2))));
  }, []);

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
        <Balance
          balance={56665.76}
          currency={currency.key}
          className="currency-input-balance"
        />
        {error && <div className="currency-input-error">{error}</div>}
      </div>
    </div>
  );
};
