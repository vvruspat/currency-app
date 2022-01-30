import { fireEvent, render, screen } from "@testing-library/react";
import { SelectModal, SelectModalProps } from ".";
import { Caption } from "../..";
import { MODALS } from "../../../Modals/Modals";

const props: SelectModalProps = {
  nav: MODALS.TEST_MODAL,
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

jest.setTimeout(10000);

test("renders select modal", () => {
  render(<SelectModal {...props} />, {});

  const optionElements = screen.getAllByText(/icon element/i);
  expect(optionElements[0]).toBeInTheDocument();
  expect(optionElements[3]).toBeInTheDocument();

  const searchInputElement = screen.getByPlaceholderText("Search");
  expect(searchInputElement).toBeInTheDocument();

  fireEvent.change(searchInputElement, { target: { value: "Item1" } });

  const searchInputElementUpdated = screen.getByDisplayValue("Item1");
  expect(searchInputElementUpdated).toBeInTheDocument();
});
