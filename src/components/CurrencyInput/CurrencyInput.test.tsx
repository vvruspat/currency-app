import { render, screen } from "@testing-library/react";
import { CurrencyDirection, CurrencyInput } from ".";
import { Balance } from "../Balance";
import { MODALS } from "../Modals/Modals";
import { Caption, SelectorOption } from "../uikit";

const options = [
  {
    key: "USD",
    value: {
      icon: <div data-testid="test1-icon">Test1 icon element</div>,
      description: <Caption>USD</Caption>,
      content: <Balance currency="USD" balance={5676.56} />,
    },
  },
  {
    key: "EUR",
    value: {
      icon: <div data-testid="test2-icon">Test2 icon element</div>,
      description: <Caption>EUR</Caption>,
      content: <Balance currency="EUR" balance={1276.76} />,
    },
  },
];

test("renders CurrencyInput noerror in", () => {
  render(
    <CurrencyInput
      data-testid="test-currency-input"
      options={options}
      balance={6655.67}
      amount={665.76}
      error={undefined}
      onCurrencyAmountChange={(amount: number) => {}}
      onCurrencyChange={(option: SelectorOption) => {}}
      direction={CurrencyDirection.IN}
      modalNav={MODALS.TEST_MODAL}
    />,
    {}
  );
  const CurrencyInputElement = screen.getByTestId("test-currency-input");

  expect(CurrencyInputElement).toBeInTheDocument();
  expect(CurrencyInputElement).toMatchSnapshot();
});

test("renders CurrencyInput noerror out", () => {
  render(
    <CurrencyInput
      data-testid="test-currency-input"
      options={options}
      balance={1655.67}
      amount={65.46}
      error={undefined}
      onCurrencyAmountChange={(amount: number) => {}}
      onCurrencyChange={(option: SelectorOption) => {}}
      direction={CurrencyDirection.OUT}
      modalNav={MODALS.TEST_MODAL}
    />,
    {}
  );
  const CurrencyInputElement = screen.getByTestId("test-currency-input");

  expect(CurrencyInputElement).toBeInTheDocument();
  expect(CurrencyInputElement).toMatchSnapshot();
});

test("renders CurrencyInput error out", () => {
  render(
    <CurrencyInput
      data-testid="test-currency-input"
      options={options}
      balance={1655.67}
      amount={4565.46}
      error={"balance exceed"}
      onCurrencyAmountChange={(amount: number) => {}}
      onCurrencyChange={(option: SelectorOption) => {}}
      direction={CurrencyDirection.OUT}
      modalNav={MODALS.TEST_MODAL}
    />,
    {}
  );
  const CurrencyInputElement = screen.getByTestId("test-currency-input");

  expect(CurrencyInputElement).toBeInTheDocument();
  expect(CurrencyInputElement).toMatchSnapshot();
});
