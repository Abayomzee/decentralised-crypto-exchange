import React, { useEffect } from "react";
import Button from "Components/Atom/Button";
import Typography from "Components/Atom/Typography";
import { Container, Wrapper, AvailableNetworks } from "./style";
import useSetup from "Store/setup";
import { getEnv } from "app-config";

interface Props {}
const NoNetwork: React.FC<Props> = () => {
  // Store
  const { provider } = useSetup();
  const { chainId } = provider;

  // Methods
  const networkHandler = async (networkId: any) => {
    console.log({ networkId });
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networkId }],
      });
    } catch {
      console.log("Error while changing network");
    }
  };
  const loadNetworkOnChange = () => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  };

  //   Effects
  useEffect(() => {
    loadNetworkOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  // Data to dislay
  return (
    <Wrapper>
      <Container>
        <img
          src="/assets/images/dapp-icon-2.png"
          alt=""
          className="display-block mx-auto"
        />
        <Typography
          as="p"
          className="paragraph-8 max-width-480 color-white text-center mt-30"
        >
          The Selected network is not supported on this platform, kindly click
          on any of the test network below to switch
        </Typography>
        <AvailableNetworks>
          <Button className="btn-network" onClick={() => networkHandler("0x5")}>
            Goerli test network
          </Button>
          <Button
            className="btn-network"
            onClick={() => networkHandler("0xAA36A7")}
          >
            Sepolia test network
          </Button>
          <Button
            className="btn-network"
            onClick={() => networkHandler("0x13881")}
          >
            Polygon Mumbai
          </Button>
          {getEnv() === "local" && (
            <Button
              className="btn-network"
              onClick={() => networkHandler("0x7A69")}
            >
              Localhost
            </Button>
          )}
        </AvailableNetworks>
      </Container>
    </Wrapper>
  );
};

export default NoNetwork;
