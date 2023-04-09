import config from "config.json";


const configFile = JSON.parse(JSON.stringify(config));

export const getAddresses = (chainId: any) => {
  return {
    exchange: configFile[chainId].exchange.address,
    Dapp: configFile[chainId].Dapp.address,
    mDai: configFile[chainId].mDai.address,
    mETH: configFile[chainId].mETH.address,
  };
};

export const orderTypeColors = {
  sellColor: "#F45353",
  buyColor: "#25CE85",
};

export default orderTypeColors;
