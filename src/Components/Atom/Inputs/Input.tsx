import React from "react";
import { InputWrapper, InputEle } from "./style";
import Typography from "Components/Atom/Typography";

// Types
interface Props {
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  value?: string;
  onChange?: (val: any) => void;
}

// Main component
const Input: React.FC<Props> = (props) => {
  // Props
  const { type, label } = props;

  // Data to render
  return (
    <InputWrapper className="mt-30">
      {label && <Typography as="h4" className="heading-4 mb-5" text={label} />}
      <InputEle type={type ? type : "text"} {...props} />;
    </InputWrapper>
  );
};

export default Input;
