import { FetchingState } from "../../types/enums";
import reducer, {
  exchangeFetching,
  exchangeFetched,
  exchangeFailed,
  ExchangeReducer,
} from "./exchangeSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual({
    exchange: null,
    status: FetchingState.INIT,
    error: null,
  });
});

test("should change state to fetching", () => {
  const previousState: ExchangeReducer = {
    exchange: null,
    status: FetchingState.INIT,
    error: null,
  };

  expect(reducer(previousState, exchangeFetching())).toEqual({
    exchange: null,
    status: FetchingState.FETCHING,
    error: null,
  });
});

test("should change state to error", () => {
  const previousState: ExchangeReducer = {
    exchange: null,
    status: FetchingState.INIT,
    error: null,
  };

  expect(
    reducer(previousState, exchangeFailed("Internal server error"))
  ).toEqual({
    exchange: null,
    status: FetchingState.FAILED,
    error: new Error("Internal server error"),
  });
});

test("should change state to fetched and set exchange rate", () => {
  const previousState: ExchangeReducer = {
    exchange: null,
    status: FetchingState.INIT,
    error: null,
  };

  expect(reducer(previousState, exchangeFetched(0.65876))).toEqual({
    exchange: 0.65876,
    status: FetchingState.SUCCESS,
    error: null,
  });
});
