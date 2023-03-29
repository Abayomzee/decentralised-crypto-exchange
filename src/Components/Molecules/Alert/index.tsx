import React, { useState } from "react";
import Typography from "Components/Atom/Typography";
import useSetup from "Store/setup";
import { Close, Wrapper } from "./style";

interface Props {}
const Alert: React.FC<Props> = () => {
  // State
  const [show, setShow] = useState(true);
  // Store
  const { isSuccessful, isError } = useSetup().exchange.transaction;

  // Data to render
  return (
    <>
      {!show ? null : (
        <Wrapper>
          <Close onClick={() => setShow(false)}>x</Close>
          <Typography
            as="p"
            className="text-center color-white paragraph-3"
            text={
              isError
                ? "Transaction Failed!"
                : isSuccessful
                ? "Transaction Successful"
                : ""
            }
          />
        </Wrapper>
      )}
    </>
  );
};

export default Alert;
