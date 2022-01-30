import { render, screen } from "@testing-library/react";
import { Group } from ".";

test("renders Group", () => {
  render(<Group data-testid="test-group">Test Group</Group>, {});
  const GroupElement = screen.getByTestId("test-group");
  expect(GroupElement).toBeInTheDocument();
  expect(GroupElement).toHaveTextContent("Test Group");
  expect(GroupElement).toMatchSnapshot();
});
