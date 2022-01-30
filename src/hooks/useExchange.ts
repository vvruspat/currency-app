import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchangeRatesApi } from "../api/exchangeApi";
import { GlobalState } from "../redux/store";
import {
  exchangeFetching,
  exchangeFetched,
  exchangeFailed,
} from "../redux/exchange/exchangeSlice";

export const useExchange = () => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector(
    (state: GlobalState) => state.exchange.exchange
  );
  const exchangeFetchingState = useSelector(
    (state: GlobalState) => state.exchange.status
  );
  const exchangeError = useSelector(
    (state: GlobalState) => state.exchange.error
  );

  const fetchExchange = useCallback(
    async (from: string, to: string) => {
      try {
        dispatch(exchangeFetching());
        const exchangeRates = await fetchExchangeRatesApi(from, to);

        dispatch(exchangeFetched(exchangeRates[`${from}_${to}`]));
      } catch (e) {
        dispatch(exchangeFailed(e));
      }
    },
    [dispatch]
  );

  return { fetchExchange, exchangeRate, exchangeFetchingState, exchangeError };
};
