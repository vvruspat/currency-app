import { render, screen } from "@testing-library/react";
import { Balance } from ".";

test("renders balance USD", () => {
  render(
    <Balance data-testid="test-balance" balance={1234.56} currency="USD" />,
    {}
  );
  const BalanceElement = screen.getByTestId("test-balance");
  expect(BalanceElement).toBeInTheDocument();
  expect(BalanceElement).toHaveTextContent("Balance: $1,234.56");
  expect(BalanceElement).toMatchSnapshot();
});

test("renders balance EUR", () => {
  render(
    <Balance data-testid="test-balance" balance={128734.56} currency="EUR" />,
    {}
  );
  const BalanceElement = screen.getByTestId("test-balance");
  expect(BalanceElement).toBeInTheDocument();
  expect(BalanceElement).toHaveTextContent("Balance: €128,734.56");
  expect(BalanceElement).toMatchSnapshot();
});

test("renders balance GBP", () => {
  render(
    <Balance data-testid="test-balance" balance={1287} currency="GBP" />,
    {}
  );
  const BalanceElement = screen.getByTestId("test-balance");
  expect(BalanceElement).toBeInTheDocument();
  expect(BalanceElement).toHaveTextContent("Balance: £1,287.00");
  expect(BalanceElement).toMatchSnapshot();
});
