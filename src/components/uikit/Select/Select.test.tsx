import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Caption, Select } from "..";
import { MODALS, ModalsRoot } from "../../Modals/Modals";

const props = {
  value: {
    key: "Item1",
    value: {
      icon: <div data-testid="test1-icon">Test1 icon element</div>,
      description: <Caption>Test1 Description</Caption>,
      content: "Test1 content",
    },
  },
  modalNav: MODALS.TEST_MODAL,
  options: [
    {
      key: "Item1",
      value: {
        icon: <div data-testid="test1-icon">Test1 icon element</div>,
        description: <Caption>Test1 Description</Caption>,
        content: "Test1 content",
      },
    },
    {
      key: "Item2",
      value: {
        icon: <div data-testid="test2-icon">Test2 icon element</div>,
        description: <Caption>Test1 Description</Caption>,
        content: "Test2 content",
      },
    },
    {
      key: "Item3",
      value: {
        icon: <div data-testid="test3-icon">Test3 icon element</div>,
        description: <Caption>Test3 Description</Caption>,
        content: "Test3 content",
      },
    },
    {
      key: "Item4",
      value: {
        icon: <div data-testid="test1-icon">Test4 icon element</div>,
        description: <Caption>Test4 Description</Caption>,
        content: "Test4 content",
      },
    },
  ],
};

test("renders select", async () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ModalsRoot>{children}</ModalsRoot>
  );

  render(<Select {...props} />, { wrapper });

  const select = screen.getByTestId("select-test");

  const optionElements = screen.getAllByText(/icon element/i);
  expect(optionElements[0]).toBeInTheDocument();
  expect(optionElements[3]).toBeInTheDocument();

  const buttonElement = screen.getByTestId("select-buton");
  expect(buttonElement).toBeInTheDocument();

  const modal = screen.getByTestId("select-modal");
  expect(modal).not.toHaveClass("modal-show");

  expect(select).toMatchSnapshot();

  fireEvent.click(buttonElement);

  expect(modal).toHaveClass("modal-show");

  const searchInputElement = screen.getByPlaceholderText("Search");
  expect(searchInputElement).toBeInTheDocument();

  expect(select).toMatchSnapshot();

  fireEvent.change(searchInputElement, { target: { value: "Item4" } });

  const searchInputElementUpdated = screen.getByDisplayValue("Item4");
  expect(searchInputElementUpdated).toBeInTheDocument();

  expect(select).toMatchSnapshot();
});
