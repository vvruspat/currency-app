import { ReactNode } from "react";
import "./SelectOption.css";

export type SelectOptionProps = {
  icon?: ReactNode;
  description?: string;
  content: ReactNode;
  onClick?: () => void;
};

export const SelectOption = ({
  content,
  icon,
  description,
  ...restProps
}: SelectOptionProps) => {
  return (
    <div className="select-option" {...restProps}>
      {icon && <div className="select-option-icon">{icon}</div>}
      <div className="select-option-content">
        <div className="select-option-content-data">{content}</div>
        {description && (
          <div className="select-option-content-description">{description}</div>
        )}
      </div>
    </div>
  );
};
