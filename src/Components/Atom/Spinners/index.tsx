import React from "react";
//
import { Wrapper } from "./style";

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = (props) => {
  // Props
  const { className } = props;
  // Data to render
  return (
    <Wrapper
      className={`spinner ${className ? className : "spinner-one"}`}
    ></Wrapper>
  );
};

export default Spinner;
