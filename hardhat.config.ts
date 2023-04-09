import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";

import "@typechain/hardhat";

import dotenv from "dotenv";
dotenv.config();

const privateKeys = process.env.PRIVATE_KEYS || "";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      // allowUnlimitedContractSize: true,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privateKeys.split(","),
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privateKeys.split(","),
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: privateKeys.split(","),
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: privateKeys.split(","),
    },
  },
};

export default config;
