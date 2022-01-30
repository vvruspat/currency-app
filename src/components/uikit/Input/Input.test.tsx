import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("renders input", () => {
  render(<Input data-testid="test-input" />, {});
  const InputElement = screen.getByTestId("test-input");
  expect(InputElement).toBeInTheDocument();
  expect(InputElement).toMatchSnapshot();

  fireEvent.change(InputElement, { target: { value: "Input Test Value" } });

  const InputElementUpdated = screen.getByDisplayValue("Input Test Value");
  expect(InputElementUpdated).toBeInTheDocument();
  expect(InputElementUpdated).toMatchSnapshot();
});
