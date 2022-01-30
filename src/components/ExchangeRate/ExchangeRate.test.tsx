import { render, screen } from "@testing-library/react";
import { ExchangeRate } from ".";

test("renders Exchange USD -> EUR", () => {
  render(
    <ExchangeRate
      data-testid="test-exchange"
      from="USD"
      to="EUR"
      rate={0.985676}
    />,
    {}
  );
  const ExchangeElement = screen.getByTestId("test-exchange");

  expect(ExchangeElement).toBeInTheDocument();
  expect(ExchangeElement).toMatchSnapshot();
});

test("renders Exchange EUR -> USD", () => {
  render(
    <ExchangeRate
      data-testid="test-exchange"
      from="EUR"
      to="USD"
      rate={1.985676}
    />,
    {}
  );
  const ExchangeElement = screen.getByTestId("test-exchange");
  expect(ExchangeElement).toBeInTheDocument();
  expect(ExchangeElement).toMatchSnapshot();
});
