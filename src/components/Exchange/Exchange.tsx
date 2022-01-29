import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";
import cn from "classnames";
import {
  CurrencyDirection,
  CurrencyInput,
} from "../CurrencyInput/CurrencyInput";
import { ReactComponent as Down16Icon } from "./assets/Down16Icon.svg";
import { Button, IconButton, Title } from "../uikit";
import "./Exchange.css";
import { ExchangeRate } from "../ExchangeRate/ExchangeRate";

type ExchangeProps = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const currency = "GBR"; // TODO: remove

export const Exchange = ({ className, ...divProps }: ExchangeProps) => {
  const [isSell, setIsSell] = useState(false);
  const onReverseExchageClick = useCallback(() => {
    setIsSell(!isSell);
  }, [isSell]);

  return (
    <div className="currency-exchange">
      <div className="currency-exchange-controlls">
        <Title>{isSell ? `Sell ${currency}` : `Buy  ${currency}`}</Title>
        <ExchangeRate from="GBR" to="USD" />
        <div
          className={cn(className, "currency-exchange-inputs")}
          {...divProps}
        >
          <CurrencyInput
            direction={isSell ? CurrencyDirection.OUT : CurrencyDirection.IN}
          />
          <div className="currency-exchange-direction">
            <IconButton
              icon={<Down16Icon />}
              onClick={onReverseExchageClick}
              className="currency-exchange-direction-button"
              style={{ transform: isSell ? "rotate(0deg)" : "rotate(180deg)" }}
            />
          </div>
          <CurrencyInput
            direction={isSell ? CurrencyDirection.IN : CurrencyDirection.OUT}
          />
        </div>
      </div>
      <Button stretched onClick={() => {}}>
        {isSell
          ? `Sell ${currency} to ${currency}`
          : `Buy ${currency} with ${currency}`}
      </Button>
    </div>
  );
};
