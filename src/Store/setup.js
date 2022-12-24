import create from "zustand";
import { ethers } from "ethers";
import { devtools } from "zustand/middleware";
//
import { addresses } from "Utils/Constants";
import TokenAbi from "Abis/Token.json";
import ExchangeAbi from "Abis/Exchange.json";

const useSetup = create(
  devtools((set, get) => ({
    provider: {
      connection: null,
      chainId: "",
      account: "",
      balance: "",
      isLoading: false,
    },
    tokens: {
      loaded: false,
      contracts: [],
      symbols: [],
    },
    exchange: {
      loaded: false,
      contract: null,
    },

    // Methods
    loadProvider: () => {
      const provider = { ...get().provider };
      const connection = new ethers.providers.Web3Provider(window.ethereum);
      provider.connection = connection;
      set({ provider }, false, "Provider_Loaded");
      return connection;
    },
    loadNetwork: async () => {
      const provider = { ...get().provider };
      const { chainId } = await get().loadProvider().getNetwork();
      provider.chainId = chainId;
      set({ provider }, false, "Network_Loaded");
      return chainId;
    },
    loadAccount: async () => {
      const provider = { ...get().provider };
      // Set Loader
      provider.isLoading = true;
      set({ provider }, false, "Account_Loading...");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      provider.account = account;
      set({ provider }, false, "Account_Loaded");

      // Load Balance
      let connection = await provider.connection;
      let balance = await connection.getBalance(provider.account);
      balance = ethers.utils.formatEther(balance);
      provider.balance = balance;
      set({ provider }, false, "Balance_Loaded");

      // Set Loader
      provider.isLoading = false;
      set({ provider }, false, "Account_Loading_done");

      return account;
    },
    loadToken: async (addrress1, address2) => {
      const tokens = { ...get().tokens };

      let token, symbol;

      // Load Token 1
      token = new ethers.Contract(
        addrress1,
        TokenAbi,
        get().provider.connection
      );
      symbol = await token.symbol();
      tokens.contracts[0] = token;
      tokens.symbols[0] = symbol;
      set({ tokens }, false, "Token_1_Loaded");

      // Load Token 2
      token = new ethers.Contract(
        address2,
        TokenAbi,
        get().provider.connection
      );
      symbol = await token.symbol();
      tokens.contracts[1] = token;
      tokens.symbols[1] = symbol;

      tokens.loaded = true;
      set({ tokens }, false, "Token_2_Loaded");

      return token;
    },
    loadExchange: async () => {
      const exchange = { ...get().exchange };

      let exchangeContract = new ethers.Contract(
        addresses.exchange,
        ExchangeAbi,
        get().provider.connection
      );

      exchange.contract = exchangeContract;
      exchange.loaded = true;
      set({ exchange }, false, "Exchange_Loaded");

      return exchange;
    },
    initSetUp: async () => {
      // Connect Ethers to blockchain
      await get().loadProvider();
      // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
      await get().loadNetwork();
      // Fetch current account and balance from metamask
      // await get().loadAccount();
      // // Fetch balance of current account from metamask
      // await get().loadBalance();
      // Load token smart contracts
      await get().loadToken(addresses.Dapp, addresses.mETH);
      // Load exchange smart contracts
      await get().loadExchange();
    },
  }))
);

export default useSetup;
