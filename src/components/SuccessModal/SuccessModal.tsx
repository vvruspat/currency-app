import { MODALS } from "../Modals/Modals";
import { Caption, Title } from "../uikit";
import { Modal } from "../uikit/Modal";
import { ReactComponent as Check64Icon } from "./assets/Check64Icon.svg";
import "./SuccessModal.css";

type SuccessModalProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  locale?: string;
};

export const SuccessModal = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  locale = "en-US",
  ...modalProps
}: SuccessModalProps) => {
  return (
    <Modal
      nav={MODALS.EXCHANGE_SUCCESS_MODAL}
      className="success-modal"
      header={<Title>Success!</Title>}
      {...modalProps}
    >
      <div className="success">
        <div className="success-icon">
          <Check64Icon />
        </div>
        <Caption className="success-caption">You exchange</Caption>
        {fromCurrency && toCurrency && (
          <Title className="success-body">
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: fromCurrency,
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(fromAmount)}{" "}
            to{" "}
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: toCurrency,
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(toAmount)}
          </Title>
        )}
      </div>
    </Modal>
  );
};
