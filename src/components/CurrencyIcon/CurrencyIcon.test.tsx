import { render, screen } from "@testing-library/react";
import { CurrencyIcon } from ".";

test("renders CurrencyIcon", () => {
  render(<CurrencyIcon data-testid="test-currency-icon" currency="USD" />, {});

  const CurrencyIconElement = screen.getByTestId("test-currency-icon");

  expect(CurrencyIconElement).toBeInTheDocument();
  expect(CurrencyIconElement).toMatchSnapshot();
});
