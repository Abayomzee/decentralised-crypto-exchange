import React, { useEffect, useState } from "react";
//
import {
  AccountWrapper,
  Wrapper,
  Account,
  Balance,
  NetworkSelector,
} from "./style";
//
import Typography from "Components/Atom/Typography";
import useSetup from "Store/setup";
import Blockies from "react-blockies";
import Button from "Components/Atom/Button";
import { EthIcon } from "Components/Atom/Svgs";
import CustomSelect from "../CustomSelect";
import { KovanNetwork, Localhost } from "Components/Atom/Svgs";
import Spinner from "Components/Atom/Spinners";
import config from "config.json";

// Types
interface NetworkOptionProps {
  value: string;
  label: string;
  id: string;
  chainId: string;
  icon: JSX.Element;
}
interface Props {}

// Main component
const TopBar: React.FC<Props> = () => {
  // Variables
  const networkOptions = [
    {
      value: "",
      label: "Select a network",
      id: "",
      chainId: "",
      icon: <></>,
    },
    {
      value: "0x7A69",
      label: "Localhost",
      id: "0x7A69",
      chainId: "31337",
      icon: <Localhost />,
    },
    {
      value: "0x5",
      label: "Goerli test network",
      id: "0x5",
      chainId: "5",
      icon: <KovanNetwork />,
    },
  ];
  const configData = JSON.parse(JSON.stringify(config));

  // State
  const [selected, setSelected] = useState<string>(
    `${networkOptions[0].label}`
  );
  // Store
  const { provider, loadAccount } = useSetup();
  const { balance, account, isLoading, chainId } = provider;

  //   Methods
  const loadAccountOnChange = () => {
    window.ethereum.on("accountsChanged", () => {
      loadAccount();
    });
  };
  const loadNetworkOnChange = () => {
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  };
  const networkHandler = async (network: NetworkOptionProps) => {
    if (network?.id && network.label !== selected) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.id }],
        });
      } catch {}
    }
  };
  const setNetwork = () => {
    const newNetworkIndex: any = networkOptions.find(
      (network: any) => network.chainId.toString() === chainId.toString()
    );
    if (newNetworkIndex) setSelected(newNetworkIndex.label);
  };

  //   Effects
  useEffect(() => {
    loadAccountOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    loadNetworkOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  // Data to render
  return (
    <Wrapper>
      <NetworkSelector>
        <EthIcon />
        {chainId && (
          <CustomSelect
            value={selected}
            onOptionChange={networkHandler}
            options={networkOptions}
          />
        )}
      </NetworkSelector>
      <AccountWrapper className="ml-auto">
        <Balance className="paragraph-1">
          <small className="small">My Balance </small>
          {balance ? `${Number(balance).toFixed(4)} ETH` : "0 ETH"}
        </Balance>
        <Account className={account ? "" : "p-0"}>
          {account ? (
            <a
              href={
                configData[chainId]
                  ? `${configData[chainId].explorerURL}/address/${account}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
            >
              <Typography
                as="p"
                className="paragraph-1"
                text={
                  account
                    ? `${account.slice(0, 5)}...${account.slice(38, 42)}`
                    : ""
                }
              />
              <Blockies
                seed={account}
                size={10}
                scale={3}
                className="identicon"
              />
            </a>
          ) : (
            <Button
              className="btn btn-1 btn-full"
              onClick={() => loadAccount()}
            >
              {isLoading ? <Spinner /> : "Connect"}
            </Button>
          )}
        </Account>
      </AccountWrapper>
    </Wrapper>
  );
};

export default TopBar;