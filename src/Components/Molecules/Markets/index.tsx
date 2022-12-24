import React, { useState } from "react";
import { MarketSelector } from "./style";
import CustomSelect from "Components/Molecules/CustomSelect";
import useSetup from "Store/setup";
import configData from "config.json";

// Types
interface Props {}

// Main component
const Markets: React.FC<Props> = () => {
  // Store
  const chainId = useSetup().provider.chainId;
  const { loadToken } = useSetup();

  // Variables
  const config = JSON.parse(JSON.stringify(configData));

  const marketOptions = [
    {
      value: "",
      label: "Select a network",
      id: "",
      chainId: "",
      icon: <></>,
    },
    {
      value: `${
        config && config[chainId] && config[chainId].Dapp
          ? config[chainId].Dapp.address
          : 0
      },${
        config && config[chainId] && config[chainId].mETH
          ? config[chainId].mETH.address
          : 0
      }`,
      label: "Dapp / mETH",
      id: "0x7A69",
      chainId: "31337",
      icon: <></>,
    },
    {
      value: `${
        config && config[chainId] && config[chainId].Dapp
          ? config[chainId].Dapp.address
          : 0
      },${
        config && config[chainId] && config[chainId].mDai
          ? config[chainId].mDai.address
          : 0
      }`,
      label: "Dapp / mDAI",
      id: "0x5",
      icon: <></>,
    },
  ];

  // States
  const [selected, setSelected] = useState<string>(marketOptions[0].label);
  const [, setSelectedValue] = useState<string>("");

  // Methods
  const marketChangeHandler = async (option: any) => {
    if (option?.id && option.label !== selected) {
      const addresses = option.value.split(",");
      await loadToken(addresses[0], addresses[1]);
      setSelected(option.label);
      setSelectedValue(option.value);
    }
  };


  // Data to render
  return (
    <MarketSelector>
      <CustomSelect
        value={selected}
        dropdownwidth="full"
        label="Select Market"
        options={marketOptions}
        onOptionChange={marketChangeHandler}
        hide={chainId}
      />
    </MarketSelector>
  );
};

export default Markets;
