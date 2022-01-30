import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../types/account";
import { FetchingState } from "../../types/enums";

export type AccountsReducer = {
  accounts: Account[];
  status: FetchingState;
  error: Error | null;
};

const initialState: AccountsReducer = {
  accounts: [],
  status: FetchingState.INIT,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    accountsFetching(state) {
      state.status = FetchingState.FETCHING;
    },
    accountsFetched(state, action: PayloadAction<AccountsReducer["accounts"]>) {
      state.status = FetchingState.SUCCESS;
      state.accounts = action.payload;
    },
    accountsFailed(state, action: PayloadAction<string>) {
      state.status = FetchingState.FAILED;
      state.error = new Error(action.payload);
    },
  },
});

export const { accountsFetching, accountsFetched, accountsFailed } =
  accountsSlice.actions;
export default accountsSlice.reducer;
