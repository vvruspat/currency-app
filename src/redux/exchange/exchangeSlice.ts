import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchingState } from "../../types/enums";

export type ExchangeReducer = {
  exchange: number | null;
  status: FetchingState;
  error: Error | null;
};

const initialState: ExchangeReducer = {
  exchange: null,
  status: FetchingState.INIT,
  error: null,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    exchangeFetching(state) {
      state.status = FetchingState.FETCHING;
    },
    exchangeFetched(state, action: PayloadAction<ExchangeReducer["exchange"]>) {
      state.status = FetchingState.SUCCESS;
      state.exchange = action.payload;
    },
    exchangeFailed(state, action) {
      state.status = FetchingState.FAILED;
      state.error = new Error(action.payload);
    },
  },
});

export const { exchangeFetching, exchangeFetched, exchangeFailed } =
  exchangeSlice.actions;
export default exchangeSlice.reducer;
