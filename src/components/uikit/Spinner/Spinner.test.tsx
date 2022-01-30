import { render, screen } from "@testing-library/react";
import { Spinner } from ".";

test("renders spinner", () => {
  render(<Spinner data-testid="test-spinner" />, {});
  const spinnerElement = screen.getByTestId("test-spinner");
  expect(spinnerElement).toBeInTheDocument();
  expect(spinnerElement).toMatchSnapshot();
});
