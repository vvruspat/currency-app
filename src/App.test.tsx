import { ReactNode } from "react";
import { Provider, ProviderProps } from "react-redux";
import store from "./redux/store";

import { render, screen } from "@testing-library/react";
import App from "./App";

const ReduxProvider = ({ children, store }: ProviderProps) => (
  <Provider store={store}>{children}</Provider>
);

test("renders title", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ReduxProvider store={store}>{children}</ReduxProvider>
  );

  render(<App />, { wrapper });
  const titleElement = screen.getByText(/Currency App/i);
  expect(titleElement).toBeInTheDocument();
});
