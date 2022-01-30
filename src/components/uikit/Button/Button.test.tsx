import { render, screen } from "@testing-library/react";
import { Button } from ".";

test("renders Button", () => {
  render(<Button data-testid="test-button">Test Button</Button>, {});
  const ButtonElement = screen.getByTestId("test-button");
  expect(ButtonElement).toBeInTheDocument();
  expect(ButtonElement).toHaveTextContent("Test Button");
  expect(ButtonElement).toMatchSnapshot();
});
