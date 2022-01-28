import { ChangeEvent, useState } from "react";
import { Input } from "../uikit";
import { Select, SelectorOption } from "../uikit/Select";
import "./CurrencyInput.css";

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

export const CurrencyInput = () => {
  const [currency, setCurrency] = useState<SelectorOption>(options[0]);
  const [amount, setAmount] = useState(0);

  return (
    <div className="currency-input">
      <div className="currency-input-controls">
        <Select
          options={options}
          value={currency}
          onChoose={(v) => setCurrency(v)}
        />
        <Input
          value={amount}
          align="right"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
        />
      </div>
      <div className="currency-input-info">Balance: 6 765.00 €</div>
    </div>
  );
};
