import React, { useState, useEffect } from "react";
import Typography from "Components/Atom/Typography";
import useSetup from "Store/setup";
import { Close, Wrapper } from "./style";
import config from "config.json";

interface Props {}
const Alert: React.FC<Props> = () => {
  // State
  const [show, setShow] = useState(false);
  // Store
  let { isSuccessful, isError } = useSetup().exchange.transaction;
  const { transferInProgress, myEvents } = useSetup().exchange;
  const { chainId } = useSetup().provider;
  const { getMyEvents } = useSetup();

  isError = isError && !transferInProgress;
  isSuccessful = isSuccessful && !transferInProgress;
  let lastEventHash = myEvents[0] ? myEvents[0].transactionHash : "";
  const configData = JSON.parse(JSON.stringify(config));

  // Effects
  useEffect(() => {
    if (transferInProgress) {
      setShow(true);
    }
    getMyEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferInProgress]);

  // Data to render
  return (
    <>
      {!show ? null : (
        <Wrapper>
          <Close onClick={() => setShow(false)}>x</Close>
          <Typography as="p" className="text-center color-white paragraph-3">
            {isError ? (
              "Transaction Failed!"
            ) : isSuccessful ? (
              <span>
                <span> Transaction Successful </span>
                <a
                  href={
                    configData[chainId]
                      ? `${configData[chainId].explorerURL}/tx/${lastEventHash}`
                      : "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="block-link"
                >
                  {`${lastEventHash.slice(0, 6)}...${lastEventHash.slice(
                    60,
                    66
                  )}
                  `}
                </a>
              </span>
            ) : (
              "Transaction Pending"
            )}
          </Typography>
        </Wrapper>
      )}
    </>
  );
};

export default Alert;
