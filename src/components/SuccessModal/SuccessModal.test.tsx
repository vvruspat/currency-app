import { render, screen } from "@testing-library/react";
import { SuccessModal } from ".";

test("renders Exchange USD -> EUR", () => {
  render(
    <SuccessModal
      data-testid="test-exchange"
      fromCurrency="USD"
      toCurrency="GBP"
      fromAmount={456.65}
      toAmount={876.45}
    />,
    {}
  );
  const ExchangeElement = screen.getByTestId("test-exchange");

  expect(ExchangeElement).toBeInTheDocument();
  expect(ExchangeElement).toMatchSnapshot();
});
