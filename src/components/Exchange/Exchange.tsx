import {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { useAccounts } from "../../hooks";
import { SelectorOption } from "../uikit/Select";
import { CurrencyIcon } from "../CurrencyIcon/CurrencyIcon";
import { Balance } from "../Balance/Balance";
import { Spinner } from "../uikit/Spinner/Spinner";
import { FetchingState } from "../../types/enums";
import { MODALS, ModalsContext } from "../Modals/Modals";
import { useExchange } from "../../hooks/useExchange";
import { SuccessModal } from "../SuccessModal/SuccessModal";

type ExchangeProps = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

/**
 * Main component for exchange.
 */
export const Exchange = ({ className, ...divProps }: ExchangeProps) => {
  const { setModal } = useContext(ModalsContext);

  const [isSell, setIsSell] = useState(false);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromError, setFromError] = useState<string | undefined>();
  const [toError, setToError] = useState<string | undefined>();
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    fetchAccounts,
    getBalance,
    accounts,
    accountsFetchingState,
    accountsError,
  } = useAccounts();
  const { fetchExchange, exchangeRate } = useExchange();

  const timerInterval = useRef<number | undefined>();

  const [currencyFromOptions, setCurrencyFromOptions] = useState<
    SelectorOption[]
  >([]);
  const [currencyToOptions, setCurrencyToOptions] = useState<SelectorOption[]>(
    []
  );

  const [currencyFrom, setCurrencyFrom] = useState<SelectorOption>();
  const [currencyTo, setCurrencyTo] = useState<SelectorOption>();

  // Sell/Buy button click handler
  const onReverseExchageClick = useCallback(() => {
    setIsSell(!isSell);
  }, [isSell]);

  // "From Amount" Handler
  // I don't change toAmount here, because there is useEffect for this
  const onCurrencyFromAmountChange = useCallback((amount: number) => {
    setFromAmount(amount);
  }, []);

  // "To Amount" Handler
  const onCurrencyToAmountChange = useCallback(
    (amount: number) => {
      setToAmount(amount);
      setFromAmount(amount / (exchangeRate ?? 1));
    },
    [exchangeRate]
  );

  // Exchange button click handler
  const onExchangeClick = useCallback(() => {
    setModal(MODALS.EXCHANGE_SUCCESS_MODAL);
  }, [setModal]);

  // Update interval
  useEffect(() => {
    if (currencyFrom && currencyTo) {
      fetchExchange(currencyFrom?.key, currencyTo?.key);

      timerInterval.current = window.setInterval(() => {
        fetchExchange(currencyFrom?.key, currencyTo?.key);
      }, 10000);
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [currencyFrom, currencyTo, currencyToOptions, fetchExchange]);

  // Get account balance for selected currency
  useEffect(() => {
    if (currencyTo) {
      setToBalance(getBalance(currencyTo.key));
    }
  }, [currencyTo, getBalance]);

  // Get account balance for selected currency
  useEffect(() => {
    if (currencyFrom) {
      setFromBalance(getBalance(currencyFrom.key));
    }
  }, [currencyFrom, getBalance]);

  // Load available accounts for user
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Map accounts to SlectorOption format
  useEffect(() => {
    const options = accounts.map<SelectorOption>((account) => {
      return {
        key: account.currency,
        value: {
          icon: <CurrencyIcon currency={account.currency} />,
          description: (
            <Balance balance={account.balance} currency={account.currency} />
          ),
          content: account.currency,
        },
      };
    });

    setCurrencyFromOptions(
      options.filter((option) => option.key !== currencyTo?.key)
    );
    setCurrencyToOptions(
      options.filter((option) => option.key !== currencyFrom?.key)
    );
  }, [accounts, currencyFrom?.key, currencyTo?.key]);

  // This effect updates toAmount when the rates updated
  useEffect(() => {
    setToAmount(fromAmount * (exchangeRate ?? 1));
  }, [exchangeRate, fromAmount]);

  // If account data has not been recieved, we showing Spinner
  useEffect(() => {
    if (
      accountsFetchingState === FetchingState.FETCHING ||
      accountsFetchingState === FetchingState.INIT
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [accountsFetchingState]);

  // Check fromInput for errors
  useEffect(() => {
    if (isSell && fromAmount > fromBalance) {
      setFromError("Exceeds balance");
    } else {
      setFromError(undefined);
    }
  }, [fromAmount, fromBalance, isSell]);

  // Check toInput for errors
  useEffect(() => {
    if (!isSell && toAmount > toBalance) {
      setToError("Exceeds balance");
    } else {
      setToError(undefined);
    }
  }, [isSell, toAmount, toBalance]);

  return (
    <div className="currency-exchange" {...divProps}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="currency-exchange-controlls">
            <Title>
              {isSell
                ? `Sell ${currencyFrom?.key ?? ""}`
                : `Buy  ${currencyFrom?.key ?? ""}`}
            </Title>
            {currencyFrom && currencyTo && exchangeRate && (
              <ExchangeRate
                from={currencyFrom?.key}
                to={currencyTo?.key}
                rate={exchangeRate}
              />
            )}
            <div className={cn(className, "currency-exchange-inputs")}>
              <CurrencyInput
                options={currencyFromOptions}
                direction={
                  isSell ? CurrencyDirection.OUT : CurrencyDirection.IN
                }
                balance={fromBalance}
                amount={fromAmount}
                error={fromError}
                onCurrencyAmountChange={onCurrencyFromAmountChange}
                onCurrencyChange={(option: SelectorOption) => {
                  setCurrencyFrom(option);
                }}
                modalNav={MODALS.SELECT_CURRENCY_FROM_MODAL}
              />
              <div className="currency-exchange-direction">
                <IconButton
                  icon={<Down16Icon />}
                  onClick={onReverseExchageClick}
                  className="currency-exchange-direction-button"
                  style={{
                    transform: isSell ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </div>
              <CurrencyInput
                options={currencyToOptions}
                direction={
                  isSell ? CurrencyDirection.IN : CurrencyDirection.OUT
                }
                balance={toBalance}
                amount={toAmount}
                error={toError}
                onCurrencyAmountChange={onCurrencyToAmountChange}
                onCurrencyChange={(option: SelectorOption) => {
                  setCurrencyTo(option);
                }}
                modalNav={MODALS.SELECT_CURRENCY_TO_MODAL}
              />
            </div>
          </div>
          {currencyFrom && currencyTo && (
            <Button
              disabled={
                !!fromError || // Error in "from" field
                !!toError || // Error in "to" field
                !!accountsError || // Api error while loading accounts list
                !toAmount || // Empty amount in "to" field
                !fromAmount || // Empty amount in "from" field
                isLoading // Loading process
              }
              stretched
              onClick={onExchangeClick}
            >
              {isSell
                ? `Sell ${currencyFrom?.key} to ${currencyTo?.key}`
                : `Buy ${currencyFrom?.key} with ${currencyTo?.key}`}
            </Button>
          )}
          <SuccessModal
            fromCurrency={currencyFrom?.key ?? ""}
            toCurrency={currencyTo?.key ?? ""}
            fromAmount={fromAmount}
            toAmount={toAmount}
          />
        </>
      )}
    </div>
  );
};
