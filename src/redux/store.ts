import { configureStore } from "@reduxjs/toolkit";

import accountsReducer, { AccountsReducer } from "./accounts/accountsSlice";
import exchangeReducer, { ExchangeReducer } from "./exchange/exchangeSlice";

export type GlobalState = {
  accounts: AccountsReducer;
  exchange: ExchangeReducer;
};

export default configureStore<GlobalState>({
  reducer: {
    accounts: accountsReducer,
    exchange: exchangeReducer,
  },
});
