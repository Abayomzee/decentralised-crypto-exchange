import React from "react";
import { Wrapper } from "./style";

interface ButtonProps {
  children?: any;
  className?: any;
  onClick?: () => void;
  disabled?: boolean;
  value?: any;
  type?: any;
}
const Button: React.FC<ButtonProps> = (props) => {
  // Props
  const { className, children, value } = props;

  // Data to render
  return (
    <Wrapper
      role={"button"}
      {...props}
      className={`btn ${className ? className : ""}`}
    >
      {value || children}
    </Wrapper>
  );
};

export default Button;
