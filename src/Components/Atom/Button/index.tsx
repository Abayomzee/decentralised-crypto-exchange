import React from "react";
import { Wrapper } from "./style";

interface ButtonProps {
  children?: any;
  className?: any;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = (props) => {
  // Props
  const { className, children } = props;

  // Data to render
  return (
    <Wrapper
      role={"button"}
      {...props}
      className={`btn ${className ? className : ""}`}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
