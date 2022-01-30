import { render, screen } from "@testing-library/react";
import { Caption } from ".";

test("renders caption", () => {
  render(<Caption>Test caption</Caption>, {});
  const captionElement = screen.getByText(/Test caption/i);
  expect(captionElement).toBeInTheDocument();
  expect(captionElement).toMatchSnapshot();
});
