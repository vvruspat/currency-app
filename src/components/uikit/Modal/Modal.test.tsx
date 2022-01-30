import { render, screen } from "@testing-library/react";
import { Modal } from ".";
import { Title } from "..";
import { MODALS } from "../../Modals/Modals";

test("renders modal without header", () => {
  render(<Modal nav={MODALS.TEST_MODAL} data-testid="test-modal" />, {});
  const ModalElement = screen.getByTestId("test-modal");
  expect(ModalElement).toBeInTheDocument();
  expect(ModalElement).toMatchSnapshot();
});

test("renders modal with header", () => {
  render(
    <Modal
      nav={MODALS.TEST_MODAL}
      data-testid="test-modal"
      header={<Title data-testid="test-modal-header">Test header</Title>}
    />,
    {}
  );

  const ModalElement = screen.getByTestId("test-modal");
  expect(ModalElement).toBeInTheDocument();
  expect(ModalElement).toMatchSnapshot();

  const modalHeaderElement = screen.getByTestId("test-modal-header");
  expect(modalHeaderElement).toBeInTheDocument();
});
