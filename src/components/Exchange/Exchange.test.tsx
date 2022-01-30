import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider, ProviderProps } from "react-redux";
import { Exchange } from ".";
import store from "../../redux/store";
import { ModalsRoot } from "../Modals/Modals";

const ReduxProvider = ({ children, store }: ProviderProps) => (
  <Provider store={store}>{children}</Provider>
);

test("renders ExchangePage", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ReduxProvider store={store}>
      <ModalsRoot>{children}</ModalsRoot>
    </ReduxProvider>
  );

  render(<Exchange data-testid="test-exchange-page" />, { wrapper });
  const ExchangeElement = screen.getByTestId("test-exchange-page");

  expect(ExchangeElement).toBeInTheDocument();
  expect(ExchangeElement).toMatchSnapshot();
});
