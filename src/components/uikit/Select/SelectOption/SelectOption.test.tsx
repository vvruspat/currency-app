import { render, screen } from "@testing-library/react";
import { SelectOption } from ".";
import { Caption } from "../..";

test("renders SelecctOption", () => {
  render(
    <SelectOption
      data-testid="test-option"
      onClick={() => {}}
      icon={<div data-testid="test-icon">Test icon element</div>}
      description={<Caption>Test Description</Caption>}
      content="Test content"
      key="test_key"
    />,
    {}
  );

  const selectOpionElement = screen.getByTestId("test-option");
  expect(selectOpionElement).toBeInTheDocument();

  const iconElement = screen.getByTestId("test-icon");
  expect(iconElement).toBeInTheDocument();

  const descriptionElement = screen.getByText("Test Description");
  expect(descriptionElement).toBeInTheDocument();

  const contentElement = screen.getByText("Test content");
  expect(contentElement).toBeInTheDocument();
});
