import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountsApi } from "../api/accountsApi";
import { GlobalState } from "../redux/store";
import {
  accountsFetching,
  accountsFetched,
  accountsFailed,
} from "../redux/accounts/accountsSlice";

export const useAccounts = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: GlobalState) => state.accounts.accounts);
  const accountsFetchingState = useSelector(
    (state: GlobalState) => state.accounts.status
  );
  const accountsError = useSelector(
    (state: GlobalState) => state.accounts.error
  );

  const fetchAccounts = useCallback(async () => {
    try {
      dispatch(accountsFetching());
      const accounts = await fetchAccountsApi();

      dispatch(accountsFetched(accounts));
    } catch (e) {
      dispatch(accountsFailed((e as Error).message));
    }
  }, [dispatch]);

  const getBalance = useCallback(
    (accountCurrency: string) => {
      const acc = accounts.find(
        (account) => account.currency === accountCurrency
      );

      return acc?.balance ?? 0;
    },
    [accounts]
  );

  return {
    fetchAccounts,
    accounts,
    getBalance,
    accountsFetchingState,
    accountsError,
  };
};
