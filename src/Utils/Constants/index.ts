import config from "config.json";

const chainId = "31337";

export const addresses = {
  exchange: config[chainId].exchange.address,
  Dapp: config[chainId].Dapp.address,
  mDai: config[chainId].mDai.address,
  mETH: config[chainId].mETH.address,
};

export const orderTypeColors = {
  sellColor: "#F45353",
  buyColor: "#25CE85",
};
