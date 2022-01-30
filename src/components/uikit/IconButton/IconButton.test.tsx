import { render, screen } from "@testing-library/react";
import { IconButton } from ".";

test("renders IconButton without icon", () => {
  render(
    <IconButton data-testid="test-icon-button">Test Button</IconButton>,
    {}
  );
  const IconButtonElement = screen.getByTestId("test-icon-button");
  expect(IconButtonElement).toBeInTheDocument();
  expect(IconButtonElement).toHaveTextContent("Test Button");
  expect(IconButtonElement).toMatchSnapshot();
});

test("renders IconButton with icon", () => {
  render(
    <IconButton
      data-testid="test-icon-button"
      icon={<div data-testid="test-icon-button-icon"></div>}
    >
      Test Button
    </IconButton>,
    {}
  );
  const IconButtonIconElement = screen.getByTestId("test-icon-button-icon");
  expect(IconButtonIconElement).toBeInTheDocument();

  const IconButtonElement = screen.getByTestId("test-icon-button");
  expect(IconButtonElement).toMatchSnapshot();
});
