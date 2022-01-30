import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./Spinner.css";

export const Spinner = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return (
    <div className="spinner-wrapper" {...props}>
      <div className="spinner"></div>
    </div>
  );
};
