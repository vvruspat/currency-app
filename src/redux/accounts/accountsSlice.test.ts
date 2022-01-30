import { FetchingState } from "../../types/enums";
import reducer, {
  accountsFetching,
  accountsFetched,
  accountsFailed,
  AccountsReducer,
} from "./accountsSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual({
    accounts: [],
    status: FetchingState.INIT,
    error: null,
  });
});

test("should change state to fetching", () => {
  const previousState: AccountsReducer = {
    accounts: [],
    status: FetchingState.INIT,
    error: null,
  };

  expect(reducer(previousState, accountsFetching())).toEqual({
    accounts: [],
    status: FetchingState.FETCHING,
    error: null,
  });
});

test("should change state to error", () => {
  const previousState: AccountsReducer = {
    accounts: [],
    status: FetchingState.INIT,
    error: null,
  };

  expect(
    reducer(previousState, accountsFailed("Internal server error"))
  ).toEqual({
    accounts: [],
    status: FetchingState.FAILED,
    error: new Error("Internal server error"),
  });
});

test("should change state to fetched and set accounts", () => {
  const previousState: AccountsReducer = {
    accounts: [],
    status: FetchingState.INIT,
    error: null,
  };

  expect(
    reducer(
      previousState,
      accountsFetched([
        {
          balance: 0,
          currency: "EUR",
        },
        {
          balance: 178,
          currency: "USD",
        },
        {
          balance: 67.64,
          currency: "GBP",
        },
        {
          balance: 345676,
          currency: "JPY",
        },
        {
          balance: 0,
          currency: "CAD",
        },
        {
          balance: 76750.65,
          currency: "CHF",
        },
      ])
    )
  ).toEqual({
    accounts: [
      {
        balance: 0,
        currency: "EUR",
      },
      {
        balance: 178,
        currency: "USD",
      },
      {
        balance: 67.64,
        currency: "GBP",
      },
      {
        balance: 345676,
        currency: "JPY",
      },
      {
        balance: 0,
        currency: "CAD",
      },
      {
        balance: 76750.65,
        currency: "CHF",
      },
    ],
    status: FetchingState.SUCCESS,
    error: null,
  });
});
