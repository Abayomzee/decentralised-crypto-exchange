import React from "react";
import Button from "Components/Atom/Button";
import Typography from "Components/Atom/Typography";
import { Container, Wrapper } from "./style";

interface Props {
  isEthereumEnabled?: Boolean;
}
const ConnectWallet: React.FC<Props> = (props) => {
  // Props
  const { isEthereumEnabled } = props;

  // Methods
  const handlePageReload = () => {
    window.location.reload();
  };

  // Data to dislay
  return (
    <Wrapper>
      <Container>
        <div className="glass-card"></div>
        <div className="card">
          <img
            src="/assets/images/dapp-icon-2.png"
            alt=""
            className="display-block mx-auto"
          />
          <Typography
            as="h4"
            className="text-center heading-7 mt-20 mb-20"
            text="Install wallet"
          />

          {!isEthereumEnabled && (
            <Typography as="h4" className="text-center paragraph-7 mt-20 mb-5">
              No wallet found, Install below
            </Typography>
          )}
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noreferrer"
            className="btn-no-wallet mb-20"
          >
            <img src="/assets/images/metamask-logo.png" alt="" />
            <Typography as="span" className="paragraph-5" text="MetaMask" />
          </a>

          <a
            href="https://www.coinbase.com/wallet/downloads"
            target="_blank"
            rel="noreferrer"
            className="btn-no-wallet"
          >
            <img src="/assets/images/coinbase-logo.png" alt="" />
            <Typography as="span" className="paragraph-5" text="Coinbase" />
          </a>

          <Button className="btn-full btn-2 mt-40" onClick={handlePageReload}>
            Load Excahnge
          </Button>

          <Typography as="h4" className="text-center paragraph-6 mt-20">
            Click on any of the wallet above to install them in your browser
          </Typography>
        </div>
      </Container>
    </Wrapper>
  );
};

export default ConnectWallet;
