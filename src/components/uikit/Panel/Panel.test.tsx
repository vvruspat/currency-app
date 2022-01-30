import { render, screen } from "@testing-library/react";
import { Panel } from ".";

test("renders panel", () => {
  render(<Panel data-testid="test-panel" />, {});
  const PanelElement = screen.getByTestId("test-panel");
  expect(PanelElement).toBeInTheDocument();
  expect(PanelElement).toMatchSnapshot();
});
