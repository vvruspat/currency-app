import { render, screen } from "@testing-library/react";
import { Title } from ".";

test("renders title", () => {
  render(<Title>Test title</Title>, {});
  const titleElement = screen.getByText(/Test title/i);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toMatchSnapshot();
});
