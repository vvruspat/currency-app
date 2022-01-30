import { render, screen } from "@testing-library/react";
import { Header } from ".";

test("renders Header", () => {
  render(<Header data-testid="test-header">Test Header</Header>, {});
  const HeaderElement = screen.getByTestId("test-header");
  expect(HeaderElement).toBeInTheDocument();
  expect(HeaderElement).toHaveTextContent("Test Header");
  expect(HeaderElement).toMatchSnapshot();
});
